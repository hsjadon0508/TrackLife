import { useEffect, useState } from "react";

import {
  Home,
  Clock,
  Search,
  Compass,
  Music2,
  CreditCard,
  HomeIcon,
  Loader2,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { NavLink } from "react-router-dom";

const PIE_COLORS = [
  "#7C5CFF",
  "#46D3D9",
  "#6CCB8B",
  "#FFB84D",
  "#FF6B9D",
];

function Overview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/overviewData.json");

        if (!response.ok) {
          throw new Error("Failed to load overview data");
        }

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050C1B] text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Unable to load your data
          </h2>

          <p className="mt-2 text-gray-400">
            Make sure overviewData.json exists inside public/data.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050C1B] text-white">
        <div className="flex items-center gap-3 text-gray-300">
          <Loader2 className="animate-spin" size={22} />
          Loading your digital life...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050C1B] p-4 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1400px] overflow-hidden rounded-3xl border border-[#1A2744] bg-[#081122]">


        <main className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">


          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-semibold sm:text-3xl">
                Good to see you again!
              </h1>

              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                Here's a snapshot of your digital life.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-[#1A2744] bg-[#0B172E] px-4 py-3 text-sm text-gray-300">
              2013 — 2024
            </div>

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <StatCard
              icon={<Music2 size={22} />}
              color="bg-purple-500"
              value={data.stats.music.toLocaleString()}
              label="Music Records"
            />

            <StatCard
              icon={<CreditCard size={22} />}
              color="bg-cyan-500"
              value={data.stats.transactions.toLocaleString()}
              label="Transactions"
            />

            <StatCard
              icon={<HomeIcon size={22} />}
              color="bg-orange-500"
              value={data.stats.household.toLocaleString()}
              label="Household Records"
            />

          </div>


          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">


            <div className="rounded-3xl border border-[#1A2744] bg-[#0B172E] p-5 sm:p-6">

              <div className="mb-5">
                <h3 className="text-lg font-medium">
                  Activity Over Time
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Records available across the three datasets
                </p>
              </div>

              <div className="h-[300px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={data.lineData}>

                    <XAxis
                      dataKey="year"
                      stroke="#6B7280"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />

                    <YAxis
                      stroke="#6B7280"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#081122",
                        border: "1px solid #1A2744",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="music"
                      name="Music"
                      stroke="#A855F7"
                      strokeWidth={3}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="trans"
                      name="Transactions"
                      stroke="#14B8A6"
                      strokeWidth={3}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="home"
                      name="Household"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      dot={false}
                    />

                    <Legend />

                  </LineChart>
                </ResponsiveContainer>

              </div>

            </div>


            <div className="rounded-3xl border border-[#1A2744] bg-[#0B172E] p-5 sm:p-6">

              <div className="mb-3">
                <h3 className="text-lg font-medium">
                  Transaction Categories
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Distribution of transaction records
                </p>
              </div>

              <div className="flex flex-col items-center">

                <div className="h-52 w-52">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>

                      <Pie
                        data={data.pieData}
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >

                        {data.pieData.map((item, index) => (
                          <Cell
                            key={item.name}
                            fill={
                              PIE_COLORS[
                                index % PIE_COLORS.length
                              ]
                            }
                          />
                        ))}

                      </Pie>

                      <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          backgroundColor: "#081122",
                          border: "1px solid #1A2744",
                          borderRadius: "12px",
                        }}
                      />

                    </PieChart>
                  </ResponsiveContainer>

                </div>

                <div className="mt-4 w-full space-y-3">

                  {data.pieData.map((item, index) => (

                    <div
                      key={item.name}
                      className="flex items-center justify-between text-sm"
                    >

                      <div className="flex items-center gap-2">

                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              PIE_COLORS[
                                index % PIE_COLORS.length
                              ],
                          }}
                        />

                        <span className="text-gray-300">
                          {item.name}
                        </span>

                      </div>

                      <span className="text-gray-400">
                        {item.value}%
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>


          <div className="mt-6 rounded-3xl border border-[#1A2744] bg-[#0B172E] p-5 sm:p-6">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h3 className="font-medium">
                  Recent Connections
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Possible connections found across datasets
                </p>
              </div>

              <NavLink
                to="/moments"
                className="text-sm text-purple-400 transition hover:text-purple-300"
              >
                View All →
              </NavLink>

            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {data.recentMoments.map((moment) => (

                <MomentCard
                  key={`${moment.time}-${moment.track}`}
                  title={moment.title}
                  time={moment.time}
                  category={moment.category}
                  track={moment.track}
                  artist={moment.artist}
                  amount={moment.amount}
                  connectionMinutes={
                    moment.connectionMinutes
                  }
                />

              ))}

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}




function SidebarItem({ children, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
          isActive
            ? "bg-[#5065FF] text-white"
            : "text-gray-400 hover:bg-[#0B172E] hover:text-white"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}




function StatCard({ icon, value, label, color }) {
  return (
    <div className="rounded-3xl border border-[#1A2744] bg-[#0B172E] p-5">

      <div className="flex items-center gap-4">

        <div className={`${color} rounded-2xl p-3`}>
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {value}
          </h2>

          <p className="text-sm text-gray-400">
            {label}
          </p>
        </div>

      </div>

    </div>
  );
}



function MomentCard({
  title,
  time,
  category,
  track,
  artist,
  amount,
  connectionMinutes,
}) {
  return (
    <div className="rounded-2xl border border-[#1A2744] bg-[#111C33] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#5065FF]">

      <div className="flex items-start justify-between gap-3">

        <div>
          <h4 className="font-medium">
            {title}
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            {time}
          </p>
        </div>

        <div className="rounded-lg bg-[#5065FF]/10 px-2 py-1 text-xs text-[#8C9AFF]">
          Connected
        </div>

      </div>

      <div className="mt-4 space-y-2">

        <div className="flex items-center gap-2 text-sm">
          <Music2 size={15} className="text-purple-400" />
          <span className="truncate text-gray-300">
            {track}
          </span>
        </div>

        <p className="ml-5 text-xs text-gray-500">
          {artist}
        </p>

        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">

          <span>
            {category}
          </span>

          {amount && (
            <span>
              ₹{amount.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </span>
          )}

        </div>

        <p className="pt-1 text-[11px] text-gray-600">
          Music activity within {connectionMinutes} min
          of a transaction
        </p>

      </div>

    </div>
  );
}

export default Overview;