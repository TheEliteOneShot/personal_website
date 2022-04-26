import { ICreateAccount } from '@/interfaces/user/ICreateAccount';
import userApi from '@/services/api/user';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';
import { ILogin } from '@/interfaces/user/ILogin';
import { useGlobalToast } from '@/toast';
import store from '../store';

const toast = useGlobalToast();

export default {
	namespaced: true,
	state: () => ({
		accountBeingCreated: false,
		isBeingLoggedIn: false,
	}),
	mutations: {
		accountCreationHasFinished: (state: any ) => {
			state.accountBeingCreated = false;
		},
		accountBeingCreated: (state: any) => {
			state.accountBeingCreated = true;
		},
		isBeingLoggedIn: (state: any) => {
			state.isBeingLoggedIn = true;
		},
		loggedIn: (state: any) => {
			state.isBeingLoggedIn = false;
		}
	},
	actions: {
		async asyncCreateAccount(
			{ commit },
			createAccountModel: ICreateAccount
		): Promise<IApiResponse> {
			logging.debug(`Action auth/asyncCreateAccount called`);
			commit('accountBeingCreated');
			return await userApi
				.createAccount(createAccountModel)
				.then(async (response) => {
					if (response.ok) {
						commit('accountCreationHasFinished');
						commit('auth/loggedIn', response, { root: true });
						toast.success('Successfully Account Creation');
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
			commit('isBeingLoggedIn');
			return await userApi
				.login(loginAccountModel)
				.then(async (response) => {
					if (response.ok) {
						commit('loggedIn');
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
	getters: {
		accountBeingCreated(state: any) {
			return state.accountBeingCreated;
		},
		isBeingLoggedIn(state: any) {
			return state.isBeingLoggedIn
		}
	},
};

async function handleActionError(
	error: any,
	actionName: string
): Promise<IApiResponse> {
	logging.debug(`'${actionName}' error inside store user module: ${error}`);
	throw new Error(`${error?.statusText}`, { cause: error?.data?.detail });
}
