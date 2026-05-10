import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Pepper } from "@/lib/types";
import { ChevronLeft, Flame, Lock as LockIcon, Sparkles } from "lucide-react";
import { PepperThumb } from "./pepper-card";

export function PepperIdDialog({
  peppers,
  openId,
  onClose,
  onChipClick,
}: {
  peppers: Pepper[];
  openId: number | null;
  onClose: () => void;
  onChipClick: (kind: string, value: any) => void;
}) {
  const p = peppers.find((x) => x.id === openId) ?? null;

  return (
    <Dialog open={!!openId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg border-2 border-border" data-testid="dialog-pepper-id">
        {p && (
          <div className="space-y-4">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              data-testid="button-back-id"
              className="w-full justify-start border-2 font-display tracking-wider text-base"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to pepper list
            </Button>
            <div className="flex items-start gap-3">
              <PepperThumb pepper={p} size="dialog" />
              <div className="flex-1">
                <DialogTitle className="font-display text-2xl tracking-wider leading-tight" data-testid="text-id-cultivar">
                  {p.cultivar} <span className="text-muted-foreground text-base font-mono">{p.plant_code}</span>
                </DialogTitle>
                <DialogDescription className="italic mt-0.5" data-testid="text-id-species">
                  Capsicum {p.species} · {p.age}
                  {p.fixed && (
                    <span className="ink-stamp text-[10px] ml-2" title="Fixed">
                      <LockIcon className="inline h-2.5 w-2.5 mr-0.5" />FIXED
                    </span>
                  )}
                </DialogDescription>
              </div>
            </div>

            <p className="text-sm" data-testid="text-id-description">{p.description || "No description yet."}</p>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="border-2 cursor-pointer"
                data-testid="badge-id-heat"
                onClick={() => onChipClick("heat_level", p.heat_level)}
              >
                <Flame className="h-3 w-3 mr-1" />
                {"🔥".repeat(p.heat_level) || "•"} {p.heat_level}/5
              </Badge>
              {p.color_tags.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="border-2 cursor-pointer"
                  data-testid={`badge-id-color-${c}`}
                  onClick={() => onChipClick("color", c)}
                >
                  {c}
                </Badge>
              ))}
              {p.flavor_tags.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-2 cursor-pointer"
                  data-testid={`badge-id-flavor-${t}`}
                  onClick={() => onChipClick("flavor", t)}
                >
                  {t}
                </Badge>
              ))}
              {p.flavor_subtags.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-2 cursor-pointer text-xs"
                  data-testid={`badge-id-flavorsub-${t}`}
                  onClick={() => onChipClick("flavor_sub", t)}
                >
                  {t}
                </Badge>
              ))}
            </div>

            {p.special && (
              <div className="border-2 border-border rounded-md p-3 bg-card">
                <div className="font-display tracking-wider text-xs text-muted-foreground mb-1">
                  <Sparkles className="inline h-3 w-3 mr-1" /> WHAT MAKES IT SPECIAL
                </div>
                <p className="text-sm" data-testid="text-id-special">{p.special}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field label="Current pot" value={p.current_pot} />
              <Field label="Recommended" value={p.recommended_pot || "—"} />
              <Field label="Ideal pot" value={p.ideal_pot || "—"} />
              <Field label="Pot material" value={p.pot_material || "—"} />
              <Field label="Status" value={p.status} />
              <Field label="Priority" value={p.priority} />
              <Field label="Location" value={p.location} />
              <Field label="Use cases" value={p.use_cases.join(", ") || "—"} />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1" />
              <Button variant="outline" size="sm" onClick={onClose} data-testid="button-close-id" className="border-2">
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}
