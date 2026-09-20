"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  Download,
  FolderOpen,
  GitFork,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { Build, GameId } from "@/data/types";
import { GAMES, GAME_IDS } from "@/lib/games";
import {
  decodeShare,
  deleteCustomBuild,
  downloadBuild,
  emptyBuild,
  encodeShare,
  forkMetaBuild,
  loadCustomBuilds,
  saveCustomBuild,
  type CustomBuild,
} from "@/lib/custom-builds";
import { BUILDS, buildHref } from "@/lib/builds";
import { cn, formatDate, withBase } from "@/lib/utils";
import { TierBadge } from "@/components/ui-bits";

/* ─── tiny form primitives ─────────────────────────────────── */

const inputCls =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-dim focus:border-(--accent-border) focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-semibold tracking-wider text-ink-dim uppercase">{label}</span>
      {children}
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel p-4 sm:p-5">
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-(--accent-bright) uppercase">{title}</h3>
      {children}
    </div>
  );
}

function IconButton({
  onClick,
  label,
  children,
  danger,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors",
        danger
          ? "border-line text-ink-dim hover:border-d4/50 hover:text-d4-bright"
          : "border-line text-ink-dim hover:border-(--accent-border) hover:text-(--accent-bright)",
      )}
    >
      {children}
    </button>
  );
}

/* ─── the editor ───────────────────────────────────────────── */

/** Comma-separated affixes input with local text state (no cursor fights). */
function AffixesField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (affixes: string[]) => void;
}) {
  const [text, setText] = useState(value.join(", "));
  return (
    <input
      className={inputCls}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(
          e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        );
      }}
      placeholder="Affixes to prioritize, comma-separated"
    />
  );
}

