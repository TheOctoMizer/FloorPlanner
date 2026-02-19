declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { initDB, getProjectList, getLLMProvider, setLLMProvider, getLLMProviderBaseUrl, setLLMProviderBaseUrl, getLLMProviderApiKey, setLLMProviderApiKey } from './db/database';
import { logger } from './logger';
import { FileLogger } from './logger/file';
import { DatabaseLogger } from './logger/db';
import { AIProvider } from './ai_provider/types';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  logger.addStrategy(new FileLogger());

  initDB();

  logger.addStrategy(new DatabaseLogger());
  logger.success(`Application launched at ${new Date().toISOString()}`);

  // IPC Handler for DB
  ipcMain.handle('get-projects', async () => {
    return getProjectList();
  });

  ipcMain.handle('get-llm-provider', async () => {
    return getLLMProvider();
  });

  ipcMain.handle('set-llm-provider', async (_, provider: AIProvider) => {
    return setLLMProvider(provider);
  });

  ipcMain.handle('get-llm-provider-base-url', async () => {
    return getLLMProviderBaseUrl();
  });

  ipcMain.handle('set-llm-provider-base-url', async (_, baseUrl: string) => {
    return setLLMProviderBaseUrl(baseUrl);
  });

  ipcMain.handle('get-llm-provider-api-key', async () => {
    return getLLMProviderApiKey();
  });

  ipcMain.handle('set-llm-provider-api-key', async (_, apiKey: string) => {
    return setLLMProviderApiKey(apiKey);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
