"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface FeedItem {
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string;
  source: string;
}

const EggNewsSection = () => {
  const [news, setNews] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch("/api/rss-feeds");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch RSS feeds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
              Gathering fresh news...
            </div>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>🐔 Checking the coop...</p>
            <p>📰 Fetching egg updates...</p>
            <p>🌟 Finding golden content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {item.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.source}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <span>Read more</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EggNewsSection;
