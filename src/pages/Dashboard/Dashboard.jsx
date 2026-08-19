import { useState, useEffect } from "react";
import { Beef, Milk, HeartHandshake, Syringe } from "lucide-react";
import HeroBanner from "../../components/HeroBanner";
import StatCard from "../../components/StatCard";
import MilkChart from "../../components/MilkChart";
import RecentAnimals from "../../components/RecentAnimals";
import VaccinationTable from "../../components/VaccinationTable";
import FeedCard from "../../components/FeedCard";
import MedicalTable from "../../components/MedicalTable";
import { getDashboardSummary } from "../../api/dashboard";

const emptySummary = {
  totalAnimals: 0, totalCows: 0, totalBuffaloes: 0,
  todaysMilk: 0, pregnant: 0, dueVaccinations: 0, feedStockPct: 0,
};

export default function Dashboard() {
  const [summary, setSummary] = useState(emptySummary);

  useEffect(() => {
    getDashboardSummary()
      .then((res) => setSummary({ ...emptySummary, ...res.data }))
      .catch((err) => console.error("Failed to load dashboard summary", err));
  }, []);

  return (
    <div>
      {/* HeroBanner and the StatCards below both read from the same
          summary object, so "Today's Milk" can never disagree with itself
          across the two widgets. */}
      <HeroBanner
        todaysMilk={`${summary.todaysMilk} L`}
        activeAnimals={String(summary.totalAnimals)}
        feedStockPct={`${summary.feedStockPct}%`}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 mt-6">
        <StatCard icon={Beef} label="Total Animals" value={summary.totalAnimals} color="green" />
        <StatCard icon={Beef} label="Total Cows" value={summary.totalCows} color="green" />
        <StatCard icon={Beef} label="Total Buffaloes" value={summary.totalBuffaloes} color="brown" />
        <StatCard icon={Milk} label="Today's Milk" value={`${summary.todaysMilk} L`} color="golden" />
        <StatCard icon={HeartHandshake} label="Pregnant" value={summary.pregnant} color="golden" />
        <StatCard icon={Syringe} label="Due Vaccinations" value={summary.dueVaccinations} color="brown" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <MilkChart />
        </div>
        <FeedCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentAnimals />
        <VaccinationTable />
      </div>
      <MedicalTable />
    </div>
  );
}
