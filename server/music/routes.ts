import type { Express } from "express";
import { musicService } from "./MusicService";
import { z } from "zod";

const providerSchema = z.enum(['local', 'spotify', 'youtube', 'soundcloud']);

export function registerMusicRoutes(app: Express) {
  app.get("/api/music/providers", async (req, res) => {
    try {
      const providers = await musicService.getAvailableProviders();
      res.json(providers);
    } catch (error) {
      console.error('Error fetching providers:', error);
      res.status(500).json({ error: "Failed to fetch music providers" });
    }
  });

  app.get("/api/music/:provider/playlists", async (req, res) => {
    try {
      const provider = providerSchema.parse(req.params.provider);
      const playlists = await musicService.getUserPlaylists(provider);
      res.json(playlists);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid provider" });
      }
      console.error(`Error fetching playlists for ${req.params.provider}:`, error);
      res.status(500).json({ 
        error: "Failed to fetch playlists",
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/music/:provider/playlist/:playlistId", async (req, res) => {
    try {
      const provider = providerSchema.parse(req.params.provider);
      const { playlistId } = req.params;
      const playlist = await musicService.getPlaylist(provider, playlistId);
      res.json(playlist);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid provider" });
      }
      console.error(`Error fetching playlist ${req.params.playlistId}:`, error);
      res.status(500).json({ 
        error: "Failed to fetch playlist",
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/music/:provider/search", async (req, res) => {
    try {
      const provider = providerSchema.parse(req.params.provider);
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }

      const results = await musicService.searchPlaylists(provider, query);
      res.json(results);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid provider" });
      }
      console.error(`Error searching ${req.params.provider}:`, error);
      res.status(500).json({ 
        error: "Failed to search playlists",
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/music/:provider/auth/status", async (req, res) => {
    try {
      const provider = providerSchema.parse(req.params.provider);
      const status = await musicService.getAuthStatus(provider);
      res.json(status);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid provider" });
      }
      res.status(500).json({ error: "Failed to check auth status" });
    }
  });
}
