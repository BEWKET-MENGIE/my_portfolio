import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertCircle } from "lucide-react";
import { projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Bewket Mengie`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto text-[var(--text,#f3f4f6)]">
      {/* Back Link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition mb-8"
      >
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      {/* Header Info */}
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold,#facc15)]">
          {project.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 text-white">
          {project.title}
        </h1>
      </div>

      {/* Hero Visual Box */}
      <div
        className={`h-64 md:h-80 w-full rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 mb-10 flex flex-col items-center justify-center p-8 text-center shadow-xl relative overflow-hidden`}
      >
        <p className="text-2xl font-bold tracking-wide text-white/90 z-10">{project.title}</p>
        <span className="font-mono text-xs uppercase text-emerald-400 mt-2 z-10">Interactive Architecture Overview</span>
      </div>

      {/* Details Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Main Narrative */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-3 font-mono">Overview</h2>
            <p className="text-neutral-300 leading-relaxed text-base">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 font-mono">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Challenges & Solutions */}
          {project.challenges && (
            <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/50 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--gold,#facc15)] flex items-center gap-2">
                <AlertCircle size={16} /> Technical Challenge & Solution
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                <strong>Challenge:</strong> {project.challenges[0]}
              </p>
              {project.solutions && (
                <p className="text-sm text-neutral-300 leading-relaxed border-t border-white/10 pt-3">
                  <strong>Solution:</strong> {project.solutions[0]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 border-l border-white/10 pl-6">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 space-y-3">
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition"
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            {project.source && project.source !== "#" && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-neutral-700 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest hover:border-emerald-500 transition"
              >
                Source Code <Github size={14} />
              </a>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}