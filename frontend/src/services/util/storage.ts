const getLocalStorageAsync = async (key: string, defaultValue: unknown) => {
	await new Promise((resolve, reject) => {
		try {
			const result = localStorage.getItem(key);
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
			resolve(true);
		} catch (exception) {
			reject(exception);
		}
	});
};

const getLocalStorageSync = (key: string, defaultValue: unknown) => {
	try {
		const result = localStorage.getItem(key);
		return result == null ? defaultValue : result;
	} catch (exception) {
		console.error(exception);
	}
};

const setLocalStorageSync = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
		return true;
	} catch (exception) {
		console.error(exception);
	}
};

export {
	getLocalStorageAsync,
	setLocalStorageAsync,
	setLocalStorageSync,
	getLocalStorageSync,
};
