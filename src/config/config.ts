import ConfigInterface from "./config.interface";
import * as dotenv from "dotenv";
import ConfigEnum from "./config.enum";
dotenv.config();

class Config implements ConfigInterface {
	readonly #envConfig: { [key: string]: string };

	constructor() {
		this.#envConfig = {
			PORT: process.env.PORT ?? "3000",
			DB_HOST: process.env.DB_HOST ?? "127.0.0.1",
			DB_PORT: process.env.DB_PORT ?? "27017",
			DB_USERNAME: process.env.DB_USERNAME ?? "root",
			DB_PASSWORD: process.env.DB_PASSWORD ?? "toor",
			NODE_ENV: process.env.NODE_ENV ?? "development"
		};
	}

	get(key: ConfigEnum): string {
		return this.#envConfig[key];
	}
}

export default Config;
