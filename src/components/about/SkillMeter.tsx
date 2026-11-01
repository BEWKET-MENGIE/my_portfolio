// src/components/about/SkillMeter.tsx
"use client";

interface SkillMeterProps {
  name: string;
  /** Percentage from 0 to 100. */
  level: number;
  /** Delay in milliseconds before the bar starts filling (for staggering). */
  delay?: number;
}

/* One skill row: name, percentage, and progress bar. */
export default function SkillMeter({ name, level, delay = 0 }: SkillMeterProps) {
  const safeLevel = Math.max(0, Math.min(100, Math.round(level)));

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-(--text)">
          {name}
        </span>
        {/* aria-hidden: screen readers get the final value from the progressbar below */}
        <span
          aria-hidden="true"
          className="font-mono text-sm font-semibold tabular-nums text-orange-500"
        >
          {safeLevel}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeLevel}
        aria-valuetext={`${safeLevel} percent`}
        className="h-2.5 w-full overflow-hidden rounded-full bg-(--text)/10"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-500 to-orange-500"
          style={{ width: `${safeLevel}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}