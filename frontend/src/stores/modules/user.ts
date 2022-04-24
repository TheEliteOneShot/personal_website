import { ICreateAccount } from '@/interfaces/user/ICreateAccount';
import { getLocalStorageSync } from '@/services/util/storage';
import userApi from '@/services/api/user';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';

export default {
	namespaced: true,
	state: () => ({
		currentlyLoggedIn: getLocalStorageSync('currentlyLoggedIn', false),
		authToken: getLocalStorageSync('token', null),
		refreshToken: getLocalStorageSync('refreshToken', null),
	}),
	mutations: {
		accountCreated: () => {
			logging.debug('Account was created here');
		},
	},
	actions: {
		async asyncCreateAccount(
			{ commit },
			createAccountModel: ICreateAccount
		): Promise<IApiResponse> {
			return await userApi
				.createAccount(createAccountModel)
				.then(async (response) => {
					if(response.status == "ok") {
						logging.debug(
							`Recieved a good response inside user module: ${JSON.stringify(response)}`
						);
						commit('accountCreated')
					} else {
						logging.debug(
							`Recieved a bad response inside user module: ${JSON.stringify(response)}`
						);
					}
					return response;
				})
				.catch(async (error) => await handleError(error));
		},
	},
	getters: {},
};

async function handleError(error: any): Promise<IApiResponse> {
	logging.debug(`Error inside store user module: ${error}`);
	throw new Error(`${error.statusText}`, { cause: error.data.detail });
}
