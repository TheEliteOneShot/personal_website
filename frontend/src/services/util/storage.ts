import logger from "@/services/logging/logger";

const getLocalStorageAsync = async (key: string, defaultValue: unknown) => {
	await new Promise((resolve, reject) => {
		try {
			const result = localStorage.getItem(key);
			logger.debug(`Got item from local storage asynchronously. Key: ${key} Value: ${result == null ? defaultValue : result}`)
			resolve(result == null ? defaultValue : result);
		} catch (exception) {
			reject(exception);
		}
	});
};

const setLocalStorageAsync = async (key: string, value: string) => {
	await new Promise((resolve, reject) => {
		try {
			localStorage.setItem(key, value);
			logger.debug(`Added item to local storage asynchronously. Key: ${key} Value: ${value}`)
			resolve(true);
		} catch (exception) {
			reject(exception);
		}
	});
};

const removeItemLocalStorageAsync = async (key: string) => {
	await new Promise((resolve, reject) => {
		try {
			localStorage.removeItem(key);
			logger.debug(`Remove item from local storage asynchronously. Key: ${key}`)
			resolve(true);
		} catch (exception) {
			reject(exception);
		}
	});
};

const getLocalStorageSync = (key: string, defaultValue: unknown) => {
	try {
		const result = localStorage.getItem(key);
		logger.debug(`Got item from local storage synchronously. Key: ${key} Value: ${result == null ? defaultValue : result}`)
		return result == null ? defaultValue : result;
	} catch (exception) {
		console.error(exception);
	}
};

const setLocalStorageSync = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
		logger.debug(`Set item in local storage synchronously. Key: ${key} Value: ${value}`)
		return true;
	} catch (exception) {
		console.error(exception);
	}
};

const removeItemLocalStorageSync = (key: string) => {
	try {
		localStorage.removeItem(key);
		logger.debug(`Removed item from local storage synchronously. Key: ${key}`)
		return true;
	} catch (exception) {
		console.error(exception);
	}
};



export {
	removeItemLocalStorageSync,
	removeItemLocalStorageAsync,
	getLocalStorageAsync,
	getLocalStorageSync,
	setLocalStorageAsync,
	setLocalStorageSync
};
