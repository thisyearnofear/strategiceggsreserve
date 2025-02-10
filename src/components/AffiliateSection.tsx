import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Calculator } from "lucide-react";

const AffiliateSection = () => {
  // Real data-driven calculations
  const currentEggPrice = 4.15; // Current price per dozen
  const eggsPerPersonYear = 280; // Average American consumption (Statista, 2024)
  const monthlyChickenCost = 69; // Monthly cost for 5 chickens
  const eggsPerChickenYear = 200; // Conservative estimate per chicken
  const flockSize = 5; // Standard flock size
  const yearsKept = 5; // Years of keeping chickens

  // Calculate total costs and savings
  const annualStoreEggCost = (eggsPerPersonYear / 12) * currentEggPrice;
  const annualChickenCost = monthlyChickenCost * 12;
  const annualEggProduction = (flockSize * eggsPerChickenYear) / 12; // In dozens
  const annualEggValue = annualEggProduction * currentEggPrice;
  const annualSavings = annualEggValue - annualChickenCost;
  const fiveYearSavings = annualSavings * yearsKept;

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Main Coop Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold mb-4">🏠 Chicken Coops</h2>
            <p className="text-xl mb-6">Texas-made, Clucking good</p>

            <div className="relative w-full h-[300px] mb-6 rounded-xl overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#f4ead5] to-[#e8d5b5] opacity-90" />

              {/* Centered image container */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-2xl mx-auto">
                  <Image
                    src="/rita.png"
                    alt="Luxury Chicken Coop"
                    fill
                    style={{ objectFit: "contain" }}
                    className="drop-shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Additional Coops Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {["/coop1.jpg", "/coop2.jpg", "/coop3.jpg"].map((src, index) => (
                <div
                  key={index}
                  className="relative h-[200px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={src}
                    alt={`Chicken Coop Style ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <a
              href="https://largechickencoops.com/store/?aff=50"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              🐔 Shop Premium Coops
            </a>

            {/* Updated Savings Calculator */}
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 mb-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Calculator className="h-6 w-6 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-800">
                  🥚 Egg-conomics 🐔
                </h3>
              </div>

              <div className="space-y-6 text-center">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 font-semibold">
                    Join the Strategic Egg Reserve Initiative! Each backyard
                    coop strengthens Americas egg independence.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Current Egg Market
                    </h4>
                    <ul className="space-y-3 text-left">
                      <li className="flex justify-between">
                        <span>Store Price:</span>
                        <span className="font-bold">
                          ${currentEggPrice}/dozen
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Average Consumption:</span>
                        <span className="font-bold">
                          {eggsPerPersonYear} eggs/year
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Annual Cost:</span>
                        <span className="font-bold text-red-600">
                          ${Math.round(annualStoreEggCost)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Backyard Flock
                    </h4>
                    <ul className="space-y-3 text-left">
                      <li className="flex justify-between">
                        <span>Monthly Cost:</span>
                        <span className="font-bold">${monthlyChickenCost}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Annual Production:</span>
                        <span className="font-bold">
                          {Math.round(annualEggProduction)} dozen
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Annual Value:</span>
                        <span className="font-bold text-green-600">
                          ${Math.round(annualEggValue)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-100 rounded-lg p-6 max-w-2xl mx-auto">
                  <h4 className="text-xl font-bold text-amber-900 mb-4">
                    🎯 Your 5-Year Savings:{" "}
                    <span className="text-2xl text-green-600">
                      ${Math.round(fiveYearSavings)}
                    </span>
                  </h4>
                  <p className="text-amber-800 text-sm">
                    That&apos;s no yolk! You&apos;ll save enough to buy a dozen
                    luxury coops! 🐣
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    Data Sources:
                    <a
                      href="https://www.statista.com/statistics/183678/per-capita-consumption-of-eggs-in-the-us-since-2000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      US Egg Consumption
                    </a>
                    <span className="mx-2">•</span>
                    <a
                      href="https://www.thehenhousecollection.com/blog/cost-to-raise-chickens/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Henhouse Collection Analysis
                    </a>
                  </p>
                  <p className="italic">
                    Calculations based on a flock of {flockSize} chickens
                    producing {eggsPerChickenYear} eggs each annually. Results
                    may vary based on feed costs, chicken breeds, and local
                    factors.
                  </p>
                </div>
              </div>
            </Card>

            <Alert className="bg-blue-50 border-blue-200 mb-8 max-w-3xl mx-auto">
              <InfoIcon className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <p className="mb-2">
                  Why did the chicken join a gym? To work on its egg-ercise
                  routine! 🏋️‍♀️
                </p>
                <p>
                  Speaking of health, how about fresh, organic eggs
                  daily...knowing exactly what the chickens ate, how
                  they&apos;re treated...whats (not) added to the eggs, clucking
                  yet?
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateSection;
