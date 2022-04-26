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

// Any status codes that falls outside the range of 2xx cause this function to trigger
axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error.response ? error.response.status : null;
		if (config.ECHO_ALL_API_ERRORS)
			logging.debug(`API ERROR: ${JSON.stringify(error)}`);

		if (status === 401) {
			if (store.getters['auth/isTokenBeingRefreshed']) {
				const chained =
					store.getters['auth/getTokenRefreshingCallbacks'].then(
						error
					);
				store.commit('auth/tokenSetRefreshingCallbackChain', chained);
				return chained;
			} else {
				store.commit('auth/tokenRefreshStarted');
				await axios
					.post(
						config.routes.authApi.refreshAccessToken,
						{ refresh_token: store.getters['auth/refreshToken'] },
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)
					.then((response) => {
						store.commit('auth/setTokens', response?.data);
						store.commit('auth/tokenRefreshComplete');
						return response;
					});
				return axios.request(error.config);
			}
		} else {
			// The backend currently sends 412 for a refresh token that is expired
			if (status === 412) {
				toast.error('Your sessire has expired. Please login again.');
				store.commit('auth/loggedOut', false);
				router.push('/login');
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
