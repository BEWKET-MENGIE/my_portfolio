import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-neutral-50 px-5 py-10 text-neutral-900
        transition-colors duration-300 sm:px-8 md:py-12 lg:px-16
        dark:bg-[#030719] dark:text-white"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-80 w-80
          rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header: centered */}
        <div
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight
              sm:text-4xl lg:text-5xl"
          >
            Contact Me
          </h2>
        </div>

        {/* Info + form (50/50 Equal Width & Equal Height Grid) */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <div>
            <ContactInfo />
          </div>

          <div>
            <div
              className="rounded-2xl border border-neutral-200 bg-white p-5
                shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.02]
                dark:shadow-none"
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}