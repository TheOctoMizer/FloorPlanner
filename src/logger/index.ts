import { LogStrategy, LogLevel } from "./types";
import { ConsoleLogger } from "./console";
import { FileLogger } from "./file";
import { DatabaseLogger } from "./db";

class LoggerManager {
    private strategies: LogStrategy[] = [];

    public addStrategy(strategy: LogStrategy) {
        this.strategies.push(strategy);
    }

    private _broadcast(level: LogLevel, message: string) {
        this.strategies.forEach(strategy => {
            try {
                strategy.log(level, message);
            } catch (error) {
                console.error(`Failed to log to ${strategy.name}:`, error);
            }
        })
    }

    constructor() {
        this.addStrategy(new ConsoleLogger());
    }


    public info(message: string) {
        this._broadcast('info', message);
    }

    public error(message: string) {
        this._broadcast('error', message);
    }

    public warn(message: string) {
        this._broadcast('warn', message);
    }

    public debug(message: string) {
        this._broadcast('debug', message);
    }

    public success(message: string) {
        this._broadcast('success', message);
    }
}

export const logger = new LoggerManager();
