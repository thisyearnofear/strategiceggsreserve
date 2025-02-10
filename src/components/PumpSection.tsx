import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";

const PRICE_CHART_ID = "price-chart-widget-container";

interface MoralisWidget {
  createMyWidget: (
    containerId: string,
    config: {
      autoSize: boolean;
      chainId: string;
      tokenAddress: string;
      defaultInterval: string;
      timeZone: string;
      theme: string;
      locale: string;
      backgroundColor: string;
      gridColor: string;
      textColor: string;
      candleUpColor: string;
      candleDownColor: string;
      hideLeftToolbar: boolean;
      hideTopToolbar: boolean;
      hideBottomToolbar: boolean;
    }
  ) => void;
}

declare global {
  interface Window {
    createMyWidget?: MoralisWidget["createMyWidget"];
  }
}

const PriceChartWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadWidget = () => {
      setTimeout(() => {
        if (typeof window.createMyWidget === "function") {
          window.createMyWidget(PRICE_CHART_ID, {
            autoSize: true,
            chainId: "solana",
            tokenAddress: "AUz3m3YA5EAtNm3vBqav4bB3azgvkvMQhsie5xMtUJPN",
            defaultInterval: "1D",
            timeZone:
              Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Etc/UTC",
            theme: "moralis",
            locale: "en",
            backgroundColor: "#071321",
            gridColor: "#0d2035",
            textColor: "#68738D",
            candleUpColor: "#4CE666",
            candleDownColor: "#E64C4C",
            hideLeftToolbar: false,
            hideTopToolbar: false,
            hideBottomToolbar: false,
          });
        } else {
          console.error("createMyWidget function is not defined.");
        }
      }, 500);
    };

    if (!document.getElementById("moralis-chart-widget")) {
      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = loadWidget;
      script.onerror = () => {
        console.error("Failed to load the chart widget script.");
      };
      document.body.appendChild(script);
    } else {
      loadWidget();
    }
  }, []);

  return (
    <div className="w-full h-[600px]">
      <div id={PRICE_CHART_ID} ref={containerRef} className="w-full h-full" />
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
              <h2 className="text-3xl font-bold">📈 Market Data</h2>
              <span className="animate-pulse text-2xl">🥚</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <p className="text-gray-600">
                Real-time egg market analysis powered by Moralis
              </p>
              <a
                href="https://pump.fun/coin/AUz3m3YA5EAtNm3vBqav4bB3azgvkvMQhsie5xMtUJPN?coins_sort=market_cap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <span>🎮</span>
                <span>View on pump.fun</span>
              </a>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <PriceChartWidget />
            </div>

            <div className="mt-8 text-sm">
              <Alert
                variant="default"
                className="bg-yellow-50 border-yellow-200"
              >
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  <span className="font-bold">⚠️ Meme Token Warning:</span> The
                  Jesus wif Egg ($Easter) token is a meme created for
                  entertainment purposes only. It has no intrinsic value and
                  should not be considered a financial investment. Always do
                  your own research and invest responsibly.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PumpSection;
