import React from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.email}`;

  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.02] dark:shadow-none">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Contact Details
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Feel free to reach out directly through any of these channels.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Email</p>
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm font-medium transition-colors hover:text-emerald-500 dark:text-neutral-200"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Phone</p>
            <a
              href={`tel:${SITE_CONFIG.phone || "+251900000000"}`}
              className="text-sm font-medium hover:text-emerald-500 dark:text-neutral-200 transition-colors"
            >
              {SITE_CONFIG.phone || "+251 918410399"}
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Location</p>
            <p className="text-sm font-medium dark:text-neutral-200">{SITE_CONFIG.location}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        I usually respond within 24 hours.
      </p>
    </div>
  );
}