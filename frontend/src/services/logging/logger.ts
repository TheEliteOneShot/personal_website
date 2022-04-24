import config from '@/config';

class logger {
	LOG_LEVEL = config.LOG_LEVEL.toLowerCase();

	debug = async (data: any) => {
		if (this.LOG_LEVEL === 'debug') console.log(data);
	};

    info = async (data: any) => {
		if (this.LOG_LEVEL === 'info') console.log(data);
	};

    error = async (data: any) => {
		if (this.LOG_LEVEL === 'error') console.error(data);
	};
}

export default new logger();
