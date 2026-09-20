import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Clock3,
  Search,
  Compass,
  Sparkles,
  Moon,
  Music2,
  ShoppingBag,
  Plane,
  HeartPulse,
  Utensils,
  Film,
  ChevronRight,
  CalendarDays,
  Activity,
  Loader2,
} from "lucide-react";



function formatCategory(category) {
  if (!category) return "Other";
  return category
    .toString()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function categoryColor(index) {
  const colors = [
    "bg-indigo-400 shadow-indigo-500/50",
    "bg-purple-400 shadow-purple-500/50",
    "bg-cyan-400 shadow-cyan-500/50",
    "bg-emerald-400 shadow-emerald-500/50",
    "bg-amber-400 shadow-amber-500/50",
  ];
  return colors[index % colors.length];
}

function categoryBar(index) {
  const bars = [
    "bg-gradient-to-r from-indigo-600 to-indigo-400",
    "bg-gradient-to-r from-purple-600 to-purple-400",
    "bg-gradient-to-r from-cyan-600 to-cyan-400",
    "bg-gradient-to-r from-emerald-600 to-emerald-400",
    "bg-gradient-to-r from-amber-600 to-amber-400",
  ];
  return bars[index % bars.length];
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050b18] text-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        <p className="animate-pulse text-xs text-slate-400">Loading discoveries...</p>
      </div>
    </div>
  );
}


export default function Discoveries() {
  const [overviewData, setOverviewData] = useState(null);
  const [momentsData, setMomentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [period, setPeriod] = useState("2");
  const [periodOpen, setPeriodOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/data/overviewData.json").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load overviewData.json");
        }
        return res.json();
      }),
      fetch("/data/momentsData.json").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load momentsData.json");
        }
        return res.json();
      }),
    ])
      .then(([overview, moments]) => {
        setOverviewData(overview);
        setMomentsData(Array.isArray(moments) ? moments : []);
      })
      .catch((error) => {
        console.error("Discoveries data error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const discoveries = useMemo(() => {
    if (!overviewData || !momentsData.length) {
      return null;
    }

    return buildDiscoveries(overviewData, momentsData, period);
  }, [overviewData, momentsData, period]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!discoveries) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050b18] text-white">
        <div className="text-center">
          <p className="text-sm text-slate-300">
            Unable to load discoveries.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Check your JSON files inside /public/data/.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050b18] p-3 text-white sm:p-4">
      <div className="pointer-events-none fixed -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/2 -right-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" />

      
      <div className="relative z-10 min-h-[calc(100vh-24px)] overflow-hidden rounded-2xl border border-[#172945] bg-[#071121]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 sm:ml-[62px]">
        <main className="mx-auto max-w-[1280px] px-7 py-7 sm:px-9 sm:py-8">
          
          <header className="flex items-start justify-between gap-5">
            <div className="animate-fade-in">
              <h1 className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-[27px]">
                Discoveries
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400 sm:text-[11px]">
                <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                Patterns, habits and hidden connections.
              </p>
            </div>

            <div className="relative z-50">
              <button
                onClick={() => setPeriodOpen((prev) => !prev)}
                className="group flex min-w-[140px] items-center justify-between gap-3 rounded-xl border border-[#203654] bg-[#0d1b30] px-4 py-2.5 text-[11px] font-medium text-slate-200 shadow-[0_8px_25px_rgba(0,0,0,.18)] transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#12233d] hover:shadow-indigo-500/10 active:scale-95"
              >
                <span>
                  {period === "2"
                    ? "Last 2 Years"
                    : period === "5"
                    ? "Last 5 Years"
                    : "All Time"}
                </span>

                <ChevronRight
                  size={14}
                  className={`text-slate-400 transition-transform duration-300 group-hover:text-white ${
                    periodOpen ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>

              {periodOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[160px] overflow-hidden rounded-xl border border-[#203654] bg-[#0b1729]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,.45)] backdrop-blur-xl animate-scale-up">
                  {[
                    ["2", "Last 2 Years"],
                    ["5", "Last 5 Years"],
                    ["all", "All Time"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => {
                        setPeriod(value);
                        setPeriodOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[10px] transition-all duration-200 ${
                        period === value
                          ? "bg-indigo-500/20 font-medium text-indigo-200"
                          : "text-slate-400 hover:bg-[#13243c] hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* DISCOVERY GRID */}
          <section className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="animate-slide-up" style={{ animationDelay: "50ms" }}>
              <NightOwlCard data={discoveries.nightOwl} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <SoundtrackCard artists={discoveries.soundtrack} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "150ms" }}>
              <AttentionCard categories={discoveries.categories} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <LifePhasesCard phases={discoveries.lifePhases} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}



function buildDiscoveries(overview, moments, period = "2") {
  const validTimestamps = moments
    .map((moment) => new Date(moment.start).getTime())
    .filter((time) => !Number.isNaN(time));

  const latestTimestamp = validTimestamps.length
    ? Math.max(...validTimestamps)
    : Date.now();

  const latestDate = new Date(latestTimestamp);

  let filteredMoments = moments;

  /* PERIOD FILTER */
  if (period !== "all") {
    const years = Number(period);
    const cutoff = new Date(latestDate);
    cutoff.setFullYear(cutoff.getFullYear() - years);

    filteredMoments = moments.filter((moment) => {
      const date = new Date(moment.start);
      return (
        !Number.isNaN(date.getTime()) &&
        date >= cutoff &&
        date <= latestDate
      );
    });
  }

  /* NIGHT ACTIVITY */
  const hourCounts = Array(24).fill(0);

  filteredMoments.forEach((moment) => {
    const date = new Date(moment.start);
    if (!Number.isNaN(date.getTime())) {
      hourCounts[date.getHours()]++;
    }
  });

  const nightHours = [20, 21, 22, 23, 0, 1, 2, 3, 4];
  const nightCount = nightHours.reduce(
    (sum, hour) => sum + hourCounts[hour],
    0
  );
  const totalMoments = filteredMoments.length;
  const nightPercentage = totalMoments
    ? Math.round((nightCount / totalMoments) * 100)
    : 0;

  /* SOUNDTRACK */
  const artistCounts = {};

  filteredMoments.forEach((moment) => {
    (moment.tracks || []).forEach((track) => {
      const artist = track.artist;
      if (artist) {
        artistCounts[artist] = (artistCounts[artist] || 0) + 1;
      }
    });
  });

  const soundtrack = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([artist, count]) => ({ artist, count }));

  /* CATEGORIES */
  let categories = overview?.pieData || [];

  if (period !== "all" && filteredMoments.length) {
    const categoryCounts = {};

    filteredMoments.forEach((moment) => {
      const category = formatCategory(moment.category);
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const total = filteredMoments.length;

    categories = Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count,
        value: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }

  /* LIFE PHASES */
  const lineData = overview?.lineData || [];

  const firstPhase = lineData.filter(
    (item) => Number(item.year) >= 2015 && Number(item.year) <= 2018
  );

  const secondPhase = lineData.filter(
    (item) => Number(item.year) >= 2022 && Number(item.year) <= 2024
  );

  const sumPhase = (data) =>
    data.reduce(
      (sum, item) =>
        sum +
        Number(item.music || 0) +
        Number(item.trans || 0) +
        Number(item.home || 0),
      0
    );

  const firstTotal = sumPhase(firstPhase);
  const secondTotal = sumPhase(secondPhase);

  return {
    nightOwl: {
      nightPercentage,
      hourCounts,
    },
    soundtrack,
    categories,
    lifePhases: {
      first: {
        label: "2015 – 2018",
        title: "Household Life",
        total: firstTotal,
      },
      second: {
        label: "2022 – 2024",
        title: "Digital Life",
        total: secondTotal,
      },
    },
  };
}


function NightOwlCard({ data }) {
  const bars = data.hourCounts.slice(20).concat(data.hourCounts.slice(0, 5));
  const max = Math.max(...bars, 1);

  return (
    <DiscoveryCard>
      <div className="flex items-start gap-4">
        <IconBox color="indigo">
          <Moon size={19} className="text-indigo-300 transition-transform duration-300 group-hover:-rotate-12" />
        </IconBox>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-indigo-200">
            The Night Owl
          </h2>
          <p className="mt-2 max-w-[430px] text-[10px] leading-5 text-slate-400 sm:text-[11px]">
            Your activity peaks between 8 PM and 2 AM. Music, shopping and
            entertainment light up your nights.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex h-[105px] items-end gap-[4px] pt-2">
          {bars.map((value, index) => {
            const height = Math.max(5, (value / max) * 100);
            return (
              <div
                key={index}
                className="group/bar relative flex-1"
                style={{ height: `${height}%` }}
              >
                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/bar:opacity-100 z-20">
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono text-indigo-300 shadow">
                    {value}
                  </span>
                </div>
                
                {/* Bar */}
                <div className="h-full w-full rounded-t-sm bg-gradient-to-t from-indigo-600 via-indigo-500 to-purple-400 opacity-80 transition-all duration-500 hover:scale-x-110 hover:opacity-100 hover:shadow-[0_0_12px_rgba(129,140,248,0.5)]" />
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-[8px] font-medium text-slate-500 sm:text-[9px]">
          <span>8 PM</span>
          <span>10 PM</span>
          <span>12 AM</span>
          <span>2 AM</span>
          <span>4 AM</span>
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-[9px] font-medium text-indigo-200 shadow-sm transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-400/20">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
        +{data.nightPercentage}% of moments occur at night
      </div>
    </DiscoveryCard>
  );
}

function SoundtrackCard({ artists }) {
  return (
    <DiscoveryCard>
      <div className="flex items-center gap-4">
        <IconBox color="purple">
          <Music2 size={19} className="text-purple-300 transition-transform duration-300 group-hover:scale-110" />
        </IconBox>
        <div>
          <h2 className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-purple-200">
            Your Soundtrack
          </h2>
          <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
            Top artists in your logged track records.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {artists.length === 0 ? (
          <p className="text-[10px] text-slate-500">
            No soundtrack records for this period.
          </p>
        ) : (
          artists.map((item, index) => (
            <div
              key={item.artist}
              className="group/item flex items-center gap-3 rounded-lg p-1.5 text-[10px] transition-all duration-200 hover:bg-white/[0.03] sm:text-[11px]"
            >
              <span className="w-5 font-mono text-slate-500 transition-colors group-hover/item:text-purple-400">
                0{index + 1}.
              </span>
              <span className="min-w-0 flex-1 truncate font-medium text-slate-200 transition-colors group-hover/item:text-white">
                {item.artist}
              </span>
              <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] text-purple-300 transition-colors group-hover/item:bg-purple-500/20">
                {item.count} tracks
              </span>
            </div>
          ))
        )}
      </div>
    </DiscoveryCard>
  );
}

function AttentionCard({ categories }) {
  const max = Math.max(
    ...categories.map((item) => Number(item.value) || 0),
    1
  );

  return (
    <DiscoveryCard>
      <div className="flex items-center gap-4">
        <IconBox color="cyan">
          <Activity size={19} className="text-cyan-300 transition-transform duration-300 group-hover:rotate-12" />
        </IconBox>
        <div>
          <h2 className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-cyan-200">
            Where Attention Went
          </h2>
          <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
            Distribution of your recorded activity.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {categories.map((item, index) => {
          const percentage = Number(item.value) || 0;
          return (
            <div key={item.name} className="group/bar flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ${categoryColor(
                  index
                )} transition-transform duration-200 group-hover/bar:scale-125`}
              />
              <span className="w-[105px] truncate text-[9px] font-medium text-slate-300 transition-colors group-hover/bar:text-white sm:text-[10px]">
                {item.name}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#182942] p-[1px]">
                <div
                  className={`h-full rounded-full ${categoryBar(
                    index
                  )} transition-all duration-700 ease-out`}
                  style={{ width: `${(percentage / max) * 100}%` }}
                />
              </div>
              <span className="w-9 font-mono text-right text-[9px] text-slate-400 group-hover/bar:text-cyan-300 sm:text-[10px]">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </DiscoveryCard>
  );
}

function LifePhasesCard({ phases }) {
  return (
    <DiscoveryCard>
      <div className="flex items-center gap-4">
        <IconBox color="blue">
          <CalendarDays size={19} className="text-blue-300 transition-transform duration-300 group-hover:scale-110" />
        </IconBox>
        <div>
          <h2 className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-blue-200">
            Life Phases
          </h2>
          <p className="mt-1 max-w-[400px] text-[9px] leading-4 text-slate-500 sm:text-[10px]">
            Your recorded activity shifts from essentials to digital life.
          </p>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-5">
        <Phase phase={phases.first} />
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1d3254] bg-[#14233b] shadow-inner transition-transform duration-300 hover:scale-110 hover:border-indigo-500/50">
          <ChevronRight size={17} className="text-slate-400" />
        </div>
        <Phase phase={phases.second} digital />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <MiniIcon icon={<Home size={12} />} />
        <MiniIcon icon={<ShoppingBag size={12} />} />
        <MiniIcon icon={<Utensils size={12} />} />
        <ChevronRight size={14} className="mx-1 text-slate-600 animate-pulse" />
        <MiniIcon icon={<Music2 size={12} />} purple />
        <MiniIcon icon={<Film size={12} />} purple />
        <MiniIcon icon={<Activity size={12} />} purple />
      </div>
    </DiscoveryCard>
  );
}



function Phase({ phase, digital = false }) {
  return (
    <div className="min-w-0 flex-1 rounded-xl border border-transparent p-2 transition-all duration-200 hover:border-[#1a2d4b] hover:bg-[#0c192d]">
      <p className="text-[9px] font-medium text-slate-400">{phase.label}</p>
      <p className="mt-1 text-[11px] font-semibold text-slate-200">
        {phase.title}
      </p>
      <p className="mt-2 text-[8px] font-mono leading-4 text-slate-500">
        {phase.total.toLocaleString()} activities
      </p>
    </div>
  );
}

function DiscoveryCard({ children }) {
  return (
    <article className="group relative min-h-[255px] overflow-hidden rounded-2xl border border-[#1a2c49] bg-gradient-to-br from-[#0c1b31] to-[#0a172a] p-6 transition-all duration-300 hover:scale-[1.01] hover:border-[#334e7a] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
      {/* Top highlight glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent transition-all duration-500 group-hover:via-indigo-500/40" />

      {/* Ambient background blurs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/[0.025] blur-3xl transition-all duration-500 group-hover:bg-cyan-500/10" />
      
      <div className="relative z-10">{children}</div>
    </article>
  );
}

function IconBox({ children, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-500/20 border-indigo-400/20 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/30",
    purple: "bg-purple-500/20 border-purple-400/20 group-hover:border-purple-400/50 group-hover:bg-purple-500/30",
    cyan: "bg-cyan-500/15 border-cyan-400/20 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/25",
    blue: "bg-blue-500/20 border-blue-400/20 group-hover:border-blue-400/50 group-hover:bg-blue-500/30",
  };

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 shadow-inner ${colors[color]}`}
    >
      {children}
    </div>
  );
}

function MiniIcon({ icon, purple = false }) {
  return (
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-300 hover:scale-110 ${
        purple
          ? "border-purple-400/20 bg-purple-500/10 text-purple-300 hover:border-purple-400/50 hover:bg-purple-500/20"
          : "border-slate-700/50 bg-[#122238] text-slate-400 hover:border-slate-500 hover:text-white"
      }`}
    >
      {icon}
    </div>
  );
}