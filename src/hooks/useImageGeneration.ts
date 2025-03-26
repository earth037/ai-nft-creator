
import { useState } from 'react';

interface UseImageGenerationReturn {
  generatedImage: string | null;
  generating: boolean;
  error: string | null;
  generateImage: (prompt: string) => Promise<string>;
}

export function useImageGeneration(): UseImageGenerationReturn {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "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";
  
  const generateImage = async (prompt: string): Promise<string> => {
    setGenerating(true);
    setError(null);
    
    try {
      // For demo purposes, we'll use a mock response
      // In a real app, you would make an actual API call to Hugging Face
      
      /* Real API call would be something like:
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error generating image: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      */
      
      // For demo, simulate a delay and use a placeholder image
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Generate a random image from Unsplash for demo purposes
      const seed = Math.floor(Math.random() * 1000);
      const imageUrl = `https://picsum.photos/seed/${seed}/800/800`;
      
      setGeneratedImage(imageUrl);
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  return {
    generatedImage,
    generating,
    error,
    generateImage,
  };
}
