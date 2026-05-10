import { Badge } from "@/components/ui/badge";
import type { Pepper } from "@/lib/types";
import { Flame, Lock } from "lucide-react";

export function PepperThumb({ pepper, size = "card" }: { pepper: Pick<Pepper, "thumbnail" | "cultivar">; size?: "card" | "dialog" }) {
  const cls = size === "dialog" ? "w-16 h-16 text-4xl" : "w-14 h-14 text-3xl";
  const base = `${cls} rounded-md border-2 border-border flex items-center justify-center flex-shrink-0 overflow-hidden`;
  const key = pepper.thumbnail || "";

  if (key === "yellow-star") return <div className={base} style={{ background: "#fff3b0", color: "#f3c400" }}>★</div>;
  if (key === "brown-cross") return <div className={base} style={{ background: "#f1e0c5", color: "#6b3f22", fontWeight: 900 }}>✚</div>;
  if (key === "red-pepper") return <div className={base} style={{ background: "hsl(var(--muted))" }}>🌶️</div>;
  if (key === "red-fang") {
    return (
      <div className={base} style={{ background: "#ffe8df" }}>
        <span className="block w-6 h-10 bg-[#c92018] rounded-t-full" style={{ clipPath: "polygon(50% 0, 92% 18%, 70% 100%, 50% 80%, 30% 100%, 8% 18%)" }} />
      </div>
    );
  }
  if (key === "orange-no") {
    return (
      <div className={base} style={{ background: "#fff0df" }}>
        <span className="relative block w-9 h-9 rounded-full bg-[#f28c24] border-2 border-[#2f261f]">
          <span className="absolute left-1/2 top-[-4px] h-11 w-1.5 -translate-x-1/2 rotate-45 rounded bg-[#c92018]" />
        </span>
      </div>
    );
  }
  if (key === "purple-squiggle") return <div className={base} style={{ background: "#efe0ff", color: "#6d2d91", fontWeight: 900, letterSpacing: "-0.15em" }}>∿∿∿</div>;
  if (key === "orange-lollipop") {
    return (
      <div className={base} style={{ background: "#fff0df" }}>
        <span className="relative block w-9 h-9 rounded-full bg-[#f28c24] border-2 border-[#2f261f]">
          <span className="absolute left-1/2 top-8 h-5 w-1 -translate-x-1/2 bg-[#2f261f]" />
        </span>
      </div>
    );
  }
  if (key === "yellow-concentric") return <div className={base} style={{ background: "radial-gradient(circle, #ffd31a 0 18%, #fff7a5 19% 37%, #ffd31a 38% 58%, #fff7a5 59% 100%)" }} />;
  if (key === "yellow-teardrop") {
    return (
      <div className={base} style={{ background: "#fff6c7" }}>
        <span className="block w-8 h-10 bg-[#ffd21a] border-2 border-[#2f261f]" style={{ borderRadius: "55% 55% 55% 0", transform: "rotate(-45deg)" }} />
      </div>
    );
  }
  if (key === "chocolate-bar") return <div className={base} style={{ background: "hsl(var(--muted))" }}>🍫</div>;
  if (key === "pink-square") return <div className={base} style={{ background: "#ffe0ed" }}><span className="block w-9 h-9 border-2 border-border bg-[#ef6fa8]" /></div>;
  if (key === "purple-smoke") return <div className={base} style={{ background: "#efe0ff", color: "#7d3eb0" }}>☁</div>;
  if (key === "red-mushroom") {
    return (
      <div className={base} style={{ background: "#ffe8df" }}>
        <span className="relative block w-7 h-10 rounded-full bg-[#c92018]">
          <span className="absolute left-1/2 top-6 h-5 w-3 -translate-x-1/2 rounded-b-full bg-[#f6dcc5] border border-[#2f261f]" />
        </span>
      </div>
    );
  }

  return (
    <div className={base} style={{ background: "hsl(var(--muted))" }}>
      {pepper.thumbnail || "🌶️"}
    </div>
  );
}

export function PepperCard({
  pepper,
  onOpen,
  onChipClick,
}: {
  pepper: Pepper;
  onOpen: () => void;
  onChipClick: (kind: string, value: any) => void;
}) {
  const heat = "🔥".repeat(pepper.heat_level) || "•";
  return (
    <article
      className="pos-tile p-4 flex flex-col gap-2 cursor-pointer"
      onClick={onOpen}
      data-testid={`card-pepper-${pepper.id}`}
    >
      <div className="flex items-start gap-3">
        <div data-testid={`thumb-pepper-${pepper.id}`} aria-hidden>
          <PepperThumb pepper={pepper} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-lg leading-tight tracking-wider truncate" data-testid={`text-cultivar-${pepper.id}`}>
              {pepper.cultivar}
            </h3>
            {pepper.plant_code && (
              <span className="text-xs font-mono text-muted-foreground" data-testid={`text-code-${pepper.id}`}>
                {pepper.plant_code}
              </span>
            )}
            {pepper.fixed && (
              <span className="ink-stamp text-[10px]" title="Fixed — do not reallocate">
                <Lock className="inline h-2.5 w-2.5 mr-0.5" />FIXED
              </span>
            )}
          </div>
          <div className="text-xs italic text-muted-foreground mt-0.5" data-testid={`text-species-${pepper.id}`}>
            {pepper.species} · {pepper.age}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-1">
        <Badge
          variant="secondary"
          className="border-2 cursor-pointer text-xs"
          data-testid={`badge-heat-${pepper.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onChipClick("heat_level", pepper.heat_level);
          }}
        >
          <Flame className="h-3 w-3 mr-1" /> {heat} <span className="ml-1 text-muted-foreground">{pepper.heat_level}/5</span>
        </Badge>
        {pepper.color_tags.map((c) => (
          <Badge
            key={c}
            variant="outline"
            className="border-2 cursor-pointer text-xs"
            data-testid={`badge-color-${pepper.id}-${c}`}
            onClick={(e) => {
              e.stopPropagation();
              onChipClick("color", c);
            }}
          >
            {c}
          </Badge>
        ))}
        {pepper.flavor_tags.slice(0, 3).map((f) => (
          <Badge
            key={f}
            variant="outline"
            className="border-2 cursor-pointer text-xs"
            data-testid={`badge-flavor-${pepper.id}-${f}`}
            onClick={(e) => {
              e.stopPropagation();
              onChipClick("flavor", f);
            }}
          >
            {f}
          </Badge>
        ))}
      </div>

      <div className="text-xs mt-2 pt-2 border-t border-border space-y-2">
        <p className="text-foreground leading-snug" data-testid={`text-card-description-${pepper.id}`}>
          {pepper.description || "No description yet."}
        </p>
        <div className="flex flex-wrap gap-1.5" data-testid={`chips-use-cases-${pepper.id}`}>
          {pepper.use_cases.length ? (
            pepper.use_cases.map((use) => (
              <Badge
                key={use}
                variant="outline"
                className="border-2 cursor-pointer text-[11px]"
                onClick={(e) => {
                  e.stopPropagation();
                  onChipClick("use_case", use);
                }}
              >
                {use}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">No use cases yet.</span>
          )}
        </div>
      </div>
    </article>
  );
}
