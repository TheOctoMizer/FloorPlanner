import { LogLevel, LogStrategy } from "./types";
import fs from "fs";
import path from "path";
import { app } from "electron";

export class FileLogger implements LogStrategy {
    name: string = 'File';
    private stream: fs.WriteStream;

    constructor() {
        const userDataPath = app.getPath('userData');
        const logDir = path.join(userDataPath, 'logs');
        const logFile = path.join(logDir, `log_${new Date().toISOString().split('T')[0]}.log`);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        this.stream = fs.createWriteStream(logFile, { flags: 'a' });
    }

    log(level: LogLevel, message: string) {
        const timestamp = new Date().toISOString();
        this.stream.write(`${timestamp} [${level.toUpperCase()}] ${message}\n`);
    }
}