"use client";

import { useState } from "react";
import EggReserveDashboard from "../components/EggReserveDashboard";
import AffiliateSection from "../components/AffiliateSection";
import SocialSection from "../components/SocialSection";
import PumpSection from "../components/PumpSection";

const tabs = [
  { id: "dashboard", label: "🥚 Egg Reserve", component: EggReserveDashboard },
  { id: "affiliate", label: "🏠 Chicken Coops", component: AffiliateSection },
  { id: "pump", label: "📈 Meme Markets", component: PumpSection },
  { id: "social", label: "📰 News Feed", component: SocialSection },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || EggReserveDashboard;

  return (
    <main className="min-h-screen">
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="scrollbar-none overflow-x-auto">
            <div className="flex min-w-full px-2 py-3 md:px-4 md:py-4 gap-2 md:justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-shrink-0 px-3 py-2 md:px-4 md:py-2 rounded-lg 
                    font-medium text-sm md:text-base whitespace-nowrap
                    transition-all duration-200 ease-in-out
                    ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md transform scale-105"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Section */}
      <div className="py-4 md:py-6">
        <ActiveComponent />
      </div>
    </main>
  );
}
