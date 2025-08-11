import React from "react";
import Navbar from "../components/Navbar";

const StatCard: React.FC<{ title: string; value: string; sub?: string }> = ({
  title,
  value,
  sub,
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
  </div>
);

const Sidebar: React.FC = () => {
  const items = [
    { label: "Overview", emoji: "🏠" },
    { label: "Tasks", emoji: "✅" },
    { label: "Notes", emoji: "📝" },
    { label: "Schedule", emoji: "📅" },
    { label: "Resources", emoji: "📚" },
  ];

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col border-r border-gray-200 bg-white">
      <div className="px-4 py-4">
        <div className="text-xs font-semibold text-gray-500 uppercase">Menu</div>
      </div>
      <nav className="flex-1 px-2 pb-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <span className="text-base">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Today's Sessions" value="2" sub="+1 vs yesterday" />
            <StatCard title="Study Time" value="3h 45m" sub="Weekly avg" />
            <StatCard title="Tasks Due" value="4" sub="Next 7 days" />
            <StatCard title="Streak" value="7 days" />
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                <button className="text-sm text-blue-600 hover:underline">View all</button>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  { title: "Math Assignment", due: "Tomorrow" },
                  { title: "Chemistry Lab Report", due: "Fri" },
                  { title: "History Reading", due: "Sun" },
                ].map((t) => (
                  <li key={t.title} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                    <span className="text-gray-800">{t.title}</span>
                    <span className="text-xs rounded-md bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1">Due {t.due}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Quick Notes</h2>
              <textarea
                placeholder="Jot something down..."
                className="mt-4 h-48 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-3 flex justify-end">
                <button className="rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700">Save</button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
