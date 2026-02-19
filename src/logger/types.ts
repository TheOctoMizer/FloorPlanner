export type LogLevel = 'info' | 'error' | 'debug' | 'warn' | 'success';

export interface LogStrategy {
    name: string;
    log(level: LogLevel, message: string, metadata?: any): void;
}