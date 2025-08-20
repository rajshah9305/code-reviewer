
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackItem, ReviewResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an expert code reviewer AI. Your task is to analyze the provided code snippet and return structured feedback. 
- Identify potential bugs, performance issues, style violations, and suggest improvements. 
- For each piece of feedback, you must provide the line number(s), severity, a concise comment explaining the issue, and a concrete suggestion for improvement.
- The severity must be one of: 'Critical', 'Warning', 'Suggestion', 'Nitpick'.
- Ensure your entire response is a single JSON object that strictly adheres to the provided schema. Do not include any markdown formatting or introductory text outside the JSON object.`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        feedback: {
            type: Type.ARRAY,
            description: "A list of feedback items for the code.",
            items: {
                type: Type.OBJECT,
                properties: {
                    line: {
                        type: Type.STRING,
                        description: "The line number(s) the feedback applies to. Can be a single number, a range (e.g., '10-15'), or 'N/A' for general comments."
                    },
                    severity: {
                        type: Type.STRING,
                        description: "The severity of the issue. Must be one of: 'Critical', 'Warning', 'Suggestion', 'Nitpick'."
                    },
                    comment: {
                        type: Type.STRING,
                        description: "A concise explanation of the issue or area for improvement."
                    },
                    suggestion: {
                        type: Type.STRING,
                        description: "A concrete code snippet or detailed explanation of how to fix the issue."
                    }
                },
                required: ["line", "severity", "comment", "suggestion"]
            }
        }
    },
    required: ["feedback"]
};

export const reviewCode = async (code: string): Promise<FeedbackItem[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: code,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema,
                temperature: 0.3,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse: ReviewResponse = JSON.parse(jsonText);
        return parsedResponse.feedback || [];
    } catch (error) {
        console.error("Error reviewing code:", error);
        throw new Error("Failed to get review from Gemini. Please check the console for more details.");
    }
};
