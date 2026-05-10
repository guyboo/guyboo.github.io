import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const peppers = sqliteTable("peppers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  cultivar: text("cultivar").notNull(),
  plant_code: text("plant_code").notNull(),
  species: text("species").notNull(),
  heat_level: integer("heat_level").notNull(),
  // JSON-serialized arrays of strings
  flavor_tags: text("flavor_tags").notNull().default("[]"),
  flavor_subtags: text("flavor_subtags").notNull().default("[]"),
  color_tags: text("color_tags").notNull().default("[]"),
  age: text("age").notNull().default("seedling"),
  status: text("status").notNull().default("Seedling in cup"),
  current_pot: text("current_pot").notNull().default("Cups / unassigned"),
  recommended_pot: text("recommended_pot").notNull().default(""),
  ideal_pot: text("ideal_pot").notNull().default(""),
  pot_material: text("pot_material").notNull().default(""),
  location: text("location").notNull().default("Rooftop"),
  thumbnail: text("thumbnail").notNull().default("🌶️"),
  description: text("description").notNull().default(""),
  special: text("special").notNull().default(""),
  notes: text("notes").notNull().default(""),
  priority: text("priority").notNull().default("normal"),
  use_cases: text("use_cases").notNull().default("[]"),
  fixed: integer("fixed", { mode: "boolean" }).notNull().default(false),
  seeded: integer("seeded", { mode: "boolean" }).notNull().default(false),
});

export const insertPepperSchema = createInsertSchema(peppers, {
  flavor_tags: z.array(z.string()).default([]).transform((v) => JSON.stringify(v)),
  flavor_subtags: z.array(z.string()).default([]).transform((v) => JSON.stringify(v)),
  color_tags: z.array(z.string()).default([]).transform((v) => JSON.stringify(v)),
  use_cases: z.array(z.string()).default([]).transform((v) => JSON.stringify(v)),
  heat_level: z.number().int().min(0).max(5),
  fixed: z.boolean().optional().default(false),
  seeded: z.boolean().optional().default(false),
}).omit({ id: true });

export type InsertPepper = z.infer<typeof insertPepperSchema>;
export type PepperRow = typeof peppers.$inferSelect;

// Hydrated pepper with parsed JSON arrays for client convenience
export type Pepper = Omit<PepperRow, "flavor_tags" | "flavor_subtags" | "color_tags" | "use_cases" | "fixed" | "seeded"> & {
  flavor_tags: string[];
  flavor_subtags: string[];
  color_tags: string[];
  use_cases: string[];
  fixed: boolean;
  seeded: boolean;
};

// Reference taxonomies the UI uses for filters & form choices
export const POT_SIZES = [
  "5 gal",
  "7 gal",
  "10 gal",
  "Cups / unassigned",
] as const;

export const HEAT_LABELS: Record<number, string> = {
  0: "No heat",
  1: "Mild",
  2: "Warm",
  3: "Hot",
  4: "Fiery",
  5: "Inferno",
};

export const FLAVOR_GROUPS = [
  "fruity",
  "earthy",
  "smoky",
  "floral",
  "citrus",
  "sweet",
  "aromatic/perfume",
  "vegetal/savory",
] as const;

export const FLAVOR_SUBTAGS_BY_GROUP: Record<string, string[]> = {
  fruity: ["tropical", "berry", "peachy", "citrus"],
  earthy: ["raisin", "tobacco", "nutty"],
  smoky: ["roasted", "charred"],
  floral: ["rose", "honeysuckle"],
  citrus: ["lemon", "lime", "orange"],
  sweet: ["honey", "candy", "sugar"],
  "aromatic/perfume": ["incense", "exotic"],
  "vegetal/savory": ["bell", "grassy", "umami"],
};

export const COLORS = [
  "green",
  "red",
  "yellow",
  "orange",
  "purple/pink",
  "white/cream",
  "brown",
  "stripey",
] as const;

export const SPECIES = [
  "chinense",
  "baccatum",
  "annuum",
  "pubescens",
  "frutescens/other",
] as const;

export const AGES = ["seedling", "1 year", "2 years", "OW 2yr+", "mature"] as const;

export const STATUSES = [
  "Fixed - established",
  "Transplanted",
  "Ready to transplant",
  "Seedling in cup",
  "Needs pot",
] as const;

export const PRIORITIES = ["high", "normal", "low"] as const;

export const POT_MATERIALS = ["fabric (light)", "plastic bucket (light)", "plastic pot", "cup"] as const;

export const USE_CASES = [
  "fresh eat",
  "salsa",
  "hot sauce",
  "dehydrate/powder",
  "stuffing",
  "ferment",
  "ornamental",
  "seed save",
] as const;
