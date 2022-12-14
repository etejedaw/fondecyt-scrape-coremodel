import MongoDbInterface from "../database/mongodb/mongodb.interface";
import Config from "./config";
import ConfigEnum from "./config.enum";

const config = new Config();

export const mongodbConfig: MongoDbInterface = {
	DB_PORT: config.get(ConfigEnum.DB_PORT),
	DB_HOST: config.get(ConfigEnum.DB_HOST),
	DB_USERNAME: config.get(ConfigEnum.DB_USERNAME),
	DB_PASSWORD: config.get(ConfigEnum.DB_PASSWORD)
}