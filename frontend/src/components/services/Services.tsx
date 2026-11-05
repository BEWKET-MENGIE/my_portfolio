// src/components/services/Services.tsx
"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";
import { services } from "@/data/services";
import type { Service } from "@/types";

export default function Services() {
  const isVisible = true;
  // The service whose details pop-up is open (null = closed).
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-neutral-50 px-5 py-12
        text-neutral-900 transition-colors duration-300
        sm:px-8 md:py-16 lg:px-16
        dark:bg-[#030719] dark:text-white"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20
          h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl
          dark:bg-emerald-500/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`mb-12 flex flex-col items-center gap-8 text-center
            md:mb-14 transition-all duration-700
            motion-reduce:transform-none motion-reduce:transition-none
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
        >
          <div className="max-w-4xl">
            <h2
              id="services-heading"
              className="text-4xl font-extrabold leading-tight
                tracking-tight sm:text-5xl lg:text-6xl"
            >
              What can I help you with?
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
              onOpen={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* Details pop-up (mounted only while a service is selected) */}
      {selectedService && (
        <ServiceModal
          key={selectedService.title}
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}