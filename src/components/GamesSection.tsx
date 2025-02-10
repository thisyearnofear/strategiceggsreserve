import { Card, CardContent } from "@/components/ui/card";

const GamesSection = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold mb-4">🎮 Egg Games</h2>
            <p className="text-xl mb-6 text-gray-600">
              Take a break from egg-conomics with some egg-cellent games!
            </p>

            <div className="grid gap-8">
              {/* Peckin Pixels Game */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Peckin Pixels</h3>
                <p className="text-gray-600">
                  Help your chicken collect eggs while avoiding obstacles!
                </p>
                <div className="flex justify-center">
                  <iframe
                    frameBorder="0"
                    src="https://itch.io/embed/426461"
                    width="552"
                    height="167"
                    title="Peckin Pixels"
                    className="rounded-lg shadow-lg"
                  >
                    <a href="https://wavingwalrus.itch.io/peckin-pixels">
                      Peckin&#039; Pixels by Waving Walrus Games
                    </a>
                  </iframe>
                </div>
              </div>

              {/* More games can be added here in the future */}
              <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  More egg-citing games coming soon! 🥚✨
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesSection;
