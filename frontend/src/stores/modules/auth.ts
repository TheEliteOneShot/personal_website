import { ICreateAccount } from '@/interfaces/user/ICreateAccount';
import { getLocalStorageSync } from '@/services/util/storage';
import userApi from '@/services/api/user'
import logging from '@/services/logging/logger';

const apiConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export default {
	namespaced: true,
	state: () => ({
		currentlyLoggedIn: getLocalStorageSync('currentlyLoggedIn', false),
		authToken: getLocalStorageSync('token', null),
		refreshToken: getLocalStorageSync('refreshToken', null),
	}),
	mutations: {
		accountWasCreated: () => {
			console.log('Account was created inside auth');
		},
	},
	actions: {
		async asyncCreateAccount(
			{ commit },
			createAccountModel: ICreateAccount
		) {
            await userApi.createAccount(createAccountModel)
            .then(() => {
                commit('accountWasCreated')
            })
            .catch(async (error) => await handleError(error))
		},
	},
	getters: {},
};

async function handleError(error) {
    logging.debug(error);
}
