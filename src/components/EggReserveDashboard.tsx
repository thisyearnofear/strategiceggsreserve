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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const US_DEBT_TRILLIONS = 34; // US debt in trillions
const TRILLION = 1000000000000; // 1 trillion

const EggReserveDashboard = () => {
  interface PriceData {
    date: string;
    price: number;
  }

  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reserveStartDate, setReserveStartDate] = useState<string>("");
  const [reserveMetrics, setReserveMetrics] = useState<{
    price: number;
    value: number;
    debtPercentage: number;
    startPrice: number;
    currentPrice: number;
    returnSinceStart: number;
  }>({
    price: 0,
    value: 0,
    debtPercentage: 0,
    startPrice: 0,
    currentPrice: 0,
    returnSinceStart: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eggResponse = await fetch("/api/prices");
        const eggData = await eggResponse.json();
        setData(eggData);
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

  useEffect(() => {
    if (data.length > 0) {
      // Set initial start date if not set
      if (!reserveStartDate) {
        setReserveStartDate(data[0].date);
      }

      // Calculate metrics based on current start date
      const startIndex = data.findIndex((d) => d.date === reserveStartDate);
      if (startIndex !== -1) {
        // Get start price and current price
        const startPrice = data[startIndex].price;
        const currentPrice = data[data.length - 1].price;
        const returnSinceStart =
          ((currentPrice - startPrice) / startPrice) * 100;

        // Calculate how many dozens of eggs we could buy at start date
        // hypotheticalReserveSize is in billions, convert to dozens
        const initialInvestment = hypotheticalReserveSize * 1000000000; // Convert billions to actual number
        const dozensOfEggsPurchased = initialInvestment / (startPrice * 12); // Divide by 12 to convert eggs to dozens

        // Calculate current value using today's price
        const currentValue = dozensOfEggsPurchased * currentPrice * 12; // Multiply by 12 to convert dozens back to individual eggs
        const debtPercentage =
          (currentValue / (US_DEBT_TRILLIONS * TRILLION)) * 100;

        setReserveMetrics({
          price: currentPrice,
          value: currentValue,
          debtPercentage: debtPercentage,
          startPrice: startPrice,
          currentPrice: currentPrice,
          returnSinceStart: returnSinceStart,
        });

        // Debug logging
        console.log(`Start Date: ${reserveStartDate}`);
        console.log(`Start Price: $${startPrice.toFixed(2)}`);
        console.log(`Current Price: $${currentPrice.toFixed(2)}`);
        console.log(
          `Dozens of Eggs Purchased: ${dozensOfEggsPurchased.toFixed(0)}`
        );
        console.log(`Current Value: $${currentValue.toFixed(2)}`);
        console.log(`Debt %: ${debtPercentage.toFixed(2)}%`);
      }
    }
  }, [data, reserveStartDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-bounce w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-full bg-yellow-100 border-4 border-yellow-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  🥚
                </div>
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-yellow-600">
              Cracking the numbers...
            </div>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>🍳 Scrambling the data...</p>
            <p>🐔 Consulting the chickens...</p>
            <p>📊 Calculating egg-conomics...</p>
          </div>
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

  const formatPrice = (value: ValueType) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  const formatTrillions = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  // Calculate returns
  const calculateReturn = (prices: number[]) => {
    if (prices.length < 2) return 0;
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    return ((lastPrice - firstPrice) / firstPrice) * 100;
  };

  const eggReturn = calculateReturn(data.map((d) => d.price));

  // Fun investment quotes with asset comparisons
  const getComparativeQuote = () => {
    const quotes = [
      `While gold shines and oil flows, eggs have returned ${eggReturn.toFixed(
        1
      )}% since ${new Date(data[0]?.date).toLocaleDateString()}! 🥚📈`,
      "Gold bugs and oil barons step aside - the real money is in egg futures! 🐔",
      "Forget black gold, we&apos;re into white gold... egg whites that is! 🍳",
      "Breaking: Eggs outperforming traditional commodities in taste AND returns! 🏆",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  // Strategic reserve calculations
  const hypotheticalReserveSize = 1000; // billion eggs

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Dramatic ATH Banner with Date Selector */}
      <Alert className="bg-yellow-100 border-yellow-400">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <AlertTitle className="text-yellow-800 font-bold text-xl">
              🚨 STRATEGIC EGG RESERVE ALERT 🚨
            </AlertTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-yellow-700">Start Date:</span>
              <Select
                value={reserveStartDate}
                onValueChange={setReserveStartDate}
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  {data
                    .map((d) => (
                      <SelectItem key={d.date} value={d.date}>
                        {new Date(d.date).toLocaleDateString()}
                      </SelectItem>
                    ))
                    .filter((_, i) => i % 30 === 0)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDescription className="text-yellow-700 text-lg">
            If the US had established a {hypotheticalReserveSize}B egg Strategic
            Reserve on {new Date(reserveStartDate).toLocaleDateString()} at $
            {reserveMetrics.startPrice.toFixed(2)}/dozen, it would be worth{" "}
            {formatTrillions(reserveMetrics.value)} today at $
            {reserveMetrics.currentPrice.toFixed(2)}/dozen! That&apos;s{" "}
            {reserveMetrics.debtPercentage.toFixed(1)}% of the{" "}
            <a
              href="https://usdebtclock.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-900"
            >
              national debt
            </a>{" "}
            (${US_DEBT_TRILLIONS}T)!
          </AlertDescription>
        </div>
      </Alert>

      {/* Main Chart */}
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, left: 60, bottom: 20 }}
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
                    offset: -45,
                    style: { textAnchor: "middle", fill: "#666" },
                  }}
                />
                <Tooltip
                  formatter={(value) => [formatPrice(value), "Price per Dozen"]}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <ReferenceLine
                  y={reserveMetrics.price}
                  stroke="#ff4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "🥚 ATH 🚀",
                    position: "insideRight",
                    fill: "#ff4444",
                    fontSize: 14,
                    offset: -20,
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
        <Card className="p-6 bg-blue-50 transform hover:scale-105 transition-transform duration-300 hover:rotate-1">
          <div className="relative">
            <span className="absolute -top-2 -right-2 text-2xl animate-pulse">
              🥚
            </span>
            <h3 className="font-bold text-xl mb-2">Current Egg Price</h3>
            <p className="text-3xl font-bold text-blue-600">
              {formatPrice(reserveMetrics.currentPrice)}
            </p>
            <p className="text-sm text-gray-600">per dozen</p>
          </div>
        </Card>

        <Card className="p-6 bg-red-50 transform hover:scale-105 transition-transform duration-300 hover:-rotate-1">
          <div className="relative">
            <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
              🐔
            </span>
            <h3 className="font-bold text-xl mb-2">All-Time High</h3>
            <p className="text-3xl font-bold text-red-600">
              {formatPrice(reserveMetrics.price)}
            </p>
            <p className="text-sm text-gray-600">
              since {new Date(reserveStartDate).toLocaleDateString()}
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-green-50 transform hover:scale-105 transition-transform duration-300 hover:rotate-1">
          <div className="relative">
            <span className="absolute -top-2 -right-2 text-2xl animate-pulse">
              💰
            </span>
            <h3 className="font-bold text-xl mb-2">Return Since Start</h3>
            <p className="text-3xl font-bold text-green-600">
              {reserveMetrics.returnSinceStart.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">
              since {new Date(reserveStartDate).toLocaleDateString()}
            </p>
          </div>
        </Card>
      </div>

      {/* Government Finance Context */}
      <Card className="p-6 bg-purple-50 transform hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
            🏦
          </span>
          <h3 className="font-bold text-xl mb-4">Egg-conomic Context</h3>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">
                Strategic Reserve Value at ATH:
              </span>{" "}
              {formatTrillions(reserveMetrics.value)}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Current US National Debt:</span> $
              {US_DEBT_TRILLIONS}T
            </p>
            <p className="text-lg font-bold text-purple-600 animate-pulse">
              A Strategic Egg Reserve could have paid off{" "}
              {reserveMetrics.debtPercentage.toFixed(1)}% of the national debt!
              🤯
            </p>
          </div>
        </div>
      </Card>

      {/* Compact Footer with Data Sources and Market Wisdom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-sm text-gray-600">
        <div>
          <h4 className="font-semibold mb-2">Data Sources</h4>
          <ul className="space-y-1">
            <li>• USDA Weekly Retail Shell Egg Prices</li>
            <li>
              •{" "}
              <a
                href="https://usdebtclock.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                US Debt Clock
              </a>
            </li>
          </ul>
          <p className="mt-2 italic">
            Data updated daily from{" "}
            {new Date(data[0]?.date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">🤔 Market Wisdom</h4>
          <p className="italic">{getComparativeQuote()}</p>
        </div>
      </div>
    </div>
  );
};

export default EggReserveDashboard;
