// "use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import type { ReactNode } from "react";

// export default function ThemeProvider({ children }: { children: ReactNode }) {
//   return (
//     <NextThemesProvider
//       attribute="class"
//       defaultTheme="dark"
//       enableSystem={false}
//       storageKey="theme"
//     >
//       {children}
//     </NextThemesProvider>
//   );
// }

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  resolvedTheme: DEFAULT_THEME,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

// The <html> class is the single source of truth. The inline script in
// layout.tsx sets it before first paint; this store just mirrors it into React.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Keep multiple open tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) applyTheme(readStoredTheme());
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

const getServerSnapshot = (): Theme => DEFAULT_THEME;

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The server always renders <html class="dark">. Before the browser paints,
  // switch to the saved theme if it differs (no inline <script> required).
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (getSnapshot() !== stored) applyTheme(stored);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) - theme still applies this session */
    }
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme: theme, setTheme }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}