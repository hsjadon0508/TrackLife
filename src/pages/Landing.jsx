import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Music2,
  MapPin,
  ShoppingCart,
  Home,
  CreditCard,
  Sparkles,
  Zap,
  TrendingUp,
  Compass,
  Layers,
  BarChart3,
  ChevronRight,
  Radio,
  Coffee,
  Plane,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    icon: Music2,
    value: "149,860",
    label: "Songs Listened",
    iconClass: "text-blue-400",
    bgClass: "bg-blue-500/15 border-blue-500/20",
    trend: "+12.4% this month",
    detail: "Top Genre: Synthwave & Ambient"
  },
  {
    icon: CreditCard,
    value: "10,267",
    label: "Transactions Logged",
    iconClass: "text-cyan-300",
    bgClass: "bg-cyan-400/15 border-cyan-400/20",
    trend: "+8.1% vs last year",
    detail: "Most frequent: Coffee & Tech"
  },
  {
    icon: Home,
    value: "2,461",
    label: "Household Milestones",
    iconClass: "text-orange-300",
    bgClass: "bg-orange-400/15 border-orange-400/20",
    trend: "100% synchronized",
    detail: "32 Cities explored"
  },
];

const featureSteps = [
  {
    step: "01",
    title: "Raw Data Collection",
    desc: "Seamlessly aggregate your listening habits, location logs, purchase receipts, and daily activities in real-time.",
    icon: Layers,
    color: "from-blue-500 to-indigo-500"
  },
  {
    step: "02",
    title: "AI Pattern Synthesis",
    desc: "Contextual AI models extract unspoken habits, core emotional trends, and behavioral patterns from your logs.",
    icon: Sparkles,
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    step: "03",
    title: "Contextual Connections",
    desc: "Correlate that late-night coffee receipt with the album you played on repeat while traveling across the city.",
    icon: Compass,
    color: "from-cyan-400 to-blue-500"
  },
  {
    step: "04",
    title: "Living Life Story",
    desc: "Transform abstract telemetry into a beautiful, interactive digital memoir that grows alongside your journey.",
    icon: TrendingUp,
    color: "from-amber-400 to-orange-500"
  }
];

