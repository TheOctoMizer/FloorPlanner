import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";
import fs from "fs";
import { logger } from "../logger";

let db: Database.Database;

export function initDB() {
    const userDataPath = app.getPath("userData");
    const dbDir = path.join(userDataPath, "db");
    const dbPath = path.join(dbDir, "floorplanner.db");

    logger.info(`Initializing DB at: ${dbPath}`);

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
    );`,
        `CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );`
    ];
    db.exec(createTableStatements.join('\n'));

    const seed = db.prepare('INSERT OR IGNORE INTO config (key, value) VALUES (?, ?)');
    seed.run('theme', 'dark');
    seed.run('llm_provider', 'lm-studio');

    // const seedProject = db.prepare('INSERT OR IGNORE INTO projects (name) VALUES (?)');
    // seedProject.run('My New Flat');
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



export function getLLMProvider() {
    const db = getDB();
    const provider = db.prepare('SELECT value FROM config WHERE key = ?').get('llm_provider') as { value: string } | undefined;
    return provider?.value;
}

export function setLLMProvider(provider: string) {
    const db = getDB();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
    stmt.run('llm_provider', provider);
}



export function getGoogleModel() {
    const db = getDB();
    const model = db.prepare('SELECT value FROM config WHERE key = ?').get('google_model') as { value: string } | undefined;
    return model?.value;
}

export function setGoogleModel(model: string) {
    const db = getDB();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
    stmt.run('google_model', model);
}



export function getGoogleApiKey() {
    const db = getDB();
    const apiKey = db.prepare('SELECT value FROM config WHERE key = ?').get('google_api_key') as { value: string } | undefined;
    return apiKey?.value;
}

export function setGoogleApiKey(apiKey: string) {
    const db = getDB();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
    stmt.run('google_api_key', apiKey);
}



export function setOpenAIKey(key: string) {
    const db = getDB();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
    stmt.run('openai_key', key);
}

export function getOpenAIKey() {
    const db = getDB();
    const apiKey = db.prepare('SELECT value FROM config WHERE key = ?').get('openai_key') as { value: string } | undefined;
    return apiKey?.value;
}



export function setOpenAIModel(model: string) {
    const db = getDB();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
    stmt.run('openai_model', model);
}

export function getOpenAIModel() {
    const db = getDB();
    const model = db.prepare('SELECT value FROM config WHERE key = ?').get('openai_model') as { value: string } | undefined;
    return model?.value;
}

export function getProjectList() {
    const db = getDB();
    const projects = db.prepare('SELECT * FROM projects').all() as { name: string }[];
    logger.info(`Projects: ${JSON.stringify(projects)}`);
    return projects;
}