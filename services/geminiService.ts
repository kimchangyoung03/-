import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export const generateProducts = async (category: string): Promise<Product[]> => {
  // Access process.env.API_KEY safely inside the function to prevent top-level crashes
  // in environments where process might be undefined during module load.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API Key is missing");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const prompt = `Generate a list of 8 realistic e-commerce products for the category: "${category}". 
    
    Requirements:
    1. Language: Use the same language as the category input (likely Korean) for names and descriptions.
    2. Pricing: EXTREMELY IMPORTANT - Varied discount percentages. 
       - 2-3 items must have LOW discounts (5-15%).
       - 3-4 items must have MEDIUM discounts (20-40%).
       - 2-3 items must have HIGH/CLEARANCE discounts (50-80%).
    3. Images: Provide a detailed 'imageKeyword' in ENGLISH. This will be used as a prompt for an AI image generator. 
       - Format: "photorealistic product shot of [product details], white background, studio lighting".
       - Example: "photorealistic product shot of red running shoes with white soles, side view, white background".
    4. Math: The discounted price must be strictly lower than the original price. Calculate discountPercentage accurately.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              originalPrice: { type: Type.NUMBER },
              discountedPrice: { type: Type.NUMBER },
              discountPercentage: { type: Type.INTEGER },
              rating: { type: Type.NUMBER },
              reviewCount: { type: Type.INTEGER },
              imageKeyword: { type: Type.STRING, description: "Detailed English visual description for image generation" },
            },
            required: ["id", "name", "description", "originalPrice", "discountedPrice", "discountPercentage", "rating", "reviewCount", "imageKeyword"],
          },
        },
      },
    });

    const jsonString = response.text;
    if (jsonString) {
      // Clean up any potential markdown formatting or extra whitespace
      const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanJson);
      return data as Product[];
    }
    return [];
  } catch (error) {
    console.error("Error generating products:", error);
    return [];
  }
};