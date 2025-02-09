"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

const EggReserveDashboard = () => {
  interface PriceData {
    date: string;
    price: number;
  }

  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/prices");
        const priceData = await response.json();
        setData(priceData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-lg">🥚 Loading egg-conomic data... 🥚</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch egg prices: {error}</AlertDescription>
      </Alert>
    );
  }

  const formatPrice = (value: ValueType) => `$${Number(value).toFixed(2)}`;
  const formatBillions = (value: number) => `$${value.toFixed(1)}B`;
  const formatTrillions = (value: number) => `$${(value / 1000).toFixed(2)}T`;

  // Calculate key metrics
  const currentPrice = data[data.length - 1]?.price || 0;
  const athPrice = Math.max(...data.map((d) => d.price));
  const athDate = data.find((d) => d.price === athPrice)?.date;
  const formattedAthDate = athDate
    ? new Date(athDate).toLocaleDateString()
    : "";

  // Strategic reserve calculations
  const hypotheticalReserveSize = 1000; // billion eggs
  const potentialValue = hypotheticalReserveSize * athPrice;
  const currentValue = hypotheticalReserveSize * currentPrice;
  const missedOpportunity = potentialValue - currentValue;

  // Fun calculations
  const usDebt = 34000; // US debt in billions
  const percentOfDebt = ((potentialValue / usDebt) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Dramatic ATH Banner */}
      <Alert className="bg-yellow-100 border-yellow-400 animate-pulse">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800 font-bold text-xl">
          🚨 STRATEGIC EGG RESERVE ALERT 🚨
        </AlertTitle>
        <AlertDescription className="text-yellow-700 text-lg">
          If the US had established a {hypotheticalReserveSize}B egg Strategic
          Reserve before {formattedAthDate}, it would be worth{" "}
          {formatTrillions(potentialValue)} at ATH prices! That's{" "}
          {percentOfDebt}% of the national debt!
        </AlertDescription>
      </Alert>

      {/* Main Chart */}
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#666" }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis
                  tick={{ fill: "#666" }}
                  tickFormatter={formatPrice}
                  label={{
                    value: "Price per Dozen Eggs",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [formatPrice(value), "Price per Dozen"]}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <ReferenceLine
                  y={athPrice}
                  stroke="#ff4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "🥚 ATH 🚀",
                    position: "right",
                    fill: "#ff4444",
                    fontSize: 14,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: "#2563eb", r: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-blue-50 transform hover:scale-105 transition-transform">
          <h3 className="font-bold text-xl mb-2">🥚 Current Egg Price</h3>
          <p className="text-3xl font-bold text-blue-600">
            {formatPrice(currentPrice)}
          </p>
          <p className="text-sm text-gray-600">per dozen</p>
        </Card>

        <Card className="p-6 bg-red-50 transform hover:scale-105 transition-transform">
          <h3 className="font-bold text-xl mb-2">📈 All-Time High</h3>
          <p className="text-3xl font-bold text-red-600">
            {formatPrice(athPrice)}
          </p>
          <p className="text-sm text-gray-600">{formattedAthDate}</p>
        </Card>

        <Card className="p-6 bg-green-50 transform hover:scale-105 transition-transform">
          <h3 className="font-bold text-xl mb-2">💰 Missed Gains</h3>
          <p className="text-3xl font-bold text-green-600">
            {formatTrillions(missedOpportunity)}
          </p>
          <p className="text-sm text-gray-600">at ATH prices</p>
        </Card>
      </div>

      {/* Government Finance Context */}
      <Card className="p-6 bg-purple-50">
        <h3 className="font-bold text-xl mb-4">🏦 Egg-conomic Context</h3>
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-semibold">
              Strategic Reserve Value at ATH:
            </span>{" "}
            {formatTrillions(potentialValue)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Current US National Debt:</span>{" "}
            {formatTrillions(usDebt * 1000)}
          </p>
          <p className="text-lg font-bold text-purple-600">
            A Strategic Egg Reserve could have paid off {percentOfDebt}% of the
            national debt!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default EggReserveDashboard;