export default function App() {
const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
      
      {/* Dynamic Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/15 via-blue-600/10 to-cyan-500/10 rounded-full blur-[120px] transition-all duration-300 ease-out z-0"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      {}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/85 backdrop-blur-2xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3 group cursor-pointer">
            <div
                     className="
                       flex h-8 w-8 shrink-0
                       items-center justify-center
                       rounded-lg
                       border border-cyan-300/30
                       bg-cyan-400/10
                     "
                   >
                     <Sparkles
                       size={16}
                       className="text-cyan-300"
                     />
                   </div>

            <div className="flex flex-col">
              <span className="text-base font-bold tracking-[0.15em] bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                DigiTrace
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider">DIGITAL FOOTPRINT ENGINE</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-slate-300 uppercase">
            <a href="#hero" className="hover:text-cyan-300 transition">Overview</a>
            <a href="#traces" className="hover:text-cyan-300 transition">Digital Traces</a>
            <a href="#stats" className="hover:text-cyan-300 transition">Metrics</a>
            <a href="#workflow" className="hover:text-cyan-300 transition">How it works</a>
          </div>

          <button 
              onClick={() => {setIsStarted(!isStarted);navigate("/overview")}}
            className="relative group overflow-hidden flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 px-6 py-2.5 text-xs font-semibold shadow-lg shadow-indigo-500/25 transition duration-300 hover:scale-105 hover:shadow-indigo-500/40 active:scale-95"
          >
            <span className="relative z-10">{isStarted ? "Welcome Back" : "Get Started"}</span>
            <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-500" />
          </button>

        </div>
      </header>

      {}
      <main className="relative z-10">

        <section id="hero" className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(147,51,234,0.25),transparent_45%),radial-gradient(circle_at_30%_65%,rgba(6,182,212,0.15),transparent_45%),linear-gradient(180deg,#020617_0%,#071226_60%,#020617_100%)]" />

            <div 
              className="absolute bottom-0 left-0 h-[45%] w-full bg-[#030914] opacity-90 transition-all duration-700"
              style={{
                clipPath: "polygon(0 75%, 8% 58%, 16% 68%, 27% 34%, 36% 58%, 47% 22%, 56% 58%, 66% 40%, 77% 65%, 87% 42%, 100% 63%, 100% 100%, 0 100%)"
              }}
            />

            <div className="absolute bottom-[10%] left-[15%] h-56 w-96 rounded-full bg-purple-600/15 blur-[120px] animate-pulse" />
            <div className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-500/15 blur-[120px] animate-pulse" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">

            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

              <div className="lg:col-span-7 flex flex-col justify-center">

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 w-fit mb-6 shadow-sm">
                  <Sparkles size={13} className="animate-spin text-cyan-300" style={{ animationDuration: '6s' }} />
                  Your digital life, connected
                </div>

                <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                  Thousands of digital traces.
                  <span className="mt-2 block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                    One story waiting to be discovered.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
                  Transforming your music habits, financial transactions, travel check-ins, and daily moments into a beautifully connected visual memoir.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button className="group relative overflow-hidden flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-7 py-4 text-sm font-bold shadow-[0_10px_35px_rgba(99,102,241,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(99,102,241,0.5)] active:translate-y-0">
                    <span>Explore Your Story</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <a 
                    href="#traces"
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-slate-300 backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Radio size={16} className="text-cyan-400" />
                    <span>Watch Live Demo</span>
                  </a>
                </div>

                <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Real-time Syncing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>End-to-End Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-400" />
                    <span>AI Narrative Engine</span>
                  </div>
                </div>

              </div>

              <div id="traces" className="lg:col-span-5 relative">

                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-blue-400/30" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300/90">
                    Live Digital Traces
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-400/30 to-transparent" />
                </div>

                <div className="grid grid-cols-2 gap-3.5">

                  <div 
                    onMouseEnter={() => setHoveredCard('music')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] ${hoveredCard === 'music' ? 'ring-1 ring-purple-400/30' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 transition duration-300 group-hover:scale-110">
                        <Music2 size={20} />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-purple-400/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-purple-300 uppercase">
                        Music
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white group-hover:text-purple-200 transition">
                      Blinding Lights
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">The Weeknd</p>
                    
                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text. text-[10px] text-slate-400">
                      <span>Played 42 times</span>
                      <span className="text-purple-300 font-medium">10:42 PM</span>
                    </div>
                  </div>

                  <div 
                    onMouseEnter={() => setHoveredCard('travel')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] ${hoveredCard === 'travel' ? 'ring-1 ring-cyan-400/30' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition duration-300 group-hover:scale-110">
                        <MapPin size={20} />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-cyan-300 uppercase">
                        Travel
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white group-hover:text-cyan-200 transition">
                      Bangalore
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">Indiranagar District</p>
                    
                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-slate-400">
                      <span>Visited</span>
                      <span className="text-cyan-300 font-medium">12 Apr 2023</span>
                    </div>
                  </div>

                  <div 
                    onMouseEnter={() => setHoveredCard('shopping')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.08] hover:shadow-[0_10px_30px_rgba(251,146,60,0.15)] ${hoveredCard === 'shopping' ? 'ring-1 ring-orange-400/30' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30 transition duration-300 group-hover:scale-110">
                        <ShoppingCart size={20} />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-orange-400/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-orange-300 uppercase">
                        Shopping
                      </span>
                    </div>

                    <p className="text-sm font-bold text-white group-hover:text-orange-200 transition">
                      Amazon Order
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">Tech & Books</p>
                    
                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-slate-400">
                      <span>Amount</span>
                      <span className="text-orange-300 font-medium">₹2,400</span>
                    </div>
                  </div>

                  <div 
                    onMouseEnter={() => setHoveredCard('env')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/30 via-purple-700/40 to-slate-950 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                        <Coffee size={16} className="text-amber-200" />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold tracking-wider text-amber-200 uppercase">
                        Atmosphere
                      </span>
                    </div>

                    <div className="relative z-10 mt-6">
                      <p className="text-sm font-bold text-white">
                        Late Night Espresso
                      </p>
                      <p className="mt-0.5 text-xs text-slate-300">
                        Rainy evening ambience
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {}
        <section id="stats" className="relative mx-auto max-w-7xl px-6 py-12">

          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Telemetry Overview</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">Aggregated Life Activity</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-xs">
              Automatically synced across 14 connected services and smart devices.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06] hover:shadow-xl"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition duration-300">
                    <Icon size={80} />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`rounded-2xl border p-3.5 transition duration-300 group-hover:scale-110 ${stat.bgClass}`}>
                      <Icon size={24} className={stat.iconClass} />
                    </div>

                    <div>
                      <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="font-medium text-emerald-400 flex items-center gap-1">
                      <TrendingUp size={12} />
                      {stat.trend}
                    </span>
                    <span className="text-slate-400">{stat.detail}</span>
                  </div>
                </div>
              );
            })}

          </div>

        </section>

        {}
        <section id="workflow" className="relative border-t border-white/5 bg-[#030a17]/80 py-20 backdrop-blur-md">

          <div className="mx-auto max-w-7xl px-6">

            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                From data to meaning
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                How Your Narrative Unfolds
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Every transaction, song, destination, and everyday moment automatically converges into a synchronized living timeline.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featureSteps.map((item, idx) => {
                const StepIcon = item.icon;
                return (
                  <div 
                    key={item.step}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-lg transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-black text-slate-600 group-hover:text-cyan-400 transition duration-300">
                        {item.step}
                      </span>
                      <div className={`p-2.5 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-md`}>
                        <StepIcon size={18} />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition duration-300">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/30 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl relative z-10">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">Ready to uncover your story?</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Connect your first data source in under two minutes and start generating your life receipts today.
                </p>
              </div>

              <button className="relative z-10 shrink-0 flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-xs font-bold text-slate-900 shadow-xl transition duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95">
                <span>Start Free Trial</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </section>

      </main>

      {}
      <footer className="border-t border-white/10 bg-[#01040d] py-10 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="font-semibold text-slate-400">DigiTrace &copy; {new Date().getFullYear()}</span>
          </div>

          <p className="text-center sm:text-right text-slate-500">
            Crafted for meaningful digital reflection. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}