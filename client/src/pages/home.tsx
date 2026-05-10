import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import logoUrl from "@assets/logo.webp";
import {
  POT_SIZES,
  HEAT_LABELS,
  FLAVOR_GROUPS,
  FLAVOR_SUBTAGS_BY_GROUP,
  COLORS,
  SPECIES,
  USE_CASES,
} from "@/lib/types";
import type { Pepper } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Moon,
  Flame,
  Search,
  X,
  ChevronLeft,
  Layers,
  Sprout,
  Beaker,
  Palette,
  MapPin,
  Tag,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { PepperCard } from "@/components/pepper-card";
import { PepperIdDialog } from "@/components/pepper-id-dialog";

type Filters = {
  pot_size: string[];
  heat_level: number[];
  flavor: string[];
  flavor_sub: string[];
  color: string[];
  species: string[];
  use_case: string[];
};

const EMPTY: Filters = {
  pot_size: [],
  heat_level: [],
  flavor: [],
  flavor_sub: [],
  color: [],
  species: [],
  use_case: [],
};

type CategoryKey =
  | "pot_size"
  | "heat_level"
  | "flavor"
  | "color"
  | "species"
  | "use_case"
  | "see_all";

const CATEGORIES: Array<{ key: CategoryKey; label: string; icon: any; sub: string }> = [
  { key: "see_all", label: "Full Garden", icon: MapPin, sub: "every plant" },
  { key: "pot_size", label: "Pot Size", icon: Layers, sub: "5–10 gal" },
  { key: "heat_level", label: "Heat Level", icon: Flame, sub: "0 → 5 flames" },
  { key: "flavor", label: "Flavor", icon: Beaker, sub: "fruity, smoky, citrus…" },
  { key: "color", label: "Color", icon: Palette, sub: "pink, brown, stripey…" },
  { key: "species", label: "Species", icon: Sprout, sub: "chinense, baccatum…" },
  { key: "use_case", label: "Use Case", icon: Tag, sub: "sauce · ferment · dehydrate" },
];

export default function Home() {
  const { theme, toggle } = useTheme();
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [activeCat, setActiveCat] = useState<CategoryKey | null>(null);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const activeCatRef = useRef<CategoryKey | null>(null);
  const openIdRef = useRef<number | null>(null);
  const totalActiveRef = useRef(0);
  const searchRef = useRef("");

  const peppersQ = useQuery<Pepper[]>({ queryKey: ["/api/peppers"] });

  const filtered = useMemo(() => {
    const list = peppersQ.data ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((p) => {
      if (filters.pot_size.length && !filters.pot_size.includes(p.current_pot) && !filters.pot_size.includes(p.recommended_pot)) return false;
      if (filters.heat_level.length && !filters.heat_level.includes(p.heat_level)) return false;
      if (filters.flavor.length && !filters.flavor.some((t) => p.flavor_tags.includes(t))) return false;
      if (filters.flavor_sub.length && !filters.flavor_sub.some((t) => p.flavor_subtags.includes(t))) return false;
      if (filters.color.length && !filters.color.some((c) => p.color_tags.includes(c))) return false;
      if (filters.species.length && !filters.species.includes(p.species)) return false;
      if (filters.use_case.length && !filters.use_case.some((u) => p.use_cases.includes(u))) return false;
      if (q) {
        const hay = [
          p.cultivar,
          p.plant_code,
          p.species,
          p.description,
          p.special,
          p.notes,
          ...(p.flavor_tags || []),
          ...(p.flavor_subtags || []),
          ...(p.color_tags || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [peppersQ.data, filters, search]);

  function toggleArr<K extends keyof Filters>(key: K, value: Filters[K][number]) {
    setFilters((prev) => {
      const arr = prev[key] as any[];
      const exists = arr.includes(value);
      return { ...prev, [key]: exists ? arr.filter((v) => v !== value) : [...arr, value] } as Filters;
    });
  }

  function selectSingle<K extends keyof Filters>(key: K, value: Filters[K][number]) {
    pushAppHistory();
    setFilters((prev) => ({ ...prev, [key]: [value] }) as Filters);
  }

  function clearAll() {
    setFilters(EMPTY);
    setActiveCat(null);
    setSearch("");
  }

  const totalActive = Object.values(filters).reduce((acc, arr: any) => acc + arr.length, 0);
  const activeHasSelection =
    activeCat &&
    activeCat !== "see_all" &&
    ((activeCat === "flavor" && (filters.flavor.length > 0 || filters.flavor_sub.length > 0)) ||
      (activeCat !== "flavor" && activeCat in filters && filters[activeCat as keyof Filters].length > 0));

  useEffect(() => {
    activeCatRef.current = activeCat;
    openIdRef.current = openId;
    totalActiveRef.current = totalActive;
    searchRef.current = search;
  }, [activeCat, openId, totalActive, search]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.replaceState({ ...(window.history.state ?? {}), pepperGarden: true }, "", window.location.href);
    const onPopState = () => {
      if (openIdRef.current) {
        setOpenId(null);
        return;
      }
      if (activeCatRef.current === "see_all" || totalActiveRef.current > 0 || searchRef.current.trim()) {
        setFilters(EMPTY);
        setActiveCat(null);
        setSearch("");
        return;
      }
      if (activeCatRef.current) {
        setActiveCat(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function pushAppHistory() {
    if (typeof window !== "undefined") {
      window.history.pushState({ pepperGarden: true }, "", window.location.href);
    }
  }

  function enterCategory(key: CategoryKey) {
    pushAppHistory();
    setActiveCat(key);
  }

  function openPepper(id: number) {
    pushAppHistory();
    setOpenId(id);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b-2 border-border bg-card sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Guyboo's Burning Rooftop"
            className="h-12 w-24 sm:h-14 sm:w-32 object-contain rounded border-2 border-border bg-background p-1"
            data-testid="img-logo"
          />
          <div className="flex-1 min-w-0">
            <div className="font-handwritten text-2xl sm:text-3xl text-primary leading-none" data-testid="text-brand-script">
              Guyboo's
            </div>
            <div className="font-display text-base sm:text-xl tracking-wider leading-tight" data-testid="text-brand-block">
              BURNING ROOFTOP · LARNACA
            </div>
          </div>
          <Link href="/allocation">
            <Button variant="outline" size="sm" data-testid="link-allocation" className="border-2 hidden sm:inline-flex">
              Allocation
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            data-testid="button-toggle-theme"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5 sm:py-7">
        {/* Search + active chips + clear */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-5">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cultivar, flavor, notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search"
              className="pl-9 border-2"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground" data-testid="text-result-count">
              <strong>{filtered.length}</strong> / {peppersQ.data?.length ?? 0} plants
            </span>
            {(totalActive > 0 || activeCat) && (
              <Button variant="outline" size="sm" onClick={clearAll} data-testid="button-clear-filters" className="border-2">
                <X className="h-3 w-3 mr-1" /> Clear
              </Button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {totalActive > 0 && (
          <div className="flex flex-wrap gap-2 mb-5" data-testid="chips-active-filters">
            {Object.entries(filters).flatMap(([k, arr]: [string, any[]]) =>
              arr.map((v) => (
                <Badge
                  key={`${k}-${v}`}
                  variant="default"
                  className="border-2 border-border cursor-pointer text-sm"
                  data-testid={`chip-active-${k}-${v}`}
                  onClick={() => toggleArr(k as any, v)}
                >
                  {labelFor(k, v)} <X className="ml-1 h-3 w-3" />
                </Badge>
              )),
            )}
          </div>
        )}

        {/* Category tiles */}
        {!activeCat && (
          <section data-testid="section-categories">
            <h2 className="font-display text-2xl mb-3 tracking-wider">FILTER BY</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.map(({ key, label, icon: Icon, sub }) => (
                <button
                  key={key}
                  type="button"
                  className="pos-tile p-4 sm:p-5 text-left flex flex-col justify-between hover-elevate min-h-[132px] sm:min-h-[150px] lg:min-h-[160px]"
                  data-testid={`tile-category-${key}`}
                  onClick={() => enterCategory(key)}
                >
                  <Icon className="h-7 w-7" />
                  <div>
                    <div className="font-display text-xl sm:text-2xl tracking-wider leading-tight">{label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Second-level options */}
        {activeCat && activeCat !== "see_all" && !activeHasSelection && (
          <section data-testid={`section-options-${activeCat}`}>
            <div className="flex items-center gap-2 mb-3">
              <Button variant="outline" size="sm" onClick={() => setActiveCat(null)} data-testid="button-back-categories" className="border-2">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <h2 className="font-display text-xl tracking-wider">
                {CATEGORIES.find((c) => c.key === activeCat)?.label}
              </h2>
            </div>
            <OptionGrid catKey={activeCat} filters={filters} selectOne={selectSingle} />
          </section>
        )}

        {/* Results — show always when see_all is active OR after picking any filter */}
        {(activeCat === "see_all" || totalActive > 0 || search.trim()) && (
          <section className="mt-7" data-testid="section-results">
            <div className="flex items-center gap-2 mb-3">
              {activeCat && (
                <Button variant="outline" size="sm" onClick={clearAll} data-testid="button-back-from-results" className="border-2">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Home
                </Button>
              )}
              <h2 className="font-display text-xl tracking-wider">
                <Flame className="inline h-5 w-5 text-primary mr-1" />
                {activeCat === "see_all"
                  ? "Full Garden"
                  : filtered.length === 0
                    ? "No matches"
                    : `${filtered.length} plant${filtered.length === 1 ? "" : "s"}`}
              </h2>
            </div>
            <ResultFilterBar filters={filters} toggle={toggleArr} />
            {peppersQ.isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="pos-tile h-44 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((p) => (
                  <PepperCard
                    key={p.id}
                    pepper={p}
                    onOpen={() => openPepper(p.id)}
                    onChipClick={(kind, value) => toggleArr(kind as any, value as any)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Empty state when nothing chosen */}
        {!activeCat && totalActive === 0 && !search.trim() && (
          <section className="mt-8 text-center text-sm text-muted-foreground border-2 border-dashed border-border p-6 rounded-md" data-testid="empty-hint">
            <span className="font-handwritten text-xl text-foreground">tap a tile</span> to start filtering. Use{" "}
            <strong>Full Garden</strong> to browse every plant on the rooftop.
          </section>
        )}
      </main>

      <PepperIdDialog
        peppers={peppersQ.data ?? []}
        openId={openId}
        onClose={() => setOpenId(null)}
        onChipClick={(kind, value) => {
          toggleArr(kind as any, value as any);
          setOpenId(null);
          setActiveCat(null);
        }}
      />
    </div>
  );
}

function labelFor(key: string, value: any): string {
  if (key === "heat_level") return `${"🔥".repeat(Number(value))} ${HEAT_LABELS[Number(value)] ?? ""}`;
  return String(value);
}

function ResultFilterBar({
  filters,
  toggle,
}: {
  filters: Filters;
  toggle: <K extends keyof Filters>(key: K, value: Filters[K][number]) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount =
    filters.pot_size.length +
    filters.heat_level.length +
    filters.species.length +
    filters.color.length +
    filters.flavor.length;

  return (
    <aside
      className="mb-4 border-2 border-border rounded-md bg-card shadow-sm overflow-hidden"
      data-testid="bar-result-filters"
      aria-label="Refine results"
    >
      <div className="flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-2 min-w-0">
          <SlidersHorizontal className="h-4 w-4 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-display text-base tracking-wider leading-tight">REFINE RESULTS</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {activeCount ? `${activeCount} extra filter${activeCount === 1 ? "" : "s"} active` : "tap to narrow this list"}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen((value) => !value)}
          data-testid="button-toggle-refine"
          aria-expanded={open}
          className="border-2 shrink-0"
        >
          {open ? "Hide filters" : "Show filters"}
          {activeCount > 0 && <span className="ml-1">({activeCount})</span>}
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </Button>
      </div>
      {open && (
        <div className="border-t-2 border-border p-3 pt-2 flex gap-3 overflow-x-auto pb-3" data-testid="panel-refine-filters">
          <CheckGroup
            title="Pot"
            values={POT_SIZES.filter((v) => v !== "Cups / unassigned")}
            selected={filters.pot_size}
            onToggle={(v) => toggle("pot_size", v)}
            testIdBase="filter-pot"
          />
          <CheckGroup
            title="Heat"
            values={[0, 1, 2, 3, 4, 5]}
            selected={filters.heat_level}
            onToggle={(v) => toggle("heat_level", v)}
            label={(v) => `${"🔥".repeat(v) || "•"} ${v}`}
            testIdBase="filter-heat"
          />
          <CheckGroup
            title="Species"
            values={SPECIES}
            selected={filters.species}
            onToggle={(v) => toggle("species", v)}
            testIdBase="filter-species"
          />
          <CheckGroup
            title="Color"
            values={COLORS}
            selected={filters.color}
            onToggle={(v) => toggle("color", v)}
            testIdBase="filter-color"
          />
          <CheckGroup
            title="Flavor"
            values={FLAVOR_GROUPS}
            selected={filters.flavor}
            onToggle={(v) => toggle("flavor", v)}
            testIdBase="filter-flavor"
          />
        </div>
      )}
    </aside>
  );
}

function CheckGroup<T extends string | number>({
  title,
  values,
  selected,
  onToggle,
  label,
  testIdBase,
}: {
  title: string;
  values: readonly T[];
  selected: T[];
  onToggle: (value: T) => void;
  label?: (value: T) => string;
  testIdBase: string;
}) {
  return (
    <fieldset className="min-w-[190px] border-2 border-border rounded-md p-2 bg-background/60">
      <legend className="px-1 font-display text-xs tracking-wider text-muted-foreground">{title}</legend>
      <div className="flex flex-col gap-1.5">
        {values.map((value) => {
          const id = `${testIdBase}-${String(value)}`;
          return (
            <label
              key={String(value)}
              className="flex items-center gap-2 text-xs leading-tight min-h-[28px] cursor-pointer"
              data-testid={`label-${id}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => onToggle(value)}
                className="h-4 w-4 accent-primary"
                data-testid={id}
              />
              <span className="capitalize">{label ? label(value) : String(value)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function OptionGrid({
  catKey,
  filters,
  selectOne,
}: {
  catKey: CategoryKey;
  filters: Filters;
  selectOne: <K extends keyof Filters>(key: K, value: Filters[K][number]) => void;
}) {
  if (catKey === "pot_size") {
    return (
      <Grid>
        {POT_SIZES.map((v) => (
          <OptionTile
            key={v}
            label={v}
            active={filters.pot_size.includes(v)}
            onClick={() => selectOne("pot_size", v)}
            testId={`option-pot_size-${v}`}
          />
        ))}
      </Grid>
    );
  }
  if (catKey === "heat_level") {
    return (
      <Grid>
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <OptionTile
            key={n}
            label={`${"🔥".repeat(n) || "•"}  ${HEAT_LABELS[n]}`}
            active={filters.heat_level.includes(n)}
            onClick={() => selectOne("heat_level", n)}
            testId={`option-heat_level-${n}`}
          />
        ))}
      </Grid>
    );
  }
  if (catKey === "flavor") {
    return (
      <div>
        <Grid>
          {FLAVOR_GROUPS.map((v) => (
            <OptionTile
              key={v}
              label={v}
              active={filters.flavor.includes(v)}
              onClick={() => selectOne("flavor", v)}
              testId={`option-flavor-${v}`}
            />
          ))}
        </Grid>
        <h3 className="font-display tracking-wider mt-5 mb-2 text-sm text-muted-foreground">Sub-flavors</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(FLAVOR_SUBTAGS_BY_GROUP).flatMap(([_, subs]) => subs).map((s) => (
            <Badge
              key={s}
              variant={filters.flavor_sub.includes(s) ? "default" : "outline"}
              className="cursor-pointer border-2 text-sm py-1 px-3"
              data-testid={`option-flavor_sub-${s}`}
              onClick={() => selectOne("flavor_sub", s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    );
  }
  if (catKey === "color") {
    return (
      <Grid>
        {COLORS.map((v) => (
          <OptionTile
            key={v}
            label={v}
            active={filters.color.includes(v)}
            onClick={() => selectOne("color", v)}
            testId={`option-color-${v}`}
            swatch={colorSwatch(v)}
          />
        ))}
      </Grid>
    );
  }
  if (catKey === "species") {
    return (
      <Grid>
        {SPECIES.map((v) => (
          <OptionTile
            key={v}
            label={v}
            active={filters.species.includes(v)}
            onClick={() => selectOne("species", v)}
            testId={`option-species-${v}`}
          />
        ))}
      </Grid>
    );
  }
  if (catKey === "use_case") {
    return (
      <Grid>
        {USE_CASES.map((v) => (
          <OptionTile
            key={v}
            label={v}
            active={filters.use_case.includes(v)}
            onClick={() => selectOne("use_case", v)}
            testId={`option-use_case-${v}`}
          />
        ))}
      </Grid>
    );
  }
  return null;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{children}</div>;
}

function OptionTile({
  label,
  active,
  onClick,
  testId,
  swatch,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  testId: string;
  swatch?: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={`pos-tile p-4 min-h-[80px] text-left flex items-center gap-3 ${active ? "is-active" : ""}`}
    >
      {swatch && (
        <span
          aria-hidden
          className="inline-block w-6 h-6 rounded-full border-2 border-border flex-shrink-0"
          style={{ background: swatch }}
        />
      )}
      <span className="font-display text-base sm:text-lg leading-tight tracking-wide capitalize">{label}</span>
    </button>
  );
}

function colorSwatch(c: string): string {
  switch (c) {
    case "green": return "#5d8a3a";
    case "red": return "#c42b1c";
    case "yellow": return "#f1c027";
    case "orange": return "#e57316";
    case "purple/pink": return "linear-gradient(45deg, #5b2873, #e26aa5)";
    case "white/cream": return "#f4ead0";
    case "brown": return "#6b3f22";
    case "stripey": return "repeating-linear-gradient(45deg, #f4ead0 0 5px, #7a3e21 5px 10px, #f1c027 10px 15px)";
    default: return "#888";
  }
}