function BuilderClient() {
  const params = useSearchParams();
  const [build, setBuild] = useState<CustomBuild>(() => emptyBuild("d4"));
  const [saved, setSaved] = useState<CustomBuild[]>([]);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  // Initial load: fork param > share param > saved draft.
  // Runs in a callback (not synchronously in the effect) per React guidance.
  useEffect(() => {
    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      const forkId = params.get("fork");
      const share = params.get("share");
      if (forkId) {
        const forked = forkMetaBuild(forkId);
        if (forked) {
          setBuild(forked);
          flash("Forked from meta build — make it yours.");
        }
      } else if (share) {
        const decoded = decodeShare(share);
        if (decoded) {
          setBuild(decoded);
          flash("Shared build loaded.");
        } else {
          flash("That share link was invalid — started a blank build.");
        }
      }
      setSaved(loadCustomBuilds());
      setReady(true);
    };
    const t = window.setTimeout(init, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [params, flash]);

  const update = useCallback(<K extends keyof CustomBuild>(key: K, value: CustomBuild[K]) => {
    setBuild((b) => ({ ...b, [key]: value }));
    setDirty(true);
  }, []);

  const game = GAMES[build.game];

  function switchGame(next: GameId) {
    if (next === build.game) return;
    update("game", next);
    update("patchLabel", next === "d4" ? "Season 15 · Patch 3.2" : "Forever · Launch");
  }

  function save() {
    if (!build.name.trim()) {
      flash("Give your build a name first.");
      return;
    }
    saveCustomBuild(build);
    setSaved(loadCustomBuilds());
    setDirty(false);
    flash("Saved to this device.");
  }

  function exportJson() {
    downloadBuild(build);
    flash("Build exported as JSON.");
  }

  function importJson(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CustomBuild;
        if (!Array.isArray(parsed.progression)) throw new Error("bad shape");
        setBuild({ ...parsed, id: `custom-${Date.now().toString(36)}` });
        setDirty(true);
        flash("Build imported.");
      } catch {
        flash("That file wasn't a BuildForge build.");
      }
    };
    reader.readAsText(file);
  }

  async function copyShareLink() {
    const url = `${window.location.origin}${withBase("/builder")}?share=${encodeShare(build)}`;
    try {
      await navigator.clipboard.writeText(url);
      flash("Share link copied — send it anywhere.");
    } catch {
      flash("Couldn't access the clipboard — export JSON instead.");
    }
  }

  /* Progression band helpers */
  function addBand() {
    const bands = [...build.progression];
    bands.push({ levels: "", goal: "", steps: [{ name: "", detail: "", why: "" }] });
    update("progression", bands);
  }
  function patchBand(i: number, patch: Partial<Build["progression"][number]>) {
    const bands = [...build.progression];
    bands[i] = { ...bands[i], ...patch };
    update("progression", bands);
  }
  function moveBand(i: number, dir: -1 | 1) {
    const bands = [...build.progression];
    const j = i + dir;
    if (j < 0 || j >= bands.length) return;
    [bands[i], bands[j]] = [bands[j], bands[i]];
    update("progression", bands);
  }
  function removeBand(i: number) {
    update(
      "progression",
      build.progression.filter((_, j) => j !== i),
    );
  }
  function addStep(i: number) {
    const band = build.progression[i];
    patchBand(i, { steps: [...band.steps, { name: "", detail: "", why: "" }] });
  }
  function patchStep(i: number, s: number, patch: Partial<Build["progression"][number]["steps"][number]>) {
    const band = build.progression[i];
    const steps = [...band.steps];
    steps[s] = { ...steps[s], ...patch };
    patchBand(i, { steps });
  }
  function removeStep(i: number, s: number) {
    const band = build.progression[i];
    patchBand(i, { steps: band.steps.filter((_, j) => j !== s) });
  }

  const forkable = useMemo(
    () => BUILDS.filter((b) => b.game === build.game),
    [build.game],
  );

  if (!ready) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-sm text-ink-dim">Loading forge…</div>
    );
  }

  return (
    <div data-game={build.game} className="world-bg noise">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-(--accent-bright)">The forge</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Custom Build Forge
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
              Off-meta, meme, or guild secret — build it level-by-level. Everything saves to
              this device; share it with a link or a JSON file.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-2 rounded-lg bg-(--accent) px-4 py-2 text-sm font-semibold text-base shadow-[0_0_24px_-8px_var(--accent)] transition-transform hover:scale-[1.03]"
            >
              <Save className="h-4 w-4" />
              {dirty ? "Save" : "Saved"}
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
            >
              <Copy className="h-4 w-4" /> Share link
            </button>
            <button
              type="button"
              onClick={exportJson}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink"
              aria-label="Export JSON"
            >
              <Download className="h-4 w-4" />
            </button>
            <label
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink"
              aria-label="Import JSON"
            >
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importJson(f);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </div>

        {/* Basics */}
        <div className="mt-8 space-y-4">
          <Card title="Identity">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {GAME_IDS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => switchGame(g)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                    build.game === g
                      ? "border-(--accent-border) bg-(--accent-wash) text-(--accent-bright)"
                      : "border-line text-ink-muted hover:text-ink",
                  )}
                >
                  {GAMES[g].label}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <select
                  value={build.tier}
                  onChange={(e) => update("tier", e.target.value as CustomBuild["tier"])}
                  className={inputCls + " w-auto"}
                  aria-label="Tier"
                >
                  {["S", "A", "B", "C"].map((t) => (
                    <option key={t} value={t}>
                      Tier {t}
                    </option>
                  ))}
                </select>
                <select
                  value={build.difficulty}
                  onChange={(e) => update("difficulty", Number(e.target.value) as CustomBuild["difficulty"])}
                  className={inputCls + " w-auto"}
                  aria-label="Difficulty"
                >
                  {[1, 2, 3, 4, 5].map((d) => (
                    <option key={d} value={d}>
                      Difficulty {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Build name">
                <input
                  className={inputCls}
                  value={build.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Bleed Spin2Win Barb"
                />
              </Field>
              <Field label="Class / spec">
                <input
                  className={inputCls}
                  value={build.className}
                  onChange={(e) => update("className", e.target.value)}
                  placeholder={game.classOrder[0]}
                  list="class-options"
                />
                <datalist id="class-options">
                  {game.classOrder.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field label="Role (one line)">
                <input
                  className={inputCls}
                  value={build.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="e.g. Melee AoE speedfarm"
                />
              </Field>
              <Field label="Patch label">
                <input
                  className={inputCls}
                  value={build.patchLabel}
                  onChange={(e) => update("patchLabel", e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-3 grid gap-3">
              <Field label="Tagline (shown on cards)">
                <input
                  className={inputCls}
                  value={build.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                />
              </Field>
              <Field label="Summary (the core loop)">
                <textarea
                  className={inputCls + " min-h-20"}
                  value={build.summary}
                  onChange={(e) => update("summary", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          {/* Fork shortcut */}
          <div className="panel flex flex-wrap items-center gap-3 p-4">
            <GitFork className="h-4 w-4 text-(--accent-bright)" />
            <p className="text-sm text-ink-muted">Start from a meta build:</p>
            <select
              className={inputCls + " w-auto flex-1 sm:flex-none"}
              defaultValue=""
              onChange={(e) => {
                if (!e.target.value) return;
                const forked = forkMetaBuild(e.target.value);
                if (forked) {
                  setBuild(forked);
                  setDirty(true);
                  flash("Forked — adjust anything and save.");
                }
                e.target.value = "";
              }}
              aria-label="Fork a meta build"
            >
              <option value="">Choose a build to fork…</option>
              {forkable.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.className})
                </option>
              ))}
            </select>
          </div>

          {/* Progression */}
          <Card title="Level path — the zero-guessing part">
            <div className="space-y-4">
              {build.progression.map((band, i) => (
                <div key={i} className="rounded-xl border border-line bg-surface-raised/50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      className={inputCls + " w-28 shrink-0 font-mono"}
                      value={band.levels}
                      onChange={(e) => patchBand(i, { levels: e.target.value })}
                      placeholder="1–5"
                      aria-label="Level range"
                    />
                    <input
                      className={inputCls + " min-w-40 flex-1"}
                      value={band.goal}
                      onChange={(e) => patchBand(i, { goal: e.target.value })}
                      placeholder="What this band achieves"
                      aria-label="Band goal"
                    />
                    <div className="flex gap-1">
                      <IconButton onClick={() => moveBand(i, -1)} label="Move band up">
                        <ArrowUp className="h-4 w-4" />
                      </IconButton>
                      <IconButton onClick={() => moveBand(i, 1)} label="Move band down">
                        <ArrowDown className="h-4 w-4" />
                      </IconButton>
                      <IconButton onClick={() => removeBand(i)} label="Delete band" danger>
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    {band.steps.map((step, s) => (
                      <div key={s} className="grid gap-2 sm:grid-cols-[1fr_130px_1fr_auto]">
                        <input
                          className={inputCls}
                          value={step.name}
                          onChange={(e) => patchStep(i, s, { name: e.target.value })}
                          placeholder="Skill / talent"
                        />
                        <input
                          className={inputCls}
                          value={step.detail ?? ""}
                          onChange={(e) => patchStep(i, s, { detail: e.target.value })}
                          placeholder="Rank / points"
                        />
                        <input
                          className={inputCls}
                          value={step.why}
                          onChange={(e) => patchStep(i, s, { why: e.target.value })}
                          placeholder="Why this pick"
                        />
                        <IconButton onClick={() => removeStep(i, s)} label="Remove step" danger>
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addStep(i)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-(--accent-border) hover:text-(--accent-bright)"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add step
                    </button>
                  </div>

                  <input
                    className={inputCls + " mt-3 border-(--accent-border)/40"}
                    value={band.milestone ?? ""}
                    onChange={(e) => patchBand(i, { milestone: e.target.value })}
                    placeholder="Milestone (optional) — a key unlock worth calling out"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addBand}
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-(--accent-border) bg-(--accent-wash) px-4 py-2 text-sm font-semibold text-(--accent-bright)"
              >
                <Plus className="h-4 w-4" /> Add level band
              </button>
            </div>
          </Card>

          {/* Stats + Gear */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Stat priority">
              <div className="space-y-2.5">
                {build.statPriority.map((s, i) => (
                  <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1.4fr]">
                    <input
                      className={inputCls}
                      value={s.label}
                      onChange={(e) => {
                        const next = [...build.statPriority];
                        next[i] = { ...next[i], label: e.target.value };
                        update("statPriority", next);
                      }}
                      placeholder="Stat"
                    />
                    <input
                      className={inputCls}
                      value={s.note ?? ""}
                      onChange={(e) => {
                        const next = [...build.statPriority];
                        next[i] = { ...next[i], note: e.target.value };
                        update("statPriority", next);
                      }}
                      placeholder="Why"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update("statPriority", [...build.statPriority, { label: "", note: "" }])}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-(--accent-bright)"
                >
                  <Plus className="h-3.5 w-3.5" /> Add stat
                </button>
              </div>
            </Card>

            <Card title="Gear slots">
              <div className="space-y-2.5">
                {build.gear.map((g, i) => (
                  <div key={i} className="grid gap-2 sm:grid-cols-[110px_1fr_auto]">
                    <input
                      className={inputCls}
                      value={g.slot}
                      onChange={(e) => {
                        const next = [...build.gear];
                        next[i] = { ...next[i], slot: e.target.value };
                        update("gear", next);
                      }}
                      placeholder="Slot"
                    />
                    <input
                      className={inputCls}
                      value={g.target}
                      onChange={(e) => {
                        const next = [...build.gear];
                        next[i] = { ...next[i], target: e.target.value };
                        update("gear", next);
                      }}
                      placeholder="What to look for on this slot"
                    />
                    <AffixesField
                      value={g.affixes ?? []}
                      onChange={(affixes) => {
                        const next = [...build.gear];
                        next[i] = { ...next[i], affixes };
                        update("gear", next);
                      }}
                    />
                    <IconButton
                      onClick={() => update("gear", build.gear.filter((_, j) => j !== i))}
                      label="Remove slot"
                      danger
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    update("gear", [...build.gear, { slot: "", target: "", affixes: [] }])
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-(--accent-bright)"
                >
                  <Plus className="h-3.5 w-3.5" /> Add slot
                </button>
              </div>
            </Card>
          </div>

          {/* Rotation + Watch-outs */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Rotation phases">
              <div className="space-y-3">
                {build.rotation.map((phase, i) => (
                  <div key={i} className="rounded-lg border border-line bg-surface-raised/50 p-3">
                    <div className="flex items-center gap-2">
                      <input
                        className={inputCls}
                        value={phase.phase}
                        onChange={(e) => {
                          const next = [...build.rotation];
                          next[i] = { ...next[i], phase: e.target.value };
                          update("rotation", next);
                        }}
                        placeholder="Phase (e.g. Standard pack)"
                      />
                      <IconButton
                        onClick={() => update("rotation", build.rotation.filter((_, j) => j !== i))}
                        label="Remove phase"
                        danger
                      >
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </div>
                    <textarea
                      className={inputCls + " mt-2 min-h-16"}
                      value={phase.steps.join("\n")}
                      onChange={(e) => {
                        const steps = e.target.value.split("\n");
                        const next = [...build.rotation];
                        next[i] = { ...next[i], steps };
                        update("rotation", next);
                      }}
                      placeholder="One step per line, in priority order"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update("rotation", [...build.rotation, { phase: "", steps: [""] }])}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-(--accent-bright)"
                >
                  <Plus className="h-3.5 w-3.5" /> Add phase
                </button>
              </div>
            </Card>

            <Card title="Watch-outs">
              <div className="space-y-2.5">
                {build.watchOuts.map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className={inputCls}
                      value={w}
                      onChange={(e) => {
                        const next = [...build.watchOuts];
                        next[i] = e.target.value;
                        update("watchOuts", next);
                      }}
                      placeholder="A trap to avoid"
                    />
                    <IconButton
                      onClick={() => update("watchOuts", build.watchOuts.filter((_, j) => j !== i))}
                      label="Remove"
                      danger
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update("watchOuts", [...build.watchOuts, ""])}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-(--accent-bright)"
                >
                  <Plus className="h-3.5 w-3.5" /> Add watch-out
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Saved builds */}
        <div className="mt-8">
          <Card title={`Saved on this device (${saved.length})`}>
            {saved.length === 0 ? (
              <p className="text-sm text-ink-dim">
                Nothing saved yet — hit Save and your builds live here, even offline.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {saved.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 py-3">
                    <TierBadge tier={b.tier} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{b.name}</p>
                      <p className="text-xs text-ink-dim">
                        {GAMES[b.game].shortLabel} · {b.className || "—"} · {b.progression.length} bands ·{" "}
                        {formatDate(b.lastSynced)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBuild(structuredClone(b));
                        setDirty(false);
                        flash("Loaded saved build.");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-(--accent-bright)"
                    >
                      <FolderOpen className="h-3.5 w-3.5" /> Load
                    </button>
                    <IconButton
                      onClick={() => {
                        deleteCustomBuild(b.id);
                        setSaved(loadCustomBuilds());
                        flash("Deleted.");
                      }}
                      label="Delete saved build"
                      danger
                    >
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Meta build cross-links */}
        <p className="mt-8 text-xs leading-relaxed text-ink-dim">
          Looking for meta instead? Browse{" "}
          <Link href="/d4" className="text-(--accent-bright) hover:underline">
            Diablo IV builds
          </Link>{" "}
          or{" "}
          <Link href="/forever" className="text-(--accent-bright) hover:underline">
            WoW Forever builds
          </Link>
          , then fork any of them here. Fork links from build pages (like{" "}
          <Link href={buildHref(BUILDS[0])} className="text-(--accent-bright) hover:underline">
            {BUILDS[0].name}
          </Link>
          ) drop you straight into this editor.
        </p>
      </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        {toast ? (
          <div className="flex items-center gap-2 rounded-xl border border-(--accent-border) bg-surface-raised px-4 py-2.5 text-sm text-ink shadow-2xl">
            <Check className="h-4 w-4 text-(--accent-bright)" />
            {toast}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={<div className="grid min-h-[50vh] place-items-center text-sm text-ink-dim">Loading forge…</div>}
    >
      <BuilderClient />
    </Suspense>
  );
}
