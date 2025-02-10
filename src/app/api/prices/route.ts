// src/app/api/prices/route.ts

import { NextResponse } from "next/server";

interface Observation {
  date: string;
  value: string;
}

export async function GET() {
  const FRED_API_KEY = process.env.FRED_API_KEY;
  const series_id = "APU0000708111";

  if (!FRED_API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${FRED_API_KEY}&file_type=json&frequency=m&sort_order=asc&observation_start=1980-01-01`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from FRED");
    }

    const data: { observations: Observation[] } = await response.json();

    const formattedData = data.observations
      .filter((obs) => obs.value !== ".")
      .map((obs) => ({
        date: obs.date,
        price: parseFloat(obs.value),
      }));

    // Add cache headers (4 hours cache, 8 hours stale-while-revalidate)
    return NextResponse.json(formattedData, {
      headers: {
        "Cache-Control": "public, s-maxage=14400, stale-while-revalidate=28800",
      },
    });
  } catch (error) {
    console.error("Error fetching egg prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
