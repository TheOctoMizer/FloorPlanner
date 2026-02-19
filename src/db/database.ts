import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";
import fs from "fs";

let db: Database.Database;

export function initDB() {
    const userDataPath = app.getPath("userData");
    const dbDir = path.join(userDataPath, "db");
    const dbPath = path.join(dbDir, "floorplanner.db");

    console.log(`Initializing DB at: ${dbPath}`);

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir);
    }

    db = new Database(dbPath);

    db.pragma('journal_mode = WAL');

    const createTableStatements = [
        `CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );`,
        `CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );`
    ];
    db.exec(createTableStatements.join('\n'));

    const seed = db.prepare('INSERT OR IGNORE INTO config (key, value) VALUES (?, ?)');
    seed.run('theme', 'dark');
    seed.run('llm_provider', 'lm-studio');
}

export function getConfig(key: string): string | undefined {
    const stmt = db.prepare('SELECT value FROM config WHERE key = ?');
    const row = stmt.get(key) as { value: string } | undefined;
    return row ? row.value : undefined;
}

export function setConfig(key: string, value: string) {
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
    stmt.run(key, value);
}

export function getDB() {
    return db;
}