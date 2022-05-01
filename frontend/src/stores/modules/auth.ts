import {
	getLocalStorageSync,
	setLocalStorageSync,
	removeItemLocalStorageSync,
} from '@/services/util/storage';
import logging from '@/services/logging/logger';
import { IApiResponse } from '@/interfaces/api/IApiResponse';
import { useGlobalToast } from '@/toast';
import router from '@/router';

const toast = useGlobalToast();

export default {
	namespaced: true,
	state: () => ({
		isLoggedIn: Boolean(getLocalStorageSync('sessionActive', false)),
		accessToken: getLocalStorageSync('accessToken', null),
		refreshToken: getLocalStorageSync('refreshToken', null),
		tokenIsRefreshing: false,
	}),
	mutations: {
		loggedIn: (state: any, { payload }) => {
			try {
				logging.debug(`Mutation auth/loggedIn called`);
				if (payload.data.access_token && payload.data.refresh_token) {
					state.accessToken = payload.data.access_token;
					state.refreshToken = payload.data.refresh_token;
					setLocalStorageSync('accessToken', state.accessToken);
					setLocalStorageSync('refreshToken', state.refreshToken);
					setLocalStorageSync('sessionActive', 'true');
					state.isLoggedIn = true;
					toast.success('Successfull Login');
				} else {
					throw new Error(
						'The loggedIn mutation in the Auth store needs an access token and a refresh token but some were empty.'
					);
				}
			} catch (error) {
				handleMutationError(error, 'loggedIn');
			}
		},
		loggedOut: (state: any, showMessage: boolean = true) => {
			try {
				logging.debug(`Mutation auth/loggedOut called`);
				state.isLoggedIn = false;
				state.accessToken = null;
				state.refreshToken = null;
				removeItemLocalStorageSync('sessionActive');
				removeItemLocalStorageSync('accessToken');
				removeItemLocalStorageSync('refreshToken');
				if (showMessage) {
					toast.success('Successful Logout');
				}
				router.push({ path: "/welcome", query: { loggedOut: "true" } });
			} catch (error) {
				handleMutationError(error, 'loggedOut');
			}
		},
		tokenRefreshStarted: (state: any) => {
			logging.debug(`Mutation auth/tokenRefreshStarted called`);
			state.tokenIsRefreshing = true;
		},
		tokenRefreshComplete: (state: any) => {
			logging.debug(`Mutation auth/tokenRefreshComplete called`);
			state.tokenIsRefreshing = false;
		},
		setTokens: (state: any, tokens: any) => {
			try {
				logging.debug(`Mutation auth/setTokens called`);
				if (tokens.access_token && tokens.refresh_token) {
					state.accessToken = tokens.access_token;
					state.refreshToken = tokens.refresh_token;
					setLocalStorageSync('accessToken', state.accessToken);
					setLocalStorageSync('refreshToken', state.refreshToken);
					logging.debug('Successfully refreshed the tokens.');
				} else {
					throw new Error(
						'The setTokens mutation in the Auth store needs an access token and a refresh token but some were empty.'
					);
				}
			} catch (error) {
				handleMutationError(error, 'setTokens');
			}
		},
	},
	actions: {},
	getters: {
		tokenIsRefreshing(state: any) {
			return state.tokenIsRefreshing;
		},
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

async function handleActionError(
	error: any,
	actionName: string
): Promise<IApiResponse> {
	logging.debug(
		`'${actionName}' action error inside store auth module: ${error}`
	);
	throw new Error(`${error?.statusText}`, { cause: error?.data?.detail });
}
