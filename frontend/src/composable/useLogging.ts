import config from '/@src/config';

export function useLogging() {
  const LOG_LEVEL = config.LOG_LEVEL.toLowerCase();

  const debug = async (data: any) => {
    if (LOG_LEVEL === 'debug') console.log(data);
  };

  const info = async (data: any) => {
    if (LOG_LEVEL === 'info' || LOG_LEVEL === 'debug') console.log(data);
  };

  const error = async (data: any) => {
    if (LOG_LEVEL === 'error' || LOG_LEVEL === 'debug' || LOG_LEVEL === 'info')
      console.error(data);
  };

  return { debug, info, error };
}
