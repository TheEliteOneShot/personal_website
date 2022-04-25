import axios from '@/axios';
import config from '@/config';
import logging from '@/services/logging/logger';
import store from '@/stores/store';
import router from '@/router';
import jwt_decode from "jwt-decode";
import { ITokenResponse } from '@/interfaces/auth/ITokenResponse';
import { IRefreshToken } from '@/interfaces/auth/IRefreshToken';

class api {
	get = async (url: string, options?: any, newBaseUrl?: string) => {
		if (newBaseUrl) {
			axios.defaults.baseURL = newBaseUrl;
		} else {
			axios.defaults.baseURL = config.routes.baseUrl;
		}
		if (config.ECHO_ALL_API_REQUESTS) {
			let message = `API REQUEST: METHOD: GET, OPTIONS: ${JSON.stringify(
				options
			)}, URL: ${url}, baseUrl: ${axios.defaults.baseURL}`;
			logging.debug(message);
		}
		let headers = {};

		if (store.getters['auth/isLoggedIn']) {
			const accessToken = await this.getTokenRefreshIfExpired();
			headers = {
				...{
					Authorization: `Bearer ${accessToken}`,
				},
			};
		}
		headers = { headers: { ...headers, ...options?.headers } };
		return await axios
			.get(url, headers)
			.then(async (response) => {
				return await this.HandleResponse(response);
			})
			.catch(async ({ response }) => {
				return await this.HandleError(response);
			});
	};
	post = async (
		url: string,
		payload: any,
		options?: any,
		newBaseUrl?: string
	) => {
		if (newBaseUrl) {
			axios.defaults.baseURL = newBaseUrl;
		} else {
			axios.defaults.baseURL = config.routes.baseUrl;
		}
		if (config.ECHO_ALL_API_REQUESTS) {
			let message = `API REQUEST: METHOD: POST, PAYLOAD: ${JSON.stringify(
				payload
			)} OPTIONS: ${JSON.stringify(options)}, URL: ${url}, baseUrl: ${
				axios.defaults.baseURL
			}`;
			logging.debug(message);
		}
		let headers = {
			...options?.headers,
			'Content-Type': 'application/json',
		};
		console.log(headers);
		if (store.getters['auth/isLoggedIn']) {
			const accessToken = await this.getTokenRefreshIfExpired();
			headers = {
				...headers,
				...{
					Authorization: `Bearer ${accessToken}`,
				},
			};
		}
		headers = { headers: { ...headers, ...options?.headers } };
		return await axios
			.post(url, JSON.stringify(payload), headers)
			.then(async (response) => {
				return await this.HandleResponse(response);
			})
			.catch(async ({ response }) => {
				return await this.HandleError(response, JSON.stringify(payload), headers);
			});
	};

	HandleResponse = async (response: any) => {
		if (config.ECHO_ALL_API_RESPONSES)
			logging.debug(`API RESPONSE: ${JSON.stringify(response)}`);
		return response;
	};

	HandleError = async (response: any, initial_payload?: any, headers?: any)  => {
		console.log(`Response Status: ${response?.status}`);
		if (response.status == 401) {
			const newTokens = await this.HandleRefreshToken();
			// try the initial API call again one time with the refreshed tokens
		}
		if (config.ECHO_ALL_API_ERRORS)
			logging.debug(`Error inside base API: ${JSON.stringify(response)}`);
		throw new Error(`${response?.statusText}`, {
			cause: response?.data?.detail,
		});
	};

	getTokenRefreshIfExpired = async () => {
		const token = store.getters['auth/accessToken'];
		var decoded = jwt_decode(token);
		logging.debug('Decoded token');
		logging.debug(decoded);
		return token;
	}

	HandleRefreshToken = async () => {
		if (store.getters['auth/isLoggedIn']) {
			const refreshToken = store.getters['auth/refreshToken'];
			const newTokens = await axios
				.post(
					config.routes.authApi.refreshAccessToken,
					{ refresh_token: refreshToken } as IRefreshToken,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then(async ( response ) => {
					if (response?.status === 200) {
						store.commit('auth/refreshedToken', response?.data as ITokenResponse)
					}
					return response?.data
				})
				.catch(async ({ response }) => {
					if (
						response?.data?.detail == 'REFRESH_TOKEN_SESSION_EXPIRED'
					) {
						logging.debug(
							`
							Attempted to refresh the access token with the refresh token.
							The refresh token was expired. Redirecting to route: '/login'
							`
						);
						router.push('/login');
					}
				});
				return newTokens;
		}
	};
}

export default new api();
