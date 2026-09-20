import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Clock3,
  Search,
  Compass,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    icon: Home,
    path: "/overview",
  },
  {
    label: "Moments",
    icon: Clock3,
    path: "/moments",
  },
  {
    label: "Explore",
    icon: Search,
    path: "/explore",
  },
  {
    label: "Discoveries",
    icon: Compass,
    path: "/discoveries",
  },
];

export default function Sidebar() {

    const navigate = useNavigate()

  return (
    <aside
      className="
        group/sidebar
        fixed left-3 top-3 bottom-3 z-50
        w-[64px] hover:w-[210px]
        overflow-hidden
        rounded-2xl
        border border-[#1b2945]
        bg-[#050d1b]/95
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        transition-[width]
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
      "
    >
      {/* Background Ambient Glow Effect */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-opacity duration-500 group-hover/sidebar:opacity-100" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-opacity duration-500 group-hover/sidebar:opacity-100" />

      {/* Logo Section */}
      <div className="relative z-10 flex h-[70px] items-center px-4">
        <div
          className="
            relative flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-xl
            border border-cyan-400/30
            bg-gradient-to-br from-cyan-500/20 to-indigo-500/10
            shadow-[0_0_15px_rgba(34,211,238,0.15)]
            transition-all duration-300
            group-hover/sidebar:scale-110 group-hover/sidebar:border-cyan-400/60
          "
          onClick={() => navigate("/")}
        >
          <Sparkles
            size={18}
            className="text-cyan-300 transition-transform duration-500 group-hover/sidebar:rotate-12"
          />
        </div>

        <span
          className="
            ml-3.5 whitespace-nowrap
            bg-gradient-to-r from-white via-slate-200 to-cyan-200 bg-clip-text
            text-xs font-bold tracking-wider text-transparent
            opacity-0 translate-x-[-10px]
            transition-all duration-300 ease-out
            group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100
            delay-75
          "
        >
          TrackLife
        </span>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mt-2 space-y-2 px-2.5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                group/item
                relative flex h-11 w-full
                items-center rounded-xl
                transition-all duration-300 ease-out
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#213875] to-[#192b5c] text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] border border-indigo-500/30"
                    : "text-slate-400 border border-transparent hover:border-slate-800 hover:bg-[#0c182c] hover:text-slate-200"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  )}

                  {/* Icon Wrapper */}
                  <div className="flex w-[42px] shrink-0 items-center justify-center">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={`
                        transition-all duration-300 ease-out
                        group-hover/item:scale-120
                        ${
                          isActive
                            ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                            : "group-hover/item:text-cyan-300"
                        }
                      `}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="
                      whitespace-nowrap text-xs font-medium tracking-wide
                      opacity-0 translate-x-[-8px]
                      transition-all duration-300 ease-out
                      group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100
                      delay-100
                    "
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div
        className="
          absolute bottom-5 left-0 z-10
          flex w-full items-center px-4
          opacity-0 translate-y-3
          transition-all duration-500 ease-out
          group-hover/sidebar:translate-y-0 group-hover/sidebar:opacity-100
          delay-100
        "
      >
        <div className="flex items-center gap-3 rounded-xl border border-[#14233c] bg-[#081324]/80 p-2.5 backdrop-blur-sm">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <TrendingUp size={14} className="animate-pulse" />
          </div>

          <div className="whitespace-nowrap text-[9px] font-medium leading-3.5 text-slate-400">
            Your Digital Life
            <br />
            <span className="text-[10px] font-semibold text-slate-200">
              In Numbers
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}