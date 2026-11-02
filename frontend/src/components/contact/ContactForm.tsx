"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "sending"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission({ status: "sending", message: "Sending your message..." });

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      hp_confirm: String(formData.get("hp_confirm") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { message?: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent.");
      }

      form.reset();
      setSubmission({
        status: "success",
        message: result.message || "Message sent successfully!",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again.",
      });
    }
  }

  return (
    <form className="flex h-full flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Send a message
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Tell me a little about what you need.
        </p>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        Name
        <Input
          autoComplete="name"
          className="border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.02] dark:text-white"
          maxLength={100}
          name="name"
          placeholder="Your name"
          required
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        Email
        <Input
          autoComplete="email"
          className="border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.02] dark:text-white"
          maxLength={254}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </label>

      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        Message
        <Textarea
          className="min-h-36 flex-1 border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-white/[0.02] dark:text-white"
          maxLength={5000}
          name="message"
          placeholder="How can I help?"
          required
          rows={5}
        />
      </label>

      <label
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
      >
        Leave this field empty
        <input
          autoComplete="off"
          name="hp_confirm"
          tabIndex={-1}
          type="text"
        />
      </label>

      <button
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60"
        disabled={submission.status === "sending"}
        type="submit"
      >
        {submission.status === "sending" ? "Sending..." : "Send message"}
      </button>

      {submission.message && (
        <p
          aria-live="polite"
          className={
            submission.status === "error"
              ? "text-sm text-red-600 dark:text-red-400"
              : submission.status === "success"
                ? "text-sm text-emerald-700 dark:text-emerald-400"
                : "text-sm text-neutral-600 dark:text-neutral-400"
          }
          role={submission.status === "error" ? "alert" : "status"}
        >
          {submission.message}
        </p>
      )}
    </form>
  );
}
