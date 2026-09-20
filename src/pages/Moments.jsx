import React, { useEffect, useMemo, useState } from "react";
import {
    Home,
    Clock3,
    Search,
    Compass,
    Sparkles,
    Music2,
    CreditCard,
    MapPin,
    ShoppingBag,
    HeartPulse,
    ChevronRight,
    Activity,
    X,
    ArrowUpRight,
    Tag,
} from "lucide-react";



function formatTimeRange(start, end) {
    if (!start) return "";
    const formatTime = (isoStr) => {
        const date = new Date(isoStr);
        return isNaN(date.getTime())
            ? isoStr
            : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    return end ? `${formatTime(start)} - ${formatTime(end)}` : formatTime(start);
}

function formatAmount(amount) {
    if (amount == null) return "0";
    return Number(amount).toLocaleString("en-IN");
}



const categoryConfig = {
    fitness_and_medical: {
        label: "Fitness & Medical",
        icon: HeartPulse,
        iconBg: "bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
        iconColor: "text-emerald-400 group-hover:scale-110 group-hover:rotate-6",
        accent: "text-emerald-400",
        dot: "bg-emerald-400 animate-pulse",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]",
    },
    entertainment: {
        label: "Entertainment",
        icon: Music2,
        iconBg: "bg-pink-500/10 border border-pink-500/20 group-hover:bg-pink-500/20 group-hover:border-pink-500/40",
        iconColor: "text-pink-400 group-hover:scale-110 group-hover:-rotate-6",
        accent: "text-pink-400",
        dot: "bg-pink-400 animate-pulse",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.3)]",
    },
    online_shopping: {
        label: "Online Shopping",
        icon: ShoppingBag,
        iconBg: "bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40",
        iconColor: "text-amber-400 group-hover:scale-110 group-hover:rotate-6",
        accent: "text-amber-400",
        dot: "bg-amber-400 animate-pulse",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]",
    },
    travel: {
        label: "Travel",
        icon: MapPin,
        iconBg: "bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40",
        iconColor: "text-cyan-400 group-hover:scale-110 group-hover:-rotate-6",
        accent: "text-cyan-400",
        dot: "bg-cyan-400 animate-pulse",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.3)]",
    },
};



const filters = [
    { id: "all", label: "All", icon: Activity },
    { id: "music", label: "Music", icon: Music2 },
    { id: "transaction", label: "Transactions", icon: CreditCard },
    { id: "fitness_and_medical", label: "Fitness & Medical", icon: HeartPulse },
    { id: "online_shopping", label: "Shopping", icon: ShoppingBag },
    { id: "travel", label: "Travel", icon: MapPin },
    { id: "entertainment", label: "Entertainment", icon: Music2 },
];



