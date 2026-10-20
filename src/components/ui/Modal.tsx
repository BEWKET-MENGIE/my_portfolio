// src/components/ui/Modal.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ModalProps {
  /** Called after the closing animation finishes. Unmount the modal here. */
  onClose: () => void;
  /** id of the element inside that names the dialog (for screen readers). */
  labelledBy: string;
  /** Receives `close`, which plays the exit animation and then calls onClose. */
  children: (api: { close: () => void }) => ReactNode;
}

const EXIT_MS = 250;

/* A pop-up built on the browser's own <dialog>. For free it gives us:
   focus kept inside, the page behind made inert, and Esc to close.
   On top of that this adds: enter/exit animation, no page scroll behind,
   click-on-backdrop to close, and focus returned to the button that opened it. */
export default function Modal({ onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setShown(true)); // start enter animation

    return () => {
      cancelAnimationFrame(frame);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  const close = () => {
    if (closeTimer.current) return; // already closing

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    setShown(false); // play the exit animation, then unmount
    closeTimer.current = setTimeout(onClose, EXIT_MS);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      // Esc: run our animated close instead of the instant native one.
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      // A click on the dark backdrop lands on the <dialog> itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className={`m-auto max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden
        rounded-3xl border border-neutral-200 bg-white p-0 text-neutral-900
        shadow-2xl transition-all duration-300 ease-out
        open:flex open:flex-col
        backdrop:bg-black/60 backdrop:backdrop-blur-sm
        backdrop:transition-opacity backdrop:duration-300
        motion-reduce:transition-none motion-reduce:backdrop:transition-none
        dark:border-white/10 dark:bg-[#070b1d] dark:text-white
        ${
          shown
            ? "translate-y-0 scale-100 opacity-100 backdrop:opacity-100"
            : "translate-y-4 scale-95 opacity-0 backdrop:opacity-0"
        }`}
    >
      {children({ close })}
    </dialog>
  );
}