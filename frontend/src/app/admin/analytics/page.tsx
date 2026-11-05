"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Eye,
  Globe2,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { clearAdminToken, useAdminToken } from "@/lib/adminSession";

type Overview = {
  totalViews: number;
  totalVisitors: number;
  periodViews: number;
  periodVisitors: number;
  growth: number;
  periodDays: number;
};
type ActivityPoint = { date: string; views: number; visitors: number };
type CountRow = { name: string; visitors?: number; views?: number };
type PageRow = { page: string; views: number };
type RecentVisit = {
  page: string;
  source: string;
  createdAt: string;
  visitor: { country: string | null; deviceType: string | null; browser: string | null };
};
type AnalyticsData = {
  overview: Overview;
  visitors: ActivityPoint[];
  pages: PageRow[];
  devices: CountRow[];
  browsers: CountRow[];
  countries: CountRow[];
  sources: CountRow[];
  recent: RecentVisit[];
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const periods = [7, 30, 90, 365];
const numberFormat = new Intl.NumberFormat();

export default function AnalyticsPage() {
  const token = useAdminToken();
  const [days, setDays] = useState(30);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [request, setRequest] = useState<{
    key: string;
    data: AnalyticsData | null;
    error: string;
  } | null>(null);
  const requestKey = token ? `${token}:${days}:${refreshVersion}` : "";
  const currentRequest = request?.key === requestKey ? request : null;
  const data = currentRequest?.data ?? null;
  const error = currentRequest?.error ?? "";
  const loading = Boolean(token && !currentRequest);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const key = `${token}:${days}:${refreshVersion}`;

    async function load() {
      try {
        const get = async (endpoint: string) => {
          const response = await fetch(`${apiUrl}/analytics/admin/${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
            signal: controller.signal,
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "Could not load analytics.");
          return result;
        };

        const [overview, visitors, pages, devices, browsers, countries, sources, recent] =
          await Promise.all([
            get(`overview?days=${days}`),
            get(`visitors?days=${days}`),
            get("pages"),
            get("devices"),
            get("browsers"),
            get("countries"),
            get("sources"),
            get("recent"),
          ]);
        setRequest({
          key,
          data: { overview, visitors, pages, devices, browsers, countries, sources, recent },
          error: "",
        });
      } catch (cause) {
        if (controller.signal.aborted) return;
        const message = cause instanceof Error ? cause.message : "Could not load analytics.";
        setRequest({ key, data: null, error: message });
        if (message.includes("Unauthorized") || message.includes("session")) {
          clearAdminToken();
        }
      }
    }

    void load();
    return () => controller.abort();
  }, [days, refreshVersion, token]);

  function signOut() {
    clearAdminToken();
    setRequest(null);
  }

  if (token === undefined) {
    return <main className="min-h-screen bg-neutral-100 px-5 pt-32 dark:bg-[#030719]" />;
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-5 py-28 text-neutral-900 dark:bg-[#030719] dark:text-white">
        <section className="w-full max-w-md border border-neutral-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-sm font-bold uppercase text-emerald-600 dark:text-emerald-400">Portfolio administration</p>
          <h1 className="mt-3 text-2xl font-bold">Sign in to view analytics</h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Use your existing admin session to continue.</p>
          <Link className="mt-6 inline-flex items-center gap-2 bg-emerald-400 px-4 py-3 font-semibold text-black" href="/admin">
            Open admin sign in <ArrowUpRight size={17} />
          </Link>
        </section>
      </main>
    );
  }

  const overview = data?.overview;
  const metrics = overview
    ? [
        { label: "Page views", value: overview.totalViews, icon: Eye },
        { label: "Unique visitors", value: overview.totalVisitors, icon: Users },
        { label: `Views · ${days} days`, value: overview.periodViews, icon: Activity },
        { label: `Visitor growth · ${days} days`, value: `${overview.growth}%`, icon: ArrowUpRight },
      ]
    : [];

  return (
    <main className="min-h-screen bg-neutral-100 px-4 pb-16 pt-28 text-neutral-900 dark:bg-[#030719] dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-neutral-200 pb-6 dark:border-white/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Portfolio administration</p>
            <h1 className="mt-2 text-3xl font-bold">Analytics</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Visitor activity and page performance</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="border border-neutral-300 px-3 py-2 text-sm dark:border-white/20">Contact inbox</Link>
            <label className="sr-only" htmlFor="period">Report period</label>
            <select id="period" value={days} onChange={(event) => setDays(Number(event.target.value))} className="border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-[#0b1728]">
              {periods.map((period) => <option key={period} value={period}>Last {period} days</option>)}
            </select>
            <button type="button" title="Refresh analytics" onClick={() => setRefreshVersion((version) => version + 1)} className="border border-neutral-300 p-2 dark:border-white/20"><RefreshCw size={17} className={loading ? "animate-spin" : ""} /></button>
            <button type="button" title="Sign out" onClick={signOut} className="border border-neutral-300 p-2 dark:border-white/20"><LogOut size={17} /></button>
          </div>
        </header>

        {error && <p role="alert" className="mt-5 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-200">{error}</p>}

        <section aria-label="Analytics overview" className="mt-6 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/10 dark:bg-white/10">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.label} className="bg-white p-5 dark:bg-[#07111f]">
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <span>{metric.label}</span><Icon size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="mt-4 text-3xl font-semibold tabular-nums">{typeof metric.value === "number" ? numberFormat.format(metric.value) : metric.value}</p>
                {metric.label.startsWith("Views ·") && overview && <p className="mt-1 text-xs text-neutral-500">{numberFormat.format(overview.periodVisitors)} distinct visitors in period</p>}
              </article>
            );
          })}
        </section>

        <section className="mt-6 border border-neutral-200 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-[#07111f]">
          <div className="flex items-start justify-between gap-4">
            <div><h2 className="text-lg font-semibold">Traffic over time</h2><p className="text-sm text-neutral-500 dark:text-neutral-400">Daily views and distinct visitors · UTC</p></div>
            {loading && <span className="text-xs text-neutral-500">Updating</span>}
          </div>
          <div className="mt-5 h-72 w-full">
            {data && <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.visitors} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.28} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                <XAxis dataKey="date" tickFormatter={(value: string) => new Date(`${value}T00:00:00Z`).toLocaleDateString(undefined, { month: "short", day: "numeric", timeZone: "UTC" })} tick={{ fill: "#87939a", fontSize: 12 }} minTickGap={24} />
                <YAxis allowDecimals={false} tick={{ fill: "#87939a", fontSize: 12 }} />
                <Tooltip labelFormatter={(value) => String(value)} contentStyle={{ background: "#07111f", border: "1px solid rgba(255,255,255,.15)", borderRadius: 2, color: "white" }} />
                <Area type="monotone" dataKey="views" name="Views" stroke="#10b981" strokeWidth={2} fill="url(#viewsFill)" />
                <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#38bdf8" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>}
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <DataList title="Top pages" icon={Eye} rows={data?.pages.map((row) => ({ name: row.page, value: row.views })) ?? []} suffix="views" />
          <DataList title="Traffic sources" icon={Globe2} rows={data?.sources.map((row) => ({ name: row.name, value: row.views ?? 0 })) ?? []} suffix="views" />
          <DataList title="Devices" icon={MonitorSmartphone} rows={data?.devices.map((row) => ({ name: row.name, value: row.visitors ?? 0 })) ?? []} suffix="visitors" />
          <DataList title="Countries" icon={Globe2} rows={data?.countries.map((row) => ({ name: row.name, value: row.visitors ?? 0 })) ?? []} suffix="visitors" />
        </div>

        <section className="mt-6 border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#07111f]">
          <div className="border-b border-neutral-200 px-5 py-4 dark:border-white/10">
            <h2 className="font-semibold">Recent visits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase text-neutral-500 dark:text-neutral-400"><tr><th className="px-5 py-3 font-medium">Page</th><th className="px-5 py-3 font-medium">Source</th><th className="px-5 py-3 font-medium">Device</th><th className="px-5 py-3 font-medium">Browser</th><th className="px-5 py-3 font-medium">Time</th></tr></thead>
              <tbody>
                {data?.recent.map((visit, index) => <tr key={`${visit.createdAt}-${visit.page}-${index}`} className="border-t border-neutral-100 dark:border-white/5"><td className="px-5 py-3 font-medium">{visit.page}</td><td className="px-5 py-3 text-neutral-500">{visit.source}</td><td className="px-5 py-3 text-neutral-500">{visit.visitor.deviceType ?? "Unknown"}</td><td className="px-5 py-3 text-neutral-500">{visit.visitor.browser ?? "Unknown"}</td><td className="px-5 py-3 text-neutral-500">{new Date(visit.createdAt).toLocaleString()}</td></tr>)}
+                {!data?.recent.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-neutral-500">No tracked visits yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function DataList({ title, icon: Icon, rows, suffix }: {
  title: string;
  icon: typeof Eye;
  rows: { name: string; value: number }[];
  suffix: string;
}) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <section className="border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-[#07111f]">
      <div className="flex items-center gap-2"><Icon size={17} className="text-emerald-600 dark:text-emerald-400" /><h2 className="font-semibold">{title}</h2></div>
      <div className="mt-4 space-y-4">
        {rows.map((row) => <div key={row.name}>
          <div className="flex justify-between gap-4 text-sm"><span className="truncate">{row.name}</span><span className="shrink-0 tabular-nums text-neutral-500">{numberFormat.format(row.value)} {suffix}</span></div>
          <div className="mt-2 h-1 bg-neutral-100 dark:bg-white/10"><div className="h-1 bg-emerald-500" style={{ width: `${Math.max(3, (row.value / max) * 100)}%` }} /></div>
        </div>)}
        {!rows.length && <p className="py-4 text-sm text-neutral-500">No data yet.</p>}
      </div>
    </section>
  );
}
