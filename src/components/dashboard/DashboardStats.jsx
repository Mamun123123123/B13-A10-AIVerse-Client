"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
BarChart,
Bar,
CartesianGrid,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardStats() {
const { data: session } = useSession();

const [stats, setStats] = useState({
totalPrompts: 0,
totalCopies: 0,
totalBookmarks: 0,
recent: [],
chartData: [],
loading: true,
});

useEffect(() => {
const fetchData = async () => {
if (!session?.user?.email) return;


  try {
    setStats((prev) => ({
      ...prev,
      loading: true,
    }));

    const [promptRes, bookmarkRes] =
      await Promise.all([
        fetch(
          `${API_URL}/api/prompts?email=${session.user.email}`
        ),
        fetch(
          `${API_URL}/api/bookmarks?email=${session.user.email}`
        ),
      ]);

    const prompts = await promptRes.json();
    const bookmarks = await bookmarkRes.json();

    const totalCopies = prompts.reduce(
      (sum, p) => sum + (p.copyCount || 0),
      0
    );

    const monthlyMap = {};

    prompts.forEach((p) => {
      const date = new Date(
        p.createdAt || Date.now()
      );

      const key = date.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      );

      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          name: key,
          prompts: 0,
          copies: 0,
        };
      }

      monthlyMap[key].prompts += 1;
      monthlyMap[key].copies +=
        p.copyCount || 0;
    });

    const chartData =
      Object.values(monthlyMap);

    const recent = [...prompts]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

    setStats({
      totalPrompts: prompts.length,
      totalCopies,
      totalBookmarks:
        bookmarks.length,
      recent,
      chartData,
      loading: false,
    });
  } catch (error) {
    console.error(error);

    setStats((prev) => ({
      ...prev,
      loading: false,
    }));
  }
};

fetchData();


}, [session?.user?.email]);

if (stats.loading) {
return ( <div className="flex justify-center items-center min-h-100 text-white">
Loading Dashboard... </div>
);
}

return ( <div className="min-h-screen space-y-6 bg-purple-900 from-purple-950 via-violet-900 to-fuchsia-900 p-8 text-white">


  {/* Header */}
  <div>
    <h1 className="text-4xl font-black">
      Dashboard Analytics
    </h1>

    <p className="text-white/70 mt-2">
      Track your prompt performance and growth.
    </p>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    <Card
      title="Total Prompts"
      value={stats.totalPrompts}
    />

    <Card
      title="Total Copies"
      value={stats.totalCopies}
    />

    <Card
      title="Bookmarks"
      value={stats.totalBookmarks}
    />

  </div>

  {/* Charts */}
  <div className="grid md:grid-cols-2 gap-6">

    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">

      <h3 className="text-xl font-semibold mb-4">
        Copy Analytics
      </h3>

      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <LineChart
          data={stats.chartData}
        >
          <XAxis
            dataKey="name"
            stroke="#ffffff"
          />

          <YAxis stroke="#ffffff" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="copies"
            stroke="#c084fc"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>

    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">

      <h3 className="text-xl font-semibold mb-4">
        Prompt Growth
      </h3>

      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <BarChart
          data={stats.chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            stroke="#ffffff"
          />

          <YAxis stroke="#ffffff" />

          <Tooltip />

          <Bar
            dataKey="prompts"
            fill="#8b5cf6"
          />
        </BarChart>
      </ResponsiveContainer>

    </div>

  </div>

  {/* Recent Prompts */}
  <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">

    <h3 className="text-xl font-semibold mb-5">
      Recent Prompts
    </h3>

    {stats.recent.length === 0 ? (
      <p className="text-white/60">
        No prompts found.
      </p>
    ) : (
      <div className="space-y-4">
        {stats.recent.map((p) => (
          <div
            key={p._id}
            className="flex justify-between border-b border-white/10 pb-3"
          >
            <div>
              <h4 className="font-semibold">
                {p.title}
              </h4>

              <p className="text-sm text-white/60">
                {p.prompt?.slice(
                  0,
                  50
                )}
                ...
              </p>
            </div>

            <div className="text-sm text-white/60">
              {p.copyCount || 0} Copies
            </div>
          </div>
        ))}
      </div>
    )}

  </div>

</div>


);
}

function Card({ title, value }) {
return ( <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl"> <p className="text-white/70 text-sm">
{title} </p>

```
  <h2 className="mt-2 text-4xl font-black text-white">
    {value}
  </h2>
</div>

);
}
