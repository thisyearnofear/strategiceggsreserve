import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const PriceChartWidget = () => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <iframe
        height="100%"
        width="100%"
        id="geckoterminal-embed"
        title="GeckoTerminal $EGGS Chart"
        src="https://www.geckoterminal.com/base/pools/0xb04f0dec1006d62fef81090d605efa92d4b4af5c?embed=1&info=1&swaps=1&grayscale=0&light_chart=0&chart_type=price&resolution=15m"
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      />
    </div>
  );
};

const PumpSection = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <Card className="overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <h2 className="text-3xl font-bold">$EGGS Market Data</h2>
              <span className="animate-pulse text-2xl">🥚</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <p className="text-gray-600">
                A memecoin-powered Tamagotchi-style game on Base
              </p>
              <a
                href="https://warpcast.com/~/channel/eggsfun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <span>🎮</span>
                <span>Join EGGS.FUN</span>
              </a>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <PriceChartWidget />
            </div>

            <div className="mt-8 text-sm">
              <div className="flex items-start gap-2 rounded-lg border bg-yellow-50 border-yellow-200 p-4 text-yellow-700">
                <span className="font-bold">⚠️ Meme Token Warning:</span>
                <p>
                  $EGGS is a meme token created for entertainment purposes only. It has no intrinsic value and should not be considered a financial investment. Always DYOR and degen responsibly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PumpSection;
