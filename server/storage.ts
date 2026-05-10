import { peppers, type PepperRow, type Pepper, type InsertPepper } from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, sql } from "drizzle-orm";
import { SEED_PEPPERS } from "./seed";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

// Initialize table from SQL — keeps things simple without drizzle migrations.
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS peppers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cultivar TEXT NOT NULL,
    plant_code TEXT NOT NULL,
    species TEXT NOT NULL,
    heat_level INTEGER NOT NULL,
    flavor_tags TEXT NOT NULL DEFAULT '[]',
    flavor_subtags TEXT NOT NULL DEFAULT '[]',
    color_tags TEXT NOT NULL DEFAULT '[]',
    age TEXT NOT NULL DEFAULT 'seedling',
    status TEXT NOT NULL DEFAULT 'Seedling in cup',
    current_pot TEXT NOT NULL DEFAULT 'Cups / unassigned',
    recommended_pot TEXT NOT NULL DEFAULT '',
    ideal_pot TEXT NOT NULL DEFAULT '',
    pot_material TEXT NOT NULL DEFAULT '',
    location TEXT NOT NULL DEFAULT 'Rooftop',
    thumbnail TEXT NOT NULL DEFAULT '🌶️',
    description TEXT NOT NULL DEFAULT '',
    special TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    priority TEXT NOT NULL DEFAULT 'normal',
    use_cases TEXT NOT NULL DEFAULT '[]',
    fixed INTEGER NOT NULL DEFAULT 0,
    seeded INTEGER NOT NULL DEFAULT 0
  );
`);

function rowToPepper(row: PepperRow): Pepper {
  return {
    ...row,
    flavor_tags: safeParse(row.flavor_tags),
    flavor_subtags: safeParse(row.flavor_subtags),
    color_tags: safeParse(row.color_tags),
    use_cases: safeParse(row.use_cases),
    fixed: !!row.fixed,
    seeded: !!row.seeded,
  };
}

function safeParse(s: string): string[] {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function jsonify<T>(v: T | undefined, fallback: any = []): string {
  if (typeof v === "string") return v;
  if (v == null) return JSON.stringify(fallback);
  return JSON.stringify(v);
}

export interface IStorage {
  listPeppers(): Promise<Pepper[]>;
  getPepper(id: number): Promise<Pepper | undefined>;
  createPepper(input: any): Promise<Pepper>;
  updatePepper(id: number, input: any): Promise<Pepper | undefined>;
  deletePepper(id: number): Promise<boolean>;
  resetSeed(): Promise<number>;
}

class DatabaseStorage implements IStorage {
  async listPeppers(): Promise<Pepper[]> {
    const rows = db.select().from(peppers).all();
    return rows.map(rowToPepper);
  }

  async getPepper(id: number): Promise<Pepper | undefined> {
    const row = db.select().from(peppers).where(eq(peppers.id, id)).get();
    return row ? rowToPepper(row) : undefined;
  }

  async createPepper(input: any): Promise<Pepper> {
    const values = normalize(input);
    const row = db.insert(peppers).values(values).returning().get();
    return rowToPepper(row);
  }

  async updatePepper(id: number, input: any): Promise<Pepper | undefined> {
    const values = normalize(input, true);
    const row = db.update(peppers).set(values).where(eq(peppers.id, id)).returning().get();
    return row ? rowToPepper(row) : undefined;
  }

  async deletePepper(id: number): Promise<boolean> {
    const r = db.delete(peppers).where(eq(peppers.id, id)).run();
    return r.changes > 0;
  }

  async resetSeed(): Promise<number> {
    db.delete(peppers).run();
    for (const sp of SEED_PEPPERS) {
      db.insert(peppers).values({
        ...sp,
        flavor_tags: JSON.stringify(sp.flavor_tags ?? []),
        flavor_subtags: JSON.stringify(sp.flavor_subtags ?? []),
        color_tags: JSON.stringify(sp.color_tags ?? []),
        use_cases: JSON.stringify(sp.use_cases ?? []),
        fixed: sp.fixed ? true : false,
        seeded: true,
      } as any).run();
    }
    return SEED_PEPPERS.length;
  }
}

function normalize(input: any, partial = false) {
  const out: any = { ...input };
  if (Array.isArray(out.flavor_tags) || (!partial && out.flavor_tags === undefined)) {
    out.flavor_tags = jsonify(out.flavor_tags);
  } else if (typeof out.flavor_tags === "string") {
    // keep as is
  }
  if (Array.isArray(out.flavor_subtags) || (!partial && out.flavor_subtags === undefined)) {
    out.flavor_subtags = jsonify(out.flavor_subtags);
  }
  if (Array.isArray(out.color_tags) || (!partial && out.color_tags === undefined)) {
    out.color_tags = jsonify(out.color_tags);
  }
  if (Array.isArray(out.use_cases) || (!partial && out.use_cases === undefined)) {
    out.use_cases = jsonify(out.use_cases);
  }
  return out;
}

export const storage = new DatabaseStorage();

// Auto-seed if empty
(async () => {
  const count = (db.select({ c: sql<number>`count(*)` }).from(peppers).get() as any)?.c ?? 0;
  if (count === 0) {
    await storage.resetSeed();
    console.log(`[seed] inserted ${SEED_PEPPERS.length} peppers`);
  }
})();
