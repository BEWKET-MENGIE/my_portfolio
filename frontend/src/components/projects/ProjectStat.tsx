interface ProjectStatProps {
  number: string;
  label: string;
}

export default function ProjectStat({ number, label }: ProjectStatProps) {
  return (
    <div
      className="rounded-xl border border-neutral-200 bg-neutral-50 p-5
        dark:border-white/10 dark:bg-white/2 md:p-6"
    >
      <div className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl dark:text-white">
        {number}
      </div>
      <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}