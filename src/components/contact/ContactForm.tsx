"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

interface FormValues {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot: real people never see or fill this
}

// Change this if your API route lives at a different path.
const CONTACT_ENDPOINT = "/api/contact";

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: FormValues = { name: "", email: "", message: "", website: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < MESSAGE_MIN) {
    errors.message = `Please write at least ${MESSAGE_MIN} characters.`;
  }

  return errors;
}

const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 " +
  "placeholder:text-neutral-400 transition-colors duration-200 " +
  "focus:outline-none focus:ring-2 " +
  "dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500";

const fieldOk =
  "border-neutral-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-white/10";

const fieldError =
  "border-red-500 focus:border-red-500 focus:ring-red-500/30";

const labelClass =
  "mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200";

const errorClass = "mt-1.5 text-xs text-red-600 dark:text-red-400";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so screen-reader users hear it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };

    setValues(next);
    // After the first submit attempt, keep errors in sync while typing.
    if (attempted) setErrors(validate(next));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as FieldName[]).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: values.website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ?? data?.message ?? "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setValues(initialValues);
      setErrors({});
      setAttempted(false);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  /* ---------- Success state ---------- */
  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-8 text-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full
            bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10
            dark:text-emerald-400"
        >
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>

        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-5 text-2xl font-bold tracking-tight text-neutral-900
            focus:outline-none dark:text-white"
        >
          Message sent
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600 dark:text-neutral-400">
          Thank you for reaching out. I&apos;ll review your message and reply
          to your email address shortly.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-neutral-300 px-5 py-2.5
            text-sm font-semibold text-neutral-700 transition-colors
            hover:border-emerald-500 hover:text-emerald-600
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-emerald-400 dark:border-white/10
            dark:text-neutral-300 dark:hover:text-emerald-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ---------- Form ---------- */
  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Send a message
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          All fields are required.
        </p>
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${fieldBase} ${errors.name ? fieldError : fieldOk}`}
          />
          {errors.name && (
            <p id="contact-name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${fieldBase} ${errors.email ? fieldError : fieldOk}`}
          />
          {errors.email && (
            <p id="contact-email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          placeholder="Tell me about your project, timeline or question..."
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldBase} resize-y ${errors.message ? fieldError : fieldOk}`}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          {errors.message ? (
            <p id="contact-message-error" className={`${errorClass} mt-0`}>
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-500">
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </div>
      </div>

      {/* Server / network error */}
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/30
            bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            {errorMessage} You can also email me directly at{" "}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-semibold underline underline-offset-2"
            >
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl
          bg-emerald-500 px-6 py-3.5 text-sm font-bold text-black
          transition-all duration-300 hover:bg-emerald-400
          hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-emerald-400 focus-visible:ring-offset-2
          focus-visible:ring-offset-white active:scale-[0.99]
          disabled:cursor-not-allowed disabled:opacity-60
          dark:focus-visible:ring-offset-[#030719]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Your details are only used to reply to your message.
      </p>
    </form>
  );
}