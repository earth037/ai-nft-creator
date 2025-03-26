
import { useState } from 'react';
import { toast } from 'sonner';

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
      console.log("Generating image with prompt:", prompt);
      
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
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `Error generating image: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      console.log("Image generated successfully:", imageUrl);
      setGeneratedImage(imageUrl);
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Image generation error:", errorMessage);
      setError(errorMessage);
      
      // Fallback to a placeholder image if the API fails
      toast.error("API error: Using a placeholder image instead");
      const seed = Math.floor(Math.random() * 1000);
      const fallbackImageUrl = `https://picsum.photos/seed/${seed}/800/800`;
      setGeneratedImage(fallbackImageUrl);
      return fallbackImageUrl;
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
