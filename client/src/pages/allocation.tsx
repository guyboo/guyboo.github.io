import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronLeft, Lock as LockIcon, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Pepper } from "@/lib/types";

const GROUPS = [
  { key: "10 gal", title: "10-gal Category", capacity: null, sub: "fabric pots, plastic buckets, and former 8–10 gal buckets consolidated" },
  { key: "7 gal", title: "7-gal Category", capacity: null, sub: "fabric pots plus the extra 7-gal bucket" },
  { key: "5 gal", title: "5-gal Category", capacity: null, sub: "compact backups and small-pod varieties" },
  { key: "Cups / unassigned", title: "Cups / Unassigned", capacity: null, sub: "new entries without a planned destination yet" },
] as const;

export default function Allocation() {
  const q = useQuery<Pepper[]>({ queryKey: ["/api/peppers"] });
  const data = q.data ?? [];

  const buckets = useMemo(() => {
    const out: Record<string, Pepper[]> = {};
    for (const g of GROUPS) out[g.key] = [];
    for (const p of data) {
      // Group by destination: established/transplanted plants stay where they are;
      // cup plants use their planned recommendation so the allocation page is a true plan.
      let k = p.current_pot;
      if (p.current_pot === "Cups / unassigned" && p.recommended_pot) {
        k = p.recommended_pot;
      }
      if (out[k]) out[k].push(p);
      else (out["Cups / unassigned"] ||= []).push(p);
    }
    return out;
  }, [data]);

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-border bg-card sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="link-back-home">
              <ChevronLeft className="h-4 w-4 mr-1" /> Home
            </Button>
          </Link>
          <h1 className="font-display text-xl sm:text-2xl tracking-wider">POT ALLOCATION</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <p className="text-sm text-muted-foreground max-w-prose">
          Allocation reflects the corrected inventory and the planned destination of every plant.
          All 8–10 gal buckets are consolidated into the 10-gal category for filtering, while pot
          material remains visible inside each plant's ID card.
        </p>

        {GROUPS.map((g) => {
          const list = buckets[g.key] ?? [];
          return (
            <section
              key={g.key}
              className="border-2 border-border rounded-md bg-card"
              data-testid={`group-${g.key}`}
            >
              <header className="px-4 py-3 border-b-2 border-border flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-display tracking-wider text-lg">{g.title}</h2>
                  <p className="text-xs text-muted-foreground">{g.sub}</p>
                </div>
                <div className="text-sm">
                  <span className="font-mono" data-testid={`count-${g.key}`}>
                    {list.length}
                    {g.capacity != null ? ` / ${g.capacity}` : ""}
                  </span>
                </div>
              </header>
              {list.length === 0 ? (
                <div className="px-4 py-3 text-sm text-muted-foreground italic">No plants here.</div>
              ) : (
                <ul className="divide-y-2 divide-border">
                  {list.map((p) => (
                    <li key={p.id} className="px-4 py-2 flex items-center gap-3" data-testid={`alloc-row-${p.id}`}>
                      <span className="text-2xl" aria-hidden>{p.thumbnail || "🌶️"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display tracking-wide text-base leading-tight truncate">
                          {p.cultivar}{" "}
                          <span className="font-mono text-xs text-muted-foreground">{p.plant_code}</span>
                          {p.fixed && (
                            <span className="ink-stamp text-[9px] ml-2"><LockIcon className="inline h-2.5 w-2.5 mr-0.5" />FIXED</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground italic">
                          {p.species} · {p.age} · {p.priority}
                        </div>
                      </div>
                      <div className="text-xs whitespace-nowrap">
                        <Flame className="inline h-3 w-3 text-primary mr-0.5" />
                        {p.heat_level}/5
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
