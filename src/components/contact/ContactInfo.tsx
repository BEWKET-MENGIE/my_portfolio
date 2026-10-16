import React from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Email</p>
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-medium hover:text-blue-500 dark:text-neutral-200">
            {SITE_CONFIG.email}
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
          <MapPin className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Location</p>
          <p className="text-sm font-medium dark:text-neutral-200">{SITE_CONFIG.location}</p>
        </div>
      </div>
    </div>
  );
}