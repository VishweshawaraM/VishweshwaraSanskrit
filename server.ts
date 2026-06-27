import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // API route for Image Generation
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio, size } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const interaction = await ai.interactions.create({
        model: "gemini-3-pro-image-preview",
        input: prompt,
        response_modalities: ["image"],
        generation_config: {
          image_config: {
            aspect_ratio: aspectRatio || "16:9",
            image_size: size || "1K", // 1K, 2K, 4K
          },
        },
      });

      let imageBase64 = null;
      let mimeType = "image/png";

      for (const step of interaction.steps) {
        if (step.type === "model_output") {
          const imageContent = step.content?.find(c => c.type === "image");
          if (imageContent && imageContent.data) {
            imageBase64 = imageContent.data;
            if (imageContent.mime_type) {
              mimeType = imageContent.mime_type;
            }
          }
        }
      }

      if (imageBase64) {
        res.json({ imageUrl: `data:${mimeType};base64,${imageBase64}` });
      } else {
        res.status(500).json({ error: "No image was generated." });
      }
    } catch (error: any) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
