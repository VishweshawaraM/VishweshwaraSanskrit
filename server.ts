import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // Email route using Resend or Nodemailer test account
  app.post("/api/email", async (req, res) => {
    try {
      const { to, subject, html } = req.body;
      const resendApiKey = process.env.RESEND_API_KEY;

      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const data = await resend.emails.send({
          from: 'Vishweshwara <onboarding@resend.dev>', // Use a default resend testing email
          to: Array.isArray(to) ? to : [to],
          subject: subject,
          html: html,
        });
        return res.json({ success: true, data, provider: 'resend' });
      } 
      
      // Real SMTP fallback using Nodemailer
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
      
      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || '587'),
          secure: parseInt(SMTP_PORT || '587') === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });
        
        const info = await transporter.sendMail({
          from: SMTP_FROM || '"Visanskrit" <noreply@visanskrit.com>',
          to: Array.isArray(to) ? to.join(', ') : to,
          subject: subject,
          html: html,
        });
        
        return res.json({ 
          success: true, 
          messageId: info.messageId,
          provider: 'nodemailer' 
        });
      }
      
      // Final mock fallback
      console.log("No Email API keys found. Mocking email send:");
      console.log("To:", to);
      console.log("Subject:", subject);
      
      return res.json({ 
        success: true, 
        message: "Email mocked successfully (configure SMTP_* or RESEND_API_KEY for actual email delivery).",
        provider: 'mock' 
      });
    } catch (error: any) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: error.message || "Failed to send email" });
    }
  });

  app.post("/api/admin/check", async (req, res) => {
    try {
      const { email } = req.body;
      const adminEmail = process.env.ADMIN_EMAIL || "visanskrit.solopreneur@gmail.com";
      if (email === adminEmail) {
        return res.json({ isAdmin: true });
      }
      return res.json({ isAdmin: false });
    } catch (error: any) {
      console.error("Admin check error:", error);
      res.status(500).json({ error: error.message || "Failed to check admin status" });
    }
  });

  app.post("/api/admin/verify-password", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD || "admin";
      if (password === adminPassword) {
        return res.json({ success: true });
      }
      return res.json({ success: false, error: "Invalid password" });
    } catch (error: any) {
      console.error("Admin check error:", error);
      res.status(500).json({ error: error.message || "Failed to check password" });
    }
  });

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
      
      // Fallback to placeholder if rate limited or quota exceeded
      if (error.message && (error.message.includes("quota") || error.message.includes("too_many_requests") || error.status === 429)) {
        console.log("Falling back to placeholder image due to quota limits.");
        return res.json({ imageUrl: `https://images.unsplash.com/photo-1577401239170-897940cb75be?auto=format&fit=crop&q=80&w=1600&h=900` });
      }
      
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  // API route for Payment Order Generation
  app.post("/api/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      if (!keyId || !keySecret) {
        // Mock successful order creation if no keys are provided
        return res.json({
          id: `order_mock_${Date.now()}`,
          amount: amount * 100,
          currency,
          mock: true
        });
      }

      // If keys are provided, use the real Razorpay SDK
      const Razorpay = require('razorpay');
      const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
      
      const order = await instance.orders.create({
        amount: amount * 100, // amount in smallest currency unit
        currency,
        receipt: `receipt_${Date.now()}`,
      });

      res.json(order);
    } catch (error: any) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: error.message || "Failed to create order" });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
