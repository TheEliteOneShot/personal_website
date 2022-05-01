import config from '@/config';

class logger {
	LOG_LEVEL = config.LOG_LEVEL.toLowerCase();

	debug = async (data: any) => {
		if (this.LOG_LEVEL === 'debug') console.log(data);
	};

	info = async (data: any) => {
		if (this.LOG_LEVEL === 'info' || this.LOG_LEVEL === 'debug')
			console.log(data);
	};

	error = async (data: any) => {
		if (
			this.LOG_LEVEL === 'error' ||
			this.LOG_LEVEL === 'debug' ||
			this.LOG_LEVEL === 'info'
		)
			console.error(data);
	};
}

export default new logger();
