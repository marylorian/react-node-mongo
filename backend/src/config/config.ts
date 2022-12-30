import dotenv from "dotenv";

import { Environments } from "../constants/environments";

dotenv.config();

interface ProcessEnv {
	NODE_ENV?: string;
	PORT?: string;
	DB_URL?: string;
	SECRET?: string;
	ORIGINS_WHITELIST?: string;
	DB_USERNAME?: string;
	DB_PASSWORD?: string;
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
		DB_PASSWORD,
		DB_USERNAME,
		SECRET,
		ORIGINS_WHITELIST = "",
	} = process.env as ProcessEnv;

	if (!DB_URL || !SECRET || !DB_PASSWORD || !DB_USERNAME) {
		throw Error("Server ran with incorrect configuration");
	}

	const dataBaseUrl = DB_URL.split("mongodb+srv://").reduce(
		(acc, str) =>
			!acc
				? `mongodb+srv://`
				: `${acc}${DB_USERNAME}:${DB_PASSWORD}@${str}`,
		"",
	);

	return {
		environment: (NODE_ENV as Environments) || Environments.Dev,
		port: PORT && !isNaN(Number(PORT)) ? Number(PORT) : 8080,
		dataBaseUrl,
		secret: SECRET as string,
		originsWhitelist: ORIGINS_WHITELIST.split(",") || [],
	};
};

export default getConfig();
