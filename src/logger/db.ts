import { LogLevel, LogStrategy } from "./types";
import { getDB } from "../db/database";

export class DatabaseLogger implements LogStrategy {
    name: string = 'Database';

    constructor() {
        const db = getDB();

        const dbCreateStatement = `
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                level TEXT,
                message TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        db.exec(dbCreateStatement);
    }

    log(level: LogLevel, message: string) {
        const db = getDB();
        const updateLogStatement = db.prepare('INSERT INTO logs (level, message, timestamp) VALUES (?, ?, ?)');
        updateLogStatement.run(level, message, new Date().toISOString());
    }
}