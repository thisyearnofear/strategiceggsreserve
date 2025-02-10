import { NextResponse } from "next/server";
import Parser from "rss-parser";

type CustomFeedItem = Parser.Item & {
  media?: {
    $: {
      url: string;
    };
  };
  contentEncoded?: string;
  contentSnippet?: string;
  summary?: string;
};

interface ProcessedFeedItem {
  title: string;
  link: string;
  date: string;
  description: string;
  image?: string;
  source: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

const FEEDS = [
  {
    url: "https://www.thehappychickencoop.com/blog/feed/",
    source: "The Happy Chicken Coop",
  },
  {
    url: "https://www.stdavids-poultryteam.co.uk/news/feed/",
    source: "St David's Poultry Team",
  },
  {
    url: "https://www.fresheggsdaily.blog/feeds/posts/default?alt=rss",
    source: "Fresh Eggs Daily",
  },
  {
    url: "https://www.mypetchicken.com/blogs/our-blog.atom",
    source: "My Pet Chicken",
  },
];

export async function GET() {
  try {
    const feedPromises = FEEDS.map(async ({ url, source }) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.map((item: CustomFeedItem) => {
          // Extract image from content if available
          let image: string | undefined = undefined;
          if (item.media?.$.url) {
            image = item.media.$.url;
          } else if (item.contentEncoded) {
            const imgMatch = item.contentEncoded.match(
              /<img[^>]+src="([^">]+)"/
            );
            if (imgMatch) image = imgMatch[1];
          }

          return {
            title: item.title ?? "Untitled",
            link: item.link ?? "#",
            date: item.pubDate || item.isoDate || new Date().toISOString(),
            description: item.contentSnippet || item.summary || "",
            image,
            source,
          } as ProcessedFeedItem;
        });
      } catch (error) {
        console.error(`Error fetching feed ${url}:`, error);
        return [];
      }
    });

    const allFeeds = await Promise.all(feedPromises);
    const combinedFeeds = allFeeds
      .flat()
      .sort(
        (a: ProcessedFeedItem, b: ProcessedFeedItem) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 10); // Get latest 10 items

    return NextResponse.json(combinedFeeds);
  } catch (error) {
    console.error("Error processing feeds:", error);
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}
