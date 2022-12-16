import LevelsInterface from "../levels.interface";
import winston from "winston";
import { AbstractConfigSetLevels } from "winston/lib/winston/config";

class Winston implements LevelsInterface {
	#winstonLogger: winston.Logger;

	constructor(environment: string) {
		this.#winstonLogger = winston.createLogger({
			level: this.#getLevel(environment),
			levels: this.#getLevels(),
			format: this.#getFormat(),
			transports: this.#getTransport()
		});
	}

	#getLevel(environment: string): string {
		const isDevelopment = environment === "development";
		return isDevelopment ? "silly" : "warn";
	}

	#getLevels(): AbstractConfigSetLevels {
		return {
			fatal: 0,
			error: 1,
			warn: 2,
			notice: 3,
			info: 4,
			verbose: 5,
			debug: 6,
			silly: 7
		};
	}

	#getTransport(): winston.transport[] {
		return [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: "logs/error.log",
				level: "error"
			}),
			new winston.transports.File({ filename: "logs/all.log" })
		];
	}

	#getFormat(): winston.Logform.Format {
		return winston.format.combine(
			winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
			winston.format.printf(info => {
				const timestamp = info.timestamp as string;
				const level = info.level;
				const message = info.message as string;
				let data = info.data;
				if (data === undefined) data = "";
				else data = "| ".concat(data);
				return `${timestamp} | ${level} | ${message} ${data as string}`;
			})
		);
	}

	error(message: string, data?: string): void {
		this.#winstonLogger.error({ message, data });
	}

	info(message: string, data?: string): void {
		this.#winstonLogger.info({ message, data });
	}

	notice(message: string, data?: string): void {
		this.#winstonLogger.notice({ message, data });
	}

	warn(message: string, data?: string): void {
		this.#winstonLogger.warn({ message, data });
	}
}

export default Winston;
