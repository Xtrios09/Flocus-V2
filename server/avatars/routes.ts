import type { Express } from "express";
import { avatarService } from "./avatarService";
import { z } from "zod";

const avatarStyleSchema = z.enum([
  'pixel-art',
  'avataaars',
  'bottts',
  'identicon',
  'lorelei',
  'adventurer',
  'big-smile',
  'fun-emoji',
  'personas',
  'shapes'
]);

export function registerAvatarRoutes(app: Express) {
  app.get("/api/avatars/packs", (req, res) => {
    try {
      const packs = avatarService.getAvatarPacks();
      res.json(packs);
    } catch (error) {
      console.error('Error fetching avatar packs:', error);
      res.status(500).json({ error: "Failed to fetch avatar packs" });
    }
  });

  app.get("/api/avatars/packs/:packId", (req, res) => {
    try {
      const pack = avatarService.getAvatarPackById(req.params.packId);
      if (!pack) {
        return res.status(404).json({ error: "Avatar pack not found" });
      }
      res.json(pack);
    } catch (error) {
      console.error('Error fetching avatar pack:', error);
      res.status(500).json({ error: "Failed to fetch avatar pack" });
    }
  });

  app.post("/api/avatars/generate", (req, res) => {
    try {
      const schema = z.object({
        style: avatarStyleSchema,
        seed: z.string().optional(),
        backgroundColor: z.string().optional(),
        size: z.number().optional(),
      });

      const options = schema.parse(req.body);
      const avatarUrl = avatarService.generateAvatarUrl(options);
      
      res.json({ url: avatarUrl });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid avatar options", details: error.errors });
      }
      console.error('Error generating avatar:', error);
      res.status(500).json({ error: "Failed to generate avatar" });
    }
  });

  app.get("/api/avatars/random/:style", (req, res) => {
    try {
      const style = avatarStyleSchema.parse(req.params.style);
      const count = req.query.count ? parseInt(req.query.count as string) : 10;
      
      if (count > 50) {
        return res.status(400).json({ error: "Maximum count is 50" });
      }

      const avatars = avatarService.generateRandomAvatars(style, count);
      res.json({ avatars });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid avatar style" });
      }
      console.error('Error generating random avatars:', error);
      res.status(500).json({ error: "Failed to generate random avatars" });
    }
  });
}
