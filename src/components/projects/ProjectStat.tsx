import React from "react";

export default function ProjectStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="border-r border-[var(--border,rgba(255,255,255,0.1))] p-5 last:border-r-0 md:p-6">
      <div className="font-['Syne'] text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
        {number}
      </div>
      <div className="mt-1 font-['DM_Mono'] text-[0.5rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}