'use client';

import React, { useMemo, useState } from 'react';

type AgeBucket = '18–24' | '25–34' | '35–44' | '45–54' | '55+';
type GenderKey = 'Male' | 'Female' | 'Other';

type CreatedFile = {
  id: string;
  title: string;
  campaign: string;
  type: 'Ad Copy' | 'Image Set' | 'Audience Segment' | 'Report';
  industry: 'E-commerce' | 'Fintech' | 'EdTech' | 'Gaming' | 'SaaS' | 'Travel';
  status: 'Draft' | 'Live' | 'Paused';
  createdAt: string;      // ISO
  updatedAt: string;      // ISO
  fileCount: number;      // e.g., number of assets inside
  counts: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  audience: {
    age: Record<AgeBucket, number>;        // % distribution (0–100)
    gender: Record<GenderKey, number>;     // % distribution (0–100)
    topRegions: { name: string; pct: number }[];
  };
};

const MOCK: CreatedFile[] = [
  {
    id: 'cf_001',
    title: 'Back-to-School UGC Set',
    campaign: 'Q3 Awareness Blitz',
    type: 'Image Set',
    industry: 'EdTech',
    status: 'Live',
    createdAt: '2025-09-03T10:12:00Z',
    updatedAt: '2025-10-09T08:40:00Z',
    fileCount: 12,
    counts: { impressions: 842_310, clicks: 28_414, conversions: 1_026 },
    audience: {
      age: { '18–24': 22, '25–34': 41, '35–44': 23, '45–54': 9, '55+': 5 },
      gender: { Male: 54, Female: 43, Other: 3 },
      topRegions: [
        { name: 'Maharashtra', pct: 26 },
        { name: 'Karnataka', pct: 18 },
        { name: 'Delhi NCR', pct: 14 },
      ],
    },
  },
  {
    id: 'cf_002',
    title: 'Festive Sale Headlines v2',
    campaign: 'Diwali Mega Sale',
    type: 'Ad Copy',
    industry: 'E-commerce',
    status: 'Live',
    createdAt: '2025-10-01T12:05:00Z',
    updatedAt: '2025-10-10T06:20:00Z',
    fileCount: 8,
    counts: { impressions: 1_204_115, clicks: 64_992, conversions: 5_447 },
    audience: {
      age: { '18–24': 19, '25–34': 38, '35–44': 27, '45–54': 11, '55+': 5 },
      gender: { Male: 48, Female: 49, Other: 3 },
      topRegions: [
        { name: 'Tamil Nadu', pct: 20 },
        { name: 'Maharashtra', pct: 19 },
        { name: 'Telangana', pct: 12 },
      ],
    },
  },
  {
    id: 'cf_003',
    title: 'High-ROAS Lookalike 2%',
    campaign: 'FY25 Performance',
    type: 'Audience Segment',
    industry: 'SaaS',
    status: 'Paused',
    createdAt: '2025-08-22T09:00:00Z',
    updatedAt: '2025-09-30T17:30:00Z',
    fileCount: 1,
    counts: { impressions: 312_900, clicks: 9_114, conversions: 692 },
    audience: {
      age: { '18–24': 12, '25–34': 44, '35–44': 28, '45–54': 11, '55+': 5 },
      gender: { Male: 62, Female: 35, Other: 3 },
      topRegions: [
        { name: 'Karnataka', pct: 25 },
        { name: 'Telangana', pct: 16 },
        { name: 'Maharashtra', pct: 15 },
      ],
    },
  },
  {
    id: 'cf_004',
    title: 'Monthly Performance Report (Sep)',
    campaign: 'Global',
    type: 'Report',
    industry: 'Fintech',
    status: 'Draft',
    createdAt: '2025-10-02T07:30:00Z',
    updatedAt: '2025-10-05T14:00:00Z',
    fileCount: 1,
    counts: { impressions: 0, clicks: 0, conversions: 0 },
    audience: {
      age: { '18–24': 0, '25–34': 0, '35–44': 0, '45–54': 0, '55+': 0 },
      gender: { Male: 0, Female: 0, Other: 0 },
      topRegions: [],
    },
  },
  {
    id: 'cf_005',
    title: 'RPG Launch Creatives',
    campaign: 'Game Launch India',
    type: 'Image Set',
    industry: 'Gaming',
    status: 'Live',
    createdAt: '2025-09-15T11:00:00Z',
    updatedAt: '2025-10-10T10:45:00Z',
    fileCount: 16,
    counts: { impressions: 2_018_331, clicks: 92_110, conversions: 14_408 },
    audience: {
      age: { '18–24': 36, '25–34': 39, '35–44': 16, '45–54': 6, '55+': 3 },
      gender: { Male: 67, Female: 30, Other: 3 },
      topRegions: [
        { name: 'West Bengal', pct: 17 },
        { name: 'Maharashtra', pct: 16 },
        { name: 'Karnataka', pct: 13 },
      ],
    },
  },
];

function formatNum(n: number) {
  return n.toLocaleString();
}

export default function AllCreatedFilesList({
  initialData,
}: {
  initialData?: CreatedFile[];
}) {
  // If your data fetch is empty, this keeps the UI populated.
  const [items] = useState<CreatedFile[]>(initialData && initialData.length ? initialData : MOCK);

  const totals = useMemo(() => {
    const impressions = items.reduce((s, x) => s + x.counts.impressions, 0);
    const clicks = items.reduce((s, x) => s + x.counts.clicks, 0);
    const conversions = items.reduce((s, x) => s + x.counts.conversions, 0);
    const ctr = impressions ? (clicks / impressions) * 100 : 0;
    const convRate = clicks ? (conversions / clicks) * 100 : 0;
    return { impressions, clicks, conversions, ctr, convRate };
  }, [items]);

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((x) =>
      [x.title, x.campaign, x.type, x.industry, x.status]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [items, query]);

  return (
    <div className="space-y-6">
      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <StatCard label="Impressions" value={formatNum(totals.impressions)} />
        <StatCard label="Clicks" value={formatNum(totals.clicks)} />
        <StatCard label="CTR" value={`${totals.ctr.toFixed(2)}%`} />
        <StatCard label="Conversions" value={formatNum(totals.conversions)} />
        <StatCard label="CVR" value={`${totals.convRate.toFixed(2)}%`} />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <input
          className="w-full md:w-96 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
          placeholder="Search title, campaign, type, industry..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="text-xs text-zinc-500">{filtered.length} result(s)</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-zinc-500">
                  {f.campaign} • {f.type} • {f.industry}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full border ${
                  f.status === 'Live'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : f.status === 'Paused'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                }`}
              >
                {f.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              <MiniStat label="Impr." value={formatNum(f.counts.impressions)} />
              <MiniStat label="Clicks" value={formatNum(f.counts.clicks)} />
              <MiniStat
                label="CTR"
                value={
                  f.counts.impressions
                    ? `${((f.counts.clicks / f.counts.impressions) * 100).toFixed(2)}%`
                    : '—'
                }
              />
              <MiniStat label="Conv." value={formatNum(f.counts.conversions)} />
            </div>

            {/* Demographics */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-zinc-600 mb-1">Age %</p>
                <BarList
                  data={Object.entries(f.audience.age).map(([k, v]) => ({
                    label: k,
                    value: v,
                  }))}
                />
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-600 mb-1">Gender %</p>
                <BarList
                  data={Object.entries(f.audience.gender).map(([k, v]) => ({
                    label: k,
                    value: v,
                  }))}
                />
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-600 mb-1">Top Regions</p>
                <BarList
                  data={f.audience.topRegions.map((r) => ({
                    label: r.name,
                    value: r.pct,
                  }))}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
              <span>Files: {f.fileCount}</span>
              <span>Created: {new Date(f.createdAt).toLocaleDateString()}</span>
              <span>Updated: {new Date(f.updatedAt).toLocaleDateString()}</span>
              <span className="ml-auto">ID: {f.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
      <p className="text-[10px] uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function BarList({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div className="space-y-2">
      {data.map((d) => {
        const pct = Math.round((d.value / total) * 100);
        return (
          <div key={d.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600">{d.label}</span>
              <span className="text-zinc-500">{d.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-2 rounded-full bg-zinc-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
