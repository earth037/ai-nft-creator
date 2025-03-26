
import { useState } from "react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Check, X } from "lucide-react";
import { toast } from "sonner";

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

export function ImageGenerator({ onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const { generateImage, generating, error } = useImageGeneration();
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    try {
      setIsImageLoaded(false);
      const imageUrl = await generateImage(prompt);
      setGeneratedImageUrl(imageUrl);
      onImageGenerated(imageUrl);
    } catch (err) {
      toast.error("Failed to generate image");
      console.error(err);
    }
  };

  const handleAccept = () => {
    if (generatedImageUrl) {
      onImageGenerated(generatedImageUrl);
      toast.success("Image accepted!");
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium mb-1">
          Enter your prompt
        </label>
        <div className="flex gap-2">
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A futuristic cityscape with neon lights and flying cars"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={generating}
          />
          <Button
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="gap-2"
          >
            {generating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {generating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>

      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/50 flex items-center justify-center mb-4">
        {generating && !generatedImageUrl && (
          <div className="text-center">
            <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Generating your image...</p>
          </div>
        )}
        
        {!generating && !generatedImageUrl && !error && (
          <div className="text-center p-8">
            <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Enter a prompt and click Generate to create your NFT image
            </p>
          </div>
        )}
        
        {error && (
          <div className="text-center p-8">
            <X className="h-12 w-12 mx-auto text-destructive mb-4" />
            <p className="text-destructive">{error}</p>
          </div>
        )}
        
        {generatedImageUrl && (
          <>
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            )}
            <img
              src={generatedImageUrl}
              alt="Generated art"
              className={`h-full w-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </>
        )}
      </div>

      {generatedImageUrl && (
        <div className="flex gap-2">
          <Button
            onClick={handleAccept}
            className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4" />
            Accept Image
          </Button>
          <Button
            onClick={handleRegenerate}
            variant="outline"
            className="gap-2"
            disabled={generating}
          >
            <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        </div>
      )}
    </div>
  );
}
