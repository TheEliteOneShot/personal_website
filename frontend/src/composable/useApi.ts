import axios, { AxiosInstance } from 'axios';

import { useUserSession } from '/@src/stores/userSession';
import { useNotyf } from '/@src/composable/useNotyf';
import { useLogging } from '/@src/composable/useLogging';
import config from '/@src/config';
import jwt_decode from 'jwt-decode';
import router from '/@src/router';

let api: AxiosInstance;
const notyf = useNotyf();
const logging = useLogging();

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    baseURL: config.routes.baseUrl,
  });

  api.interceptors.request.use(async (request) => {
    const userSession = useUserSession();
    if (config.ECHO_ALL_API_REQUESTS)
      logging.debug(`API REQUEST: ${JSON.stringify(request)}`);

    if (userSession.isLoggedIn) {
      const accessToken = await getAccessToken(userSession);
      if (accessToken) {
        request.headers = {
          ...request.headers,
          ...{
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
    }
    if (request.method !== 'get') {
      request.headers = {
        ...request.headers,
        'Content-Type': 'application/json',
      };
    }
    return request;
  });

  // Any status code that lie within the range of 2xx cause this function to trigger
  api.interceptors.response.use((response) => {
    if (config.ECHO_ALL_API_RESPONSES)
      logging.debug(`API RESPONSE: ${JSON.stringify(response)}`);
    return response;
  });

  // An HTTP request will 'await' this function.
  // This function will resolve when the access token has been refreshed.
  // 'pollInterval' is how long in milliseconds to recheck the status until resolved.
  const isTokenRefreshFinished = (userSession: any, pollInterval: number) => {
    logging.debug(
      `Request is checking for the token refresh to complete every ${pollInterval}ms`
    );
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!userSession.isTokenRefreshing) {
          logging.debug(`The request is done waiting.`);
          resolve(true);
          clearInterval(interval);
        }
      }, pollInterval);
    });
  };

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const userSession = useUserSession();
      const status = error.response ? error.response.status : null;
      const errorMsg = error?.response?.data?.detail;
      if (config.ECHO_ALL_API_ERRORS)
        logging.debug(`API ERROR: ${JSON.stringify(error)}`);

      if (status === 401) {
        if (errorMsg === 'REFRESH_TOKEN_INVALID') {
          notyf.error('Your session has expired. Please login again.');
          logging.error('The refresh token was inactive, refreshing session.');
          await userSession.logoutUser();
          router.push({ name: 'auth' });
        } else if (errorMsg === 'ACCESS_TOKEN_EXPIRED') {
          if (userSession.isTokenRefreshing) {
            return isTokenRefreshFinished(userSession, 100).then(() =>
              api.request(error.config)
            );
          } else {
            userSession.setIsTokenRefreshing(true);
            return await api
              .post(
                config.routes.authApi.refreshAccessToken,
                {
                  refresh_token: userSession.refreshToken,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
              .then(async (response) => {
                await userSession.setToken(response?.data?.access_token);
                await userSession.setRefreshToken(response?.data?.refresh_token);
                // Repeat original request
                return api.request(error.config);
              })
              .finally(async () => await userSession.setIsTokenRefreshing(false));
          }
        }
      }

      return Promise.reject(error);
    }
  );

  // TODO: Automatically refresh token if below an expiration threshold
  const getAccessToken = async (userSession: any) => {
    const token = userSession.token;
    const decoded = jwt_decode(token);
    logging.debug('Decoded token');
    logging.debug(decoded);
    return token;
  };
  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
