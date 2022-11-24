import dotenv from "dotenv";

import { Environments } from "../constants/environments";

dotenv.config();

interface ProcessEnv {
	NODE_ENV?: string;
	PORT?: string;
	DB_URL?: string;
	SECRET?: string;
	ORIGINS_WHITELIST?: string;
}

interface Config {
	environment: Environments;
	port: number;
	dataBaseUrl: string;
	secret: string;
	originsWhitelist: string[];
}

const getConfig = (): Config => {
	const {
		NODE_ENV,
		PORT,
		DB_URL,
		SECRET,
		ORIGINS_WHITELIST = "",
	} = process.env as ProcessEnv;

	if (!DB_URL || !SECRET) {
		throw Error("Server ran with incorrect configuration");
	}

	return {
		environment: (NODE_ENV as Environments) || Environments.Dev,
		port: PORT && !isNaN(Number(PORT)) ? Number(PORT) : 8080,
		dataBaseUrl: DB_URL as string,
		secret: SECRET as string,
		originsWhitelist: ORIGINS_WHITELIST.split(",") || [],
	};
};

export default getConfig();
