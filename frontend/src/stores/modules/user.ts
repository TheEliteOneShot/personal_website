import { ICreateAccount } from '@/interfaces/user/ICreateAccount';
import userApi from '@/services/api/user';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';
import { ILogin } from '@/interfaces/user/ILogin';
import { useGlobalToast } from "@/toast"

const toast = useGlobalToast();

export default {
	namespaced: true,
	state: () => ({}),
	mutations: {
		accountCreated: () => {
			logging.debug(`Mutation user/accountCreated called`);
		},
	},
	actions: {
		async asyncCreateAccount(
			{ commit },
			createAccountModel: ICreateAccount
		): Promise<IApiResponse> {
			logging.debug(`Action auth/asyncCreateAccount called`);
			return await userApi
				.createAccount(createAccountModel)
				.then(async (response) => {
					if (response.ok) {
						commit('accountCreated');
						commit('auth/loggedIn', response, { root: true });
						toast.success('Successfully Account Creation')
					}
					return response;
				})
				.catch(
					async (error) =>
						await handleActionError(error, 'asyncCreateAccount')
				);
		},
		async login(
			{ commit },
			loginAccountModel: ILogin
		): Promise<IApiResponse> {
			return await userApi
				.login(loginAccountModel)
				.then(async (response) => {
					if (response.ok) {
						commit('auth/loggedIn', response, { root: true });
					}
					return response;
				})
				.catch(
					async (error) => await handleActionError(error, 'login')
				);
		},
		async getUserItemsFromServer() {
			return await userApi
				.getUserItemsFromServer()
				.catch(
					async (error) =>
						await handleActionError(error, 'getUserItemsFromServer')
				);
		},
	},
	getters: {},
};

async function handleActionError(
	error: any,
	actionName: string
): Promise<IApiResponse> {
	logging.debug(`'${actionName}' error inside store user module: ${error}`);
	throw new Error(`${error?.statusText}`, { cause: error?.data?.detail });
}
