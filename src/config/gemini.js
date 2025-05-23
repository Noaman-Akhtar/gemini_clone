// const apikey="AIzaSyDlkwjQ1-jEF-oFUMxxYj6OMU8PJFkni0Y";
// See https://developers.google.com/apps-script/guides/properties

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: " api key " });

async function main(Prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: Prompt,
  });
   return response.text;
}

export default main;