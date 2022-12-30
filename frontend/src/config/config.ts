import { Environments } from "../constants";

interface ProcessEnv {
  REACT_APP_API_URL?: string;
  NODE_ENV?: string;
}

interface Config {
  apiUrl: string;
  environment: Environments;
}

const getConfig = (): Config => {
  const { REACT_APP_API_URL, NODE_ENV } = process.env as ProcessEnv;

  return {
    apiUrl: REACT_APP_API_URL as string,
    environment: (NODE_ENV as Environments) || Environments.Dev,
  };
};

export default getConfig();
