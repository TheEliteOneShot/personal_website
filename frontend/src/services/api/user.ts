import api from './base';
import config from '@/config';
import { ICreateAccount } from '@/interfaces/user/ICreateAccount';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';

class userApi {
	createAccount = async (createAccountModel: ICreateAccount) => {
		return await api
			.post(config.routes.userApi.createUser, createAccountModel)
			.then(async (response) => {
                return await this.handleResponse(response);
			})
			.catch(async (error: Error) => {
				return await this.handleError(error);
			});
	};

	handleResponse = async (response: any): Promise<IApiResponse> => {
		return {
			status: "ok",
			payload: response
		}
	};


	handleError = async (error: Error) => {
		logging.debug(
			`There was an error inside the userApi. ${error} Reason: ${JSON.stringify(
				error.cause
			)}`
		);
		return await this.parseErrorCause(String(error.cause));
	};

	parseErrorCause = async (cause: string): Promise<IApiResponse> => {
		let reason = 'UNKNOWN_ERROR';
        if (cause.includes("USERNAME_TAKEN")) reason = "USERNAME_TAKEN";
        return {status: "error", message: reason};
	}
}

export default new userApi();
