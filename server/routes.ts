import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { updateProfileSchema, insertSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.get("/api/profile/:id", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const profile = await storage.createProfile(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  app.patch("/api/profile/:id", async (req, res) => {
    try {
      // Validate updates
      const validatedUpdates = updateProfileSchema.parse(req.body);
      const profile = await storage.updateProfile(req.params.id, validatedUpdates);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Session routes
  app.post("/api/sessions", async (req, res) => {
    try {
      // Validate session data
      const validatedSession = insertSessionSchema.parse(req.body);
      
      // Calculate coins and XP earned
      const coinsEarned = validatedSession.type === 'work' ? 10 : 0;
      const xpEarned = validatedSession.type === 'work' ? 50 : 0;
      
      const session = await storage.createSession({
        ...validatedSession,
        completedAt: new Date().toISOString(),
        coinsEarned,
        xpEarned,
      });
      
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid session data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/sessions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const sessions = await storage.getSessions(undefined, limit);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Stats route
  app.get("/api/stats/:userId", async (req, res) => {
    try {
      const stats = await storage.getStats(req.params.userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
