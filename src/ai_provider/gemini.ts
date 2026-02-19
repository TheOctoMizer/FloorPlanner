import { GoogleGenAI } from "@google/genai";
import { getGoogleApiKey } from "src/db/database";


export const client = new GoogleGenAI({
    apiKey: getGoogleApiKey(),
});