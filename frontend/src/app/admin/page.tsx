"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Eye,
  LogOut,
  Mail,
  RefreshCw,
  Trash2,
  UserPlus,
} from "lucide-react";
import {
  clearAdminToken,
  saveAdminToken,
  useAdminToken,
} from "@/lib/adminSession";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type Inbox = { messages: ContactMessage[]; unreadCount: number };
type AuthResponse = {
  accessToken?: string;
  email?: string;
  message?: string | string[];
  success?: boolean;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

function getErrorMessage(result: AuthResponse, fallback: string) {
  if (typeof result.message === "string") return result.message;
  return result.message?.join(" ") || fallback;
}

export default function AdminPage() {
  const token = useAdminToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [accountNotice, setAccountNotice] = useState("");
  const [inbox, setInbox] = useState<Inbox | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadInbox = useCallback(async (sessionToken: string) => {
    const response = await fetch(`${apiUrl}/contacts`, {
      headers: { Authorization: `Bearer ${sessionToken}` },
      cache: "no-store",
    });
    const result: Inbox & { message?: string } = await response.json();
    if (!response.ok) throw new Error(result.message || "Could not load messages.");
    return result;
  }, []);

  useEffect(() => {
    if (!token) return;
    const sessionToken = token;
    let active = true;

    async function restoreInbox() {
      try {
        const result = await loadInbox(sessionToken);
        if (active) setInbox(result);
      } catch (cause: unknown) {
        if (!active) return;
        clearAdminToken();
        setError(cause instanceof Error ? cause.message : "Admin session expired.");
      }
    }

    void restoreInbox();
    return () => {
      active = false;
    };
  }, [loadInbox, token]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result: AuthResponse = await response.json();
      if (!response.ok || !result.accessToken) {
        throw new Error(
          getErrorMessage(result, "Login failed. Check your credentials."),
        );
      }
      saveAdminToken(result.accessToken);
      setPassword("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not log in.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setAccountNotice("");

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: createEmail,
          password: createPassword,
        }),
      });
      const result: AuthResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          getErrorMessage(result, "Could not create the admin account."),
        );
      }

      setAccountNotice(`Admin account created for ${result.email}.`);
      setCreateEmail("");
      setCreatePassword("");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not create the admin account.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function updateMessage(id: string, action: "read" | "delete") {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `${apiUrl}/contacts/${encodeURIComponent(id)}${action === "read" ? "/read" : ""}`,
        { method: action === "read" ? "PATCH" : "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );
      if (!response.ok) throw new Error("Could not update this message.");
      setInbox(await loadInbox(token));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update this message.");
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    clearAdminToken();
    setInbox(null);
  }

  async function refreshInbox() {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      setInbox(await loadInbox(token));
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : "Could not load messages.");
    } finally {
      setBusy(false);
    }
  }

  if (token === undefined) {
    return <main className="min-h-screen bg-neutral-100 px-5 pt-32 dark:bg-[#030719]" />;
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-5 py-28 text-neutral-900 dark:bg-[#030719] dark:text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Portfolio administration</p>
          <h1 className="mt-3 text-3xl font-bold">Admin sign in</h1>
          <label className="mt-7 block text-sm font-medium">
            Email
            <input autoComplete="username" className="mt-2 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-white/20" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <input autoComplete="current-password" className="mt-2 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-white/20" type="password" minLength={12} required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 font-bold text-black disabled:opacity-60">{busy ? "Signing in..." : "Sign in"}</button>
          <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-400">
            First admin account? Set <code>ADMIN_EMAIL</code> and{" "}
            <code>ADMIN_PASSWORD</code> in <code>backend/.env</code>, then run{" "}
            <code>npm run prisma:seed --prefix backend</code> from the repository
            root.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-5 pb-16 pt-28 text-neutral-900 dark:bg-[#030719] dark:text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Portfolio administration</p>
            <h1 className="mt-2 text-3xl font-bold">Contact inbox</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void refreshInbox()} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 dark:border-white/20"><RefreshCw size={16} /> Refresh</button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 dark:border-white/20"><LogOut size={16} /> Sign out</button>
          </div>
        </header>

        <section className="mt-8 rounded-xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <UserPlus aria-hidden="true" className="text-emerald-500" />
            <div>
              <h2 className="font-bold">Create admin account</h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Only signed-in admins can create another admin account.
              </p>
            </div>
          </div>
          <form
            className="mt-5 grid gap-4 sm:grid-cols-2"
            onSubmit={handleCreateAdmin}
          >
            <label className="block text-sm font-medium">
              Email
              <input
                autoComplete="email"
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-white/20"
                maxLength={254}
                onChange={(event) => setCreateEmail(event.target.value)}
                required
                type="email"
                value={createEmail}
              />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input
                autoComplete="new-password"
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-white/20"
                maxLength={128}
                minLength={12}
                onChange={(event) => setCreatePassword(event.target.value)}
                required
                type="password"
                value={createPassword}
              />
            </label>
            <button
              className="rounded-lg bg-emerald-500 px-4 py-3 font-bold text-black disabled:opacity-60 sm:col-span-2"
              disabled={busy}
              type="submit"
            >
              {busy ? "Creating account..." : "Create account"}
            </button>
          </form>
          {accountNotice && (
            <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-300" role="status">
              {accountNotice}
            </p>
          )}
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3"><Mail className="text-emerald-500" /><span className="text-sm text-neutral-500 dark:text-neutral-400">Messages</span></div>
            <p className="mt-3 text-3xl font-bold">{inbox?.messages.length ?? 0}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3"><Eye className="text-emerald-500" /><span className="text-sm text-neutral-500 dark:text-neutral-400">Unread messages</span></div>
            <p className="mt-3 text-3xl font-bold">{inbox?.unreadCount ?? 0}</p>
          </div>
        </section>

        {error && <p role="alert" className="mt-5 text-sm text-red-600">{error}</p>}
        <section aria-label="Contact messages" className="mt-8 space-y-4">
          {!inbox?.messages.length && <p className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-500 dark:border-white/10 dark:bg-white/[0.04]">No contact messages yet.</p>}
          {inbox?.messages.map((message) => (
            <article key={message.id} className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold">{message.name} {!message.isRead && <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">New</span>}</h2>
                  <a className="mt-1 inline-block text-sm text-emerald-700 hover:underline dark:text-emerald-400" href={`mailto:${message.email}`}>{message.email}</a>
                  <time className="mt-1 block text-xs text-neutral-500" dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time>
                </div>
                <div className="flex gap-2">
                  {!message.isRead && <button disabled={busy} onClick={() => void updateMessage(message.id, "read")} className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-white/20">Mark read</button>}
                  <button disabled={busy} aria-label={`Delete message from ${message.name}`} onClick={() => void updateMessage(message.id, "delete")} className="rounded-lg border border-red-300 p-2 text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-neutral-700 dark:text-neutral-300">{message.message}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
