import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const getPrompt = (lang: Language) => `
Tu es "EcoBot", un assistant rigolo pour les enfants. 
Ta mission est d'identifier le déchet sur l'image et de dire à l'enfant dans quelle poubelle il doit le jeter.
Les poubelles possibles sont :
1. organic (Restes de nourriture, végétaux)
2. paper (Journaux, boîtes)
3. plastic (Bouteilles, conserves en plastique)
4. glass (Bouteilles, bocaux)
5. metal (Canettes, boîtes de conserve, aluminium)
6. general (Le reste, ce qui ne se recycle pas)

IMPORTANT: Réponds UNIQUEMENT au format JSON.
IMPORTANT: Le champ "message" et "wasteName" DOIVENT être traduits en langue "${lang === 'fr' ? 'français' : lang === 'en' ? 'anglais' : 'arabe'}".

Structure ta réponse en JSON simple comme ceci :
{
  "wasteName": "Nom du déchet identifié (traduit)",
  "binType": "organic" | "paper" | "plastic" | "glass" | "metal" | "general",
  "message": "Ton message rigolo ici (traduit)."
}
`;

export const analyzeWasteImage = async (base64Image: string, lang: Language): Promise<{ wasteName: string; binType: string; message: string } | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key is missing");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Clean base64 string if it contains the data url prefix
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: getPrompt(lang)
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    if (!responseText) return null;

    return JSON.parse(responseText);

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw error;
  }
};