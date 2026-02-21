import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";
import fs from "fs";
import { logger } from "../logger";
import { ThemeType } from "../types/themeType";

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
    );`,
        `CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      is_user INTEGER NOT NULL,
      is_design INTEGER DEFAULT 0,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    );`
    ];
    db.exec(createTableStatements.join('\n'));

    const seed = db.prepare('INSERT OR IGNORE INTO config (key, value) VALUES (?, ?)');
    seed.run('theme', 'dark');
    seed.run('llm_provider', 'OpenAI');

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

export function setLLMProviderBaseUrl(baseUrl: string) {
    const db = getDB();
    const llmProvider = getLLMProvider();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?,?)')
    stmt.run(llmProvider + '_base_url', baseUrl);
}

export function getLLMProviderBaseUrl() {
    const db = getDB();
    const llmProvider = getLLMProvider();
    const baseUrl = db.prepare('SELECT value FROM config WHERE key = ?').get(llmProvider + '_base_url') as { value: string } | undefined;
    return baseUrl?.value;
}

export function setLLMProviderApiKey(apiKey: string) {
    const db = getDB();
    const llmProvider = getLLMProvider();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?,?)')
    stmt.run(llmProvider + '_api_key', apiKey);
}

export function getLLMProviderApiKey() {
    const db = getDB();
    const llmProvider = getLLMProvider();
    const apiKey = db.prepare('SELECT value FROM config WHERE key = ?').get(llmProvider + '_api_key') as { value: string } | undefined;
    return apiKey?.value;
}

export function getProjectList() {
    const db = getDB();
    const projects = db.prepare('SELECT id, name FROM projects').all() as { id: number, name: string }[];
    return projects;
}

export function getProjectById(id: number) {
    const db = getDB();
    const project = db.prepare('SELECT id, name FROM projects WHERE id = ?').get(id) as { id: number, name: string } | undefined;
    return project;
}


export function createProject(name: string) {
    const db = getDB();
    // sanitized project names to prevent sql injection
    let sanitizedName = name.replace(/'/g, "''");
    // replace spaces with underscores
    sanitizedName = sanitizedName.replace(/ /g, "_");
    // replace special characters with underscores
    sanitizedName = sanitizedName.replace(/[^a-zA-Z0-9_]/g, "_");
    // replace multiple underscores with a single underscore
    sanitizedName = sanitizedName.replace(/_+/g, "_");
    // remove leading and trailing underscores
    sanitizedName = sanitizedName.replace(/^_/, "");
    sanitizedName = sanitizedName.replace(/_$/, "");
    // remove stray spaces - end and beginning
    sanitizedName = sanitizedName.replace(/^\s+/, "");
    sanitizedName = sanitizedName.replace(/\s+$/, "");
    // All lower case
    sanitizedName = sanitizedName.toLowerCase();
    // names should be in kebab case
    sanitizedName = sanitizedName.replace(/_/g, "-");
    const stmt = db.prepare('INSERT INTO projects (name) VALUES (?)');
    const result = stmt.run(sanitizedName);
    return { id: Number(result.lastInsertRowid), name: sanitizedName };
}


export function deleteProject(id: number) {
    const db = getDB();
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    stmt.run(id);
}


export function getTheme() {
    const db = getDB();
    const theme = db.prepare('SELECT value FROM config WHERE key = ?').get('theme') as { value: ThemeType } | undefined;
    return theme?.value;
}

export function setTheme(theme: ThemeType) {
    const db = getDB();
    const stmt = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?,?)')
    stmt.run('theme', theme);
}

export function getChatHistory(projectId: number) {
    const db = getDB();
    const stmt = db.prepare('SELECT content as message, is_user as isUser, is_design as isDesign, timestamp as timestamp FROM chat_messages WHERE project_id = ? ORDER BY id ASC');
    const rows = stmt.all(projectId) as { message: string, isUser: number, isDesign: number, timestamp: string }[];

    // Convert 0/1 back to booleans for the UI
    return rows.map(row => ({
        ...row,
        isUser: !!row.isUser,
        isDesign: !!row.isDesign
    }));
}

export function addChatMessage(projectId: number, message: string, isUser: boolean, isDesign: boolean = false) {
    const db = getDB();
    const stmt = db.prepare('INSERT INTO chat_messages (project_id, content, is_user, is_design) VALUES (?, ?, ?, ?)');
    stmt.run(projectId, message, isUser ? 1 : 0, isDesign ? 1 : 0);
}
