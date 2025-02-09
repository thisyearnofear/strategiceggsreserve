// src/app/api/prices/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const FRED_API_KEY = process.env.FRED_API_KEY;
  const series_id = 'APU0000708111';
  
  try {
    const response = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${FRED_API_KEY}&file_type=json&frequency=m`
    );
    const data = await response.json();
    
    const formattedData = data.observations
      .filter((obs: any) => obs.value !== '.')
      .map((obs: any) => ({
        date: obs.date,
        price: parseFloat(obs.value)
      }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}