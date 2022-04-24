import axios from '@/axios';
import config from '@/config';
import logging from '@/services/logging/logger';

class api {
	get = async (url: string, options: any, newBaseUrl?: string) => {
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
		await axios
			.get(url, options?.headers)
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
			let message = `API REQUEST: METHOD: POST, PAYLOAD: ${JSON.stringify(payload)} OPTIONS: ${JSON.stringify(
				options
			)}, URL: ${url}, baseUrl: ${axios.defaults.baseURL}`;
			logging.debug(message);
		}
		await axios
			.post(url, JSON.stringify(payload), {
				headers: {
					...options?.headers,
					'Content-Type': 'application/json',
				},
			})
			.then(async (response) => {
				return await this.HandleResponse(response);
			})
			.catch(async ({ response }) => {
				return await this.HandleError(response);
			});
	};

	HandleResponse = async (response: any) => {
		if (config.ECHO_ALL_API_RESPONSES)
			logging.debug(`API RESPONSE: ${JSON.stringify(response)}`);
		return response;
	};

	HandleError = async (error: any) => {
		if (config.ECHO_ALL_API_ERRORS)
			logging.debug(`Error inside base API: ${JSON.stringify(error)}`);
		throw new Error(`${error.statusText}`, { cause: error.data.detail });
	};
}

export default new api();
