// src/components/contact/ContactForm.tsx
"use client";

import React, { useState } from "react";
import { sendEmail } from "@/actions/sendEmail";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{ success: boolean; message: string } | null>(null);
  const [formDataState, setFormDataState] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResponseMessage(null);
    setIsSent(false);

    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(null, formData);

    setPending(false);
    setResponseMessage(result);

    if (result.success) {
      setIsSent(true);
      // Clear input fields completely after successful send
      setFormDataState({ name: "", email: "", message: "" });
      event.currentTarget.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {responseMessage && (
        <div
          className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
            responseMessage.success
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {responseMessage.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-neutral-300">Name</label>
        <input
          type="text"
          name="name"
          required
          disabled={pending}
          value={formDataState.name}
          onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-neutral-300">Email</label>
        <input
          type="email"
          name="email"
          required
          disabled={pending}
          value={formDataState.email}
          onChange={(e) => setFormDataState({ ...formDataState, email: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-neutral-300">Message</label>
        <textarea
          rows={4}
          name="message"
          required
          disabled={pending}
          value={formDataState.message}
          onChange={(e) => setFormDataState({ ...formDataState, message: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50"
        />
      </div>

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? "Sending message..." : isSent ? "Sent Successfully! ✓" : "Send Message"}
      </Button>
    </form>
  );
}