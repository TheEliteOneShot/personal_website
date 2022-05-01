import axios from '@/axios';
import config from '@/config';
import logging from '@/services/logging/logger';
import store from '@/stores/store';
import router from '@/router';
import jwt_decode from 'jwt-decode';
import { useGlobalToast } from '@/toast';

const toast = useGlobalToast();

axios.interceptors.request.use(async (request) => {
	if (config.ECHO_ALL_API_REQUESTS)
		logging.debug(`API REQUEST: ${JSON.stringify(request)}`);

	if (store.getters['auth/isLoggedIn']) {
		const accessToken = await getAccessToken();
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
axios.interceptors.response.use((response) => {
	if (config.ECHO_ALL_API_RESPONSES)
		logging.debug(`API RESPONSE: ${JSON.stringify(response)}`);
	return response;
});

// An HTTP request will 'await' this function.
// This function will resolve when the access token has been refreshed.
// 'pollInterval' is how long in milliseconds to recheck the status until resolved.
const isTokenRefreshFinished = (pollInterval: number) => {
	logging.debug(
		`Request is checking for the token refresh to complete every ${pollInterval}ms`
	);
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (!store.getters['auth/tokenIsRefreshing']) {
				logging.debug(
					`The request is done waiting.`
				);
				resolve(true);
				clearInterval(interval);
			}
		}, pollInterval);
	});
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error.response ? error.response.status : null;
		if (config.ECHO_ALL_API_ERRORS)
			logging.debug(`API ERROR: ${JSON.stringify(error)}`);

		if (status === 401) {
			if (error?.response?.data?.detail === 'REFRESH_TOKEN_INVALID') {
				toast.error('Your session has expired. Please login again.');
				logging.error(
					'The refresh token was inactive, refreshing session.'
				);
				store.commit('auth/loggedOut', false);
				router.push('/login');
			} else if (
				error?.response?.data?.detail === 'ACCESS_TOKEN_EXPIRED'
			) {
				if (store.getters['auth/tokenIsRefreshing']) {
					return isTokenRefreshFinished(100).then(() =>
						axios.request(error.config)
					);
				} else {
					store.commit('auth/tokenRefreshStarted');
					return await axios
						.post(
							config.routes.authApi.refreshAccessToken,
							{
								refresh_token:
									store.getters['auth/refreshToken'],
							},
							{
								headers: {
									'Content-Type': 'application/json',
								},
							}
						)
						.then((response) => {
							store.commit('auth/setTokens', response?.data);
							// Repeat original request
							return axios.request(error.config);
						})
						.finally(() =>
							store.commit('auth/tokenRefreshComplete')
						);
				}
			}
		}

		return Promise.reject(error);
	}
);

// TODO: Automatically refresh token if below an expiration threshold
const getAccessToken = async () => {
	const token = store.getters['auth/accessToken'];
	var decoded = jwt_decode(token);
	logging.debug('Decoded token');
	logging.debug(decoded);
	return token;
};

class api {
	get = async (url: string, options?: any, newBaseUrl?: string) => {
		let opts = { ...options };
		if (newBaseUrl) opts = { ...opts, baseURL: newBaseUrl };
		return await axios.get(url, opts);
	};
	post = async (
		url: string,
		payload: any,
		options?: any,
		newBaseUrl?: string
	) => {
		let opts = { ...options };
		if (newBaseUrl) opts = { ...opts, baseURL: newBaseUrl };
		return await axios.post(url, JSON.stringify(payload), opts);
	};
}

export default new api();