export default function Moments() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedMoment, setSelectedMoment] = useState(null);

    const [momentsData, setMomentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/data/momentsData.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load moments data");
                }
                return response.json();
            })
            .then((data) => {
                setMomentsData(data);
            })
            .catch((err) => {
                console.error("Error loading moments:", err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const filteredMoments = useMemo(() => {
        let data = [...momentsData];

        if (activeFilter !== "all") {
            data = data.filter((moment) => {
                if (activeFilter === "music") {
                    return moment.music?.recordCount > 0;
                }
                if (activeFilter === "transaction") {
                    return moment.transaction?.count > 0;
                }
                return moment.category === activeFilter;
            });
        }

        if (search.trim()) {
            const query = search.toLowerCase();

            data = data.filter((moment) => {
                const searchableText = [
                    moment.title,
                    moment.date,
                    moment.source,
                    moment.category,
                    ...(moment.tags || []).map((tag) => tag.text || tag),
                    ...(moment.tracks || []).map(
                        (track) => `${track.track} ${track.artist}`
                    ),
                ]
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(query);
            });
        }

        return data.sort(
            (a, b) => new Date(b.start || b.date) - new Date(a.start || a.date)
        );
    }, [activeFilter, search, momentsData]);

    return (
        <div className="relative min-h-screen bg-[#030712] p-3 text-white sm:p-5 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
            <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[140px] transition-all duration-1000" />
            <div className="pointer-events-none fixed top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px] transition-all duration-1000" />
            <div className="pointer-events-none fixed -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px] transition-all duration-1000" />

            <div className="relative z-10 min-h-[calc(100vh-40px)] overflow-hidden rounded-3xl border border-[#1e293b]/70 bg-[#070d19]/80 backdrop-blur-2xl transition-all duration-500 shadow-[0_0_50px_-12px_rgba(0,0,0,0.7)]">
                <main className="min-h-full">
                    <div className="mx-auto max-w-[1050px] px-4 py-8 sm:px-8">
                        
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1 transition-all duration-300">
                                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                                    Moments
                                </h1>
                                <p className="text-xs text-slate-400 sm:text-sm flex items-center gap-2 font-medium">
                                    <Sparkles size={14} className="text-indigo-400 animate-pulse shrink-0" />
                                    <span>Connected activities, Real moments.</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="group relative flex h-10 w-full items-center gap-2.5 rounded-2xl border border-[#1e293b] bg-[#0b1528]/80 px-4 transition-all duration-300 focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-[#334155] md:w-[280px] shadow-inner">
                                    <Search size={15} className="shrink-0 text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-200" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search moments, tracks, tags..."
                                        className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            className="rounded-full p-0.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                                        >
                                            <X size={13} />
                                        </button>
                                    )}
                                </div>

                                <button className="h-10 shrink-0 rounded-2xl border border-[#1e293b] bg-[#0b1528]/80 px-4 text-xs font-semibold text-slate-300 transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#111f38] hover:text-white active:scale-95 shadow-sm">
                                    Y/m
                                </button>
                            </div>
                        </div>

                        <div className="scrollbar-hide mt-8 flex items-center gap-2 overflow-x-auto pb-2 pt-1">
                            {filters.map((filter) => {
                                const Icon = filter.icon;
                                const active = activeFilter === filter.id;

                                return (
                                    <button
                                        key={filter.id}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className={`group relative flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-medium transition-all duration-300 active:scale-95 ${
                                            active
                                                ? "border-indigo-500/50 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-[0_0_20px_-3px_rgba(79,70,229,0.5)] scale-[1.02]"
                                                : "border-[#1e293b] bg-[#0b1528]/60 text-slate-400 hover:border-[#334155] hover:bg-[#111f3a] hover:text-slate-200"
                                        }`}
                                    >
                                        <Icon 
                                            size={14} 
                                            className={`transition-transform duration-300 ${
                                                active ? "scale-110 rotate-6" : "group-hover:scale-110"
                                            }`} 
                                        />
                                        <span>{filter.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-b border-[#1e293b]/60 pb-3">
                            <p className="text-xs font-semibold text-slate-400 transition-all">
                                Showing <span className="text-white font-bold">{filteredMoments.length}</span>{" "}
                                {filteredMoments.length === 1 ? "moment" : "moments"}
                            </p>

                            {search && (
                                <p className="text-xs text-slate-400 animate-fade-in">
                                    Matching <span className="text-indigo-400 font-medium">"{search}"</span>
                                </p>
                            )}
                        </div>

                        <div className="mt-5 space-y-3.5">
                            {filteredMoments.map((moment, index) => (
                                <div
                                    key={moment.id}
                                    className="transition-all duration-300"
                                    style={{
                                        animation: `slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s both`,
                                    }}
                                >
                                    <MomentCard
                                        moment={moment}
                                        onClick={() => setSelectedMoment(moment)}
                                    />
                                </div>
                            ))}

                            {!loading && filteredMoments.length === 0 && (
                                <div className="rounded-3xl border border-[#1e293b]/80 bg-[#0b1528]/30 px-6 py-20 text-center backdrop-blur-md transition-all duration-300">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
                                        <Search size={24} />
                                    </div>
                                    <h3 className="mt-4 text-base font-semibold text-slate-200">
                                        No moments found
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                                        We couldn't find anything matching your current filters or search terms. Try clearing them to see all moments.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {selectedMoment && (
                <MomentModal
                    moment={selectedMoment}
                    onClose={() => setSelectedMoment(null)}
                />
            )}
        </div>
    );
}


function MomentCard({ moment, onClick }) {
    const config = categoryConfig[moment.category] || categoryConfig.entertainment;
    const Icon = config.icon;

    return (
        <button
            onClick={onClick}
            className={`group relative w-full overflow-hidden rounded-2xl border border-[#1e293b]/80 bg-gradient-to-r from-[#0b1528] via-[#091122] to-[#080e1d] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/50 active:translate-y-0 active:scale-[0.995] ${config.glow}`}
        >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent transition-all duration-500 group-hover:via-indigo-500/60" />

            <div className="flex items-center gap-4">
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${config.iconBg} transition-all duration-300 sm:h-14 sm:w-14 shadow-inner`}
                >
                    <Icon size={24} className={`${config.iconColor} transition-all duration-300`} />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="truncate text-sm font-semibold text-slate-100 transition-colors duration-200 group-hover:text-indigo-300 sm:text-base">
                            {moment.title}
                        </h2>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-400 font-medium flex items-center gap-1.5">
                        <Clock3 size={12} className="text-slate-500 shrink-0" />
                        <span>{moment.date}</span>
                        <span className="text-slate-600">•</span>
                        <span>{formatTimeRange(moment.start, moment.end)}</span>
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                        {moment.music?.recordCount > 0 && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-[10px] font-medium text-purple-300 transition-colors group-hover:border-purple-500/40">
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                                Music ({moment.music.recordCount} records)
                            </span>
                        )}

                        {moment.transaction?.count > 0 && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 px-2.5 py-0.5 text-[10px] font-medium text-slate-300 transition-colors group-hover:border-slate-600">
                                <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                                {config.label} ({moment.transaction.count})
                            </span>
                        )}
                    </div>
                </div>

                {moment.transaction?.amount != null && (
                    <div className="hidden shrink-0 text-right md:block border-l border-[#1e293b]/60 pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Amount</p>
                        <p className="mt-0.5 text-xs font-bold text-emerald-400 font-mono tracking-tight">
                            ₹{formatAmount(moment.transaction.amount)}
                        </p>
                        <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                            {moment.transaction.time}
                        </p>
                    </div>
                )}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#1e293b] bg-[#0d182e]/80 text-slate-400 transition-all duration-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 shadow-sm">
                    <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </div>
            </div>
        </button>
    );
}

function MomentModal({ moment, onClose }) {
    const config = categoryConfig[moment.category] || categoryConfig.entertainment;
    const Icon = config.icon;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-all duration-300 animate-fade-in"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#1e293b] bg-[#070e1c] p-6 shadow-[0_0_50px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 animate-scale-up"
            >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-t-3xl" />

                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconBg} shadow-inner shrink-0`}
                        >
                            <Icon size={24} className={config.iconColor} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                {moment.title}
                            </h2>
                            <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1.5">
                                <span>{moment.date}</span>
                                <span>•</span>
                                <span>{formatTimeRange(moment.start, moment.end)}</span>
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full border border-[#1e293b] bg-[#0e192e] p-2 text-slate-400 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-95"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    {moment.source && (
                        <div className="flex items-center justify-between rounded-2xl border border-[#1e293b] bg-[#0b1426] px-4 py-3 text-xs">
                            <span className="font-medium text-slate-400">Data Source</span>
                            <span className="font-semibold text-indigo-300">
                                {moment.source}
                            </span>
                        </div>
                    )}

                    {/* Transaction Section */}
                    {moment.transaction && (
                        <div className="rounded-2xl border border-[#1e293b] bg-[#0b1426] p-4 transition-all hover:border-emerald-500/30">
                            <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                                <CreditCard size={15} className="text-emerald-400" />
                                Transaction Details
                            </h3>
                            <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                                <div className="rounded-xl bg-[#0e192e] p-3 border border-[#1e293b]/60">
                                    <p className="text-[10px] font-medium text-slate-400">Amount</p>
                                    <p className="mt-0.5 text-base font-bold text-emerald-400 font-mono">
                                        ₹{formatAmount(moment.transaction.amount)}
                                    </p>
                                </div>
                                {moment.transaction.time && (
                                    <div className="rounded-xl bg-[#0e192e] p-3 border border-[#1e293b]/60">
                                        <p className="text-[10px] font-medium text-slate-400">Timestamp</p>
                                        <p className="mt-0.5 text-sm font-semibold text-slate-200">
                                            {moment.transaction.time}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {moment.tracks && moment.tracks.length > 0 && (
                        <div className="rounded-2xl border border-[#1e293b] bg-[#0b1426] p-4 transition-all hover:border-purple-500/30">
                            <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                                <Music2 size={15} className="text-purple-400" />
                                Audio Tracks ({moment.tracks.length})
                            </h3>
                            <div className="mt-3 max-h-52 overflow-y-auto divide-y divide-[#1e293b]/60 pr-1">
                                {moment.tracks.map((track, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between py-2.5 text-xs transition-colors hover:bg-white/[0.02] px-2 rounded-xl"
                                    >
                                        <div className="min-w-0 flex-1 pr-2">
                                            <p className="truncate font-semibold text-slate-200">
                                                {track.track}
                                            </p>
                                            <p className="truncate text-[10px] font-medium text-slate-400">
                                                {track.artist}
                                            </p>
                                        </div>
                                        {track.time && (
                                            <span className="shrink-0 text-[10px] font-mono font-medium text-slate-500">
                                                {track.time}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags Section */}
                    {moment.tags && moment.tags.length > 0 && (
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
                                <Tag size={13} className="text-indigo-400" />
                                Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {moment.tags.map((tag, idx) => {
                                    const tagText = typeof tag === "string" ? tag : tag.text;
                                    return (
                                        <span
                                            key={idx}
                                            className="rounded-xl border border-[#1e293b] bg-[#0e192e] px-3 py-1 text-[11px] font-medium text-slate-300 transition-all duration-200 hover:border-indigo-500/40 hover:text-white hover:scale-105"
                                        >
                                            #{tagText}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}