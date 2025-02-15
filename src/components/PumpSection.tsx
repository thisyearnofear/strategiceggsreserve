import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set a minimum loading time of 5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const loadWidget = () => {
      setTimeout(() => {
        if (typeof window.createMyWidget === "function") {
          window.createMyWidget(PRICE_CHART_ID, {
            autoSize: true,
            chainId: "solana",
            tokenAddress: "DDUthBrLTJq8uNjLFYmf2dZBQEAkgXf9oDVVgnJrpump",
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
      document.body.appendChild(script);
    } else {
      loadWidget();
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px]">
      {/* The Moralis widget container */}
      <div id={PRICE_CHART_ID} ref={containerRef} className="w-full h-full" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#071321] bg-opacity-90 flex items-center justify-center z-50">
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
                Hatching market data...
              </div>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>🥚 Incubating the chart...</p>
              <p>📊 Counting chickens before they hatch...</p>
              <p>💹 Preparing egg-cellent analysis...</p>
            </div>
          </div>
        </div>
      )}
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
              <h2 className="text-3xl font-bold">📈 Tokens = Attention</h2>
              <span className="animate-pulse text-2xl">🥚</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <p className="text-gray-600">
                Real-time egg market analysis powered by Moralis
              </p>
              <a
                href="https://pump.fun/coin/DDUthBrLTJq8uNjLFYmf2dZBQEAkgXf9oDVVgnJrpump"
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
                  Strategic Egg Reserve ($SERVE) token is a meme created for
                  entertainment purposes only. It has no intrinsic value and
                  should not be considered a financial investment. Always do
                  your own research and degen responsibly.
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
