import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1K');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size, aspectRatio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-surface-1 border border-gold-dim p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gold-dim/20 rounded-lg">
          <ImageIcon className="w-5 h-5 text-gold-base" />
        </div>
        <h2 className="font-display text-2xl text-text-primary">AI Image Generator</h2>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block font-sans text-sm text-text-secondary mb-2">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full bg-ground border border-gold-dim/50 rounded-xl p-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-gold-mid transition-colors min-h-[100px] resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-sans text-sm text-text-secondary mb-2">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full bg-ground border border-gold-dim/50 rounded-xl p-3 text-text-primary focus:outline-none focus:border-gold-mid transition-colors"
            >
              <option value="1K">1K</option>
              <option value="2K">2K</option>
              <option value="4K">4K</option>
            </select>
          </div>
          <div>
            <label className="block font-sans text-sm text-text-secondary mb-2">Aspect Ratio</label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full bg-ground border border-gold-dim/50 rounded-xl p-3 text-text-primary focus:outline-none focus:border-gold-mid transition-colors"
            >
              <option value="1:1">1:1 Square</option>
              <option value="16:9">16:9 Landscape</option>
              <option value="9:16">9:16 Portrait</option>
              <option value="3:2">3:2 Classic</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-3 text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Image
            </>
          )}
        </Button>
      </form>

      {generatedImage && (
        <div className="mt-8 space-y-4">
          <h3 className="font-sans text-sm text-text-secondary">Generated Result</h3>
          <div className="rounded-xl overflow-hidden border border-gold-dim bg-ground relative aspect-video">
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full h-full object-contain"
            />
          </div>
          <a
            href={generatedImage}
            download="generated-image.png"
            className="block text-center font-sans text-sm text-gold-base hover:text-gold-bright transition-colors"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
