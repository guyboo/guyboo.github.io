import type { Express, Request, Response } from "express";
import type { Server } from "node:http";
import { storage } from "./storage";
import { z } from "zod";

const PASSWORD = "03041989";

const writePepperSchema = z.object({
  cultivar: z.string().min(1),
  plant_code: z.string().default(""),
  species: z.string().min(1),
  heat_level: z.number().int().min(0).max(5),
  flavor_tags: z.array(z.string()).default([]),
  flavor_subtags: z.array(z.string()).default([]),
  color_tags: z.array(z.string()).default([]),
  age: z.string().default("seedling"),
  status: z.string().default("Ready to transplant"),
  current_pot: z.string().default("Cups / unassigned"),
  recommended_pot: z.string().default(""),
  ideal_pot: z.string().default(""),
  pot_material: z.string().default(""),
  location: z.string().default("Rooftop"),
  thumbnail: z.string().default("🌶️"),
  description: z.string().default(""),
  special: z.string().default(""),
  notes: z.string().default(""),
  priority: z.string().default("normal"),
  use_cases: z.array(z.string()).default([]),
});

function requirePassword(req: Request, res: Response): boolean {
  const provided = req.header("x-pepper-pass") || (req.body && req.body.__password);
  if (provided !== PASSWORD) {
    res.status(401).json({ message: "Wrong password" });
    return false;
  }
  return true;
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get("/api/peppers", async (_req, res) => {
    const peppers = await storage.listPeppers();
    res.json(peppers);
  });

  app.get("/api/peppers/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const p = await storage.getPepper(id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  });

  app.post("/api/peppers", async (req, res) => {
    if (!requirePassword(req, res)) return;
    const body = { ...req.body };
    delete body.__password;
    const parsed = writePepperSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });
    }
    const created = await storage.createPepper(parsed.data);
    res.status(201).json(created);
  });

  app.patch("/api/peppers/:id", async (req, res) => {
    if (!requirePassword(req, res)) return;
    const id = parseInt(req.params.id, 10);
    const body = { ...req.body };
    delete body.__password;
    const updated = await storage.updatePepper(id, body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  });

  app.delete("/api/peppers/:id", async (req, res) => {
    if (!requirePassword(req, res)) return;
    const id = parseInt(req.params.id, 10);
    const ok = await storage.deletePepper(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  });

  // Verify password (no side effects). Returns 200 on match, 401 otherwise.
  app.post("/api/auth/check", (req, res) => {
    const ok = req.body?.password === PASSWORD;
    if (!ok) return res.status(401).json({ ok: false });
    res.json({ ok: true });
  });

  // Reset seed (dev/admin convenience). Password protected.
  app.post("/api/peppers/reset-seed", async (req, res) => {
    if (!requirePassword(req, res)) return;
    const n = await storage.resetSeed();
    res.json({ ok: true, count: n });
  });

  return httpServer;
}
