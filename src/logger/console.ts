import { LogLevel, LogStrategy } from "./types";

export class ConsoleLogger implements LogStrategy {
    name: string = 'Console';

    log(level: LogLevel, message: string) {
        const timestamp = new Date().toISOString();
        const color = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : level === 'debug' ? '\x1b[36m' : level === 'success' ? '\x1b[32m' : '\x1b[37m';
        console.log(`${color}[${timestamp}] [${level.toUpperCase()}] ${message}\x1b[0m`);
    }
}