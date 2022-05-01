import { ICreateAccount } from '@/interfaces/user/ICreateAccount';
import userApi from '@/services/api/user';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';
import { ILogin } from '@/interfaces/user/ILogin';
import { useGlobalToast } from '@/toast';

const toast = useGlobalToast();

export default {
	namespaced: true,
	state: () => ({
		accountBeingCreated: false,
		isBeingLoggedIn: false,
		isBeingLoggedOut: false,
	}),
	mutations: {
		accountCreationSuccessful: (state: any) => {
			logging.debug(`Mutation user/accountCreationSuccessful called`);
			state.accountBeingCreated = false;
		},
		accountBeingCreated: (state: any) => {
			logging.debug(`Mutation user/accountBeingCreated called`);
			state.accountBeingCreated = true;
		},
		accountCreationFailed: (state: any) => {
			logging.debug(`Mutation user/accountCreationFailed called`);
			state.accountBeingCreated = false;
		},
		isBeingLoggedIn: (state: any) => {
			logging.debug(`Mutation user/isBeingLoggedIn called`);
			state.isBeingLoggedIn = true;
		},
		isBeingLoggedOut: (state: any) => {
			logging.debug(`Mutation user/isBeingLoggedOut called`);
			state.isBeingLoggedOut = true;
		},
		loginSuccess: (state: any) => {
			logging.debug(`Mutation user/loginSuccess called`);
			state.isBeingLoggedIn = false;
		},
		loginFailed: (state: any) => {
			logging.debug(`Mutation user/loginFailed called`);
			state.isBeingLoggedIn = false;
		},
		logoutSuccess: (state: any) => {
			logging.debug(`Mutation user/logoutSuccess called`);
			state.isBeingLoggedOut = false;
		},
		logoutFailed: (state: any) => {
			logging.debug(`Mutation user/logoutFailed called`);
			state.isBeingLoggedOut = false;
		},
	},
	actions: {
		async asyncCreateAccount(
			{ commit },
			createAccountModel: ICreateAccount
		): Promise<IApiResponse> {
			logging.debug(`Action user/asyncCreateAccount called`);
			commit('accountBeingCreated');
			return await userApi
				.createAccount(createAccountModel)
				.then(async (response) => {
					if (response.ok) {
						commit('accountCreationSuccessful');
						commit('auth/loggedIn', response, { root: true });
						toast.success('Successfully Created Account');
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
			logging.debug(`Action user/login called`);
			commit('isBeingLoggedIn');
			return await userApi
				.login(loginAccountModel)
				.then(async (response) => {
					if (response.ok) {
						commit('loginSuccess');
						commit('auth/loggedIn', response, { root: true });
					}
					return response;
				})
				.catch(
					async (error) => await handleActionError(error, 'login')
				);
		},
		async logout(
			{ commit }
		): Promise<IApiResponse> {
			logging.debug(`Action user/logout called`);
			commit('isBeingLoggedOut');
			return await userApi
				.logout()
				.then(async (response) => {
					if (response.ok) {
						commit('logoutSuccess');
						commit('auth/loggedOut', true, { root: true });
					}
					return response;
				})
				.catch(
					async (error) => await handleActionError(error, 'logout')
				);
		},
		async getUserItemsFromServer() {
			logging.debug(`Action user/getUserItemsFromServer called`);
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
			return state.isBeingLoggedIn;
		},
	},
};

async function handleActionError(
	error: any,
	actionName: string
): Promise<IApiResponse> {
	logging.debug(`'${actionName}' error inside store user module: ${error}`);
	throw new Error(`${error?.statusText}`, { cause: error?.data?.detail });
}
