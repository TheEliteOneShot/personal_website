import {
	getLocalStorageSync,
	setLocalStorageSync,
	removeItemLocalStorageSync,
} from '@/services/util/storage';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';
import { useGlobalToast } from "@/toast"

const toast = useGlobalToast();

export default {
	namespaced: true,
	state: () => ({
		isLoggedIn: Boolean(getLocalStorageSync('sessionActive', false)),
		accessToken: getLocalStorageSync('accessToken', null),
		refreshToken: getLocalStorageSync('refreshToken', null),
	}),
	mutations: {
		loggedIn: (state: any, { payload }) => {
			try {
				logging.debug(`Mutation user/loggedIn called`);
				if (payload.data.access_token && payload.data.refresh_token) {
					state.accessToken = payload.data.access_token;
					state.refreshToken = payload.data.refresh_token;
					setLocalStorageSync('accessToken', state.accessToken);
					setLocalStorageSync('refreshToken', state.refreshToken);
					state.isLoggedIn = true;
					setLocalStorageSync('sessionActive', 'true');
					toast.success('Successfull Login')
				} else {
					throw new Error(
						'The loggedIn mutation in the Auth store needs an access token and a refresh token but some were empty.'
					);
				}
			} catch (error) {
				handleMutationError(error, "loggedIn");
			}
		},
		loggedOut: (state: any) => {
			try {
				logging.debug(`Mutation user/loggedOut called`);
				state.isLoggedIn = false;
				state.accessToken = null;
				state.refreshToken = null;
				removeItemLocalStorageSync('sessionActive');
				removeItemLocalStorageSync('accessToken');
				removeItemLocalStorageSync('refreshToken');
				toast.success('Successful Logout')
			} catch (error) {
				handleMutationError(error, "loggedOut");
			}
		},
		refreshedToken: (state: any, tokens ) => {
			try {
				logging.debug(`Mutation user/refreshedToken called`);
				if (tokens.access_token && tokens.refresh_token) {
					state.accessToken = tokens.access_token;
					state.refreshToken = tokens.refresh_token;
					setLocalStorageSync('accessToken', state.accessToken);
					setLocalStorageSync('refreshToken', state.refreshToken);
					logging.debug('Successfully refreshed the tokens.')
				} else {
					throw new Error(
						'The refreshedToken mutation in the Auth store needs an access token and a refresh token but some were empty.'
					);
				}
			} catch (error) {
				handleMutationError(error, "refreshedToken");
			}
		}
	},
	actions: {},
	getters: {
		isLoggedIn(state: any) {
			return state.isLoggedIn;
		},
		accessToken(state: any) {
			return state.accessToken;
		},
		refreshToken(state: any) {
			return state.refreshToken;
		},
	},
};

function handleMutationError(error: any, mutationName: string) {
	logging.debug(
		`'${mutationName}' mutation error inside store auth module mutations: ${error}`
	);
	throw error;
}

async function handleActionError(error: any, actionName: string): Promise<IApiResponse> {
	logging.debug(`'${actionName}' action error inside store auth module: ${error}`);
	throw new Error(`${error?.statusText}`, { cause: error?.data?.detail });
}
