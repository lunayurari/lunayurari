export interface BlueskyPost {
  uri: string;
  text: string;
  createdAt: string;
  likeCount: number;
  replyCount: number;
  repostCount: number;
  webUrl: string;
}

interface BskyRecord {
  $type: string;
  text: string;
  createdAt: string;
  reply?: unknown;
}

interface BskyFeedItem {
  post: {
    uri: string;
    record: BskyRecord;
    likeCount?: number;
    replyCount?: number;
    repostCount?: number;
  };
  reason?: { $type: string };
}

interface BskyFeedResponse {
  feed: BskyFeedItem[];
}

export async function getBlueskyPosts(
  handle: string,
  limit = 5
): Promise<BlueskyPost[]> {
  try {
    const res = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${encodeURIComponent(handle)}&limit=${limit * 3}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const data = (await res.json()) as BskyFeedResponse;

    return data.feed
      .filter(
        (item) =>
          !item.reason &&
          item.post.record.$type === "app.bsky.feed.post" &&
          !item.post.record.reply
      )
      .slice(0, limit)
      .map((item) => {
        const rkey = item.post.uri.split("/").at(-1) ?? "";
        return {
          uri: item.post.uri,
          text: item.post.record.text,
          createdAt: item.post.record.createdAt,
          likeCount: item.post.likeCount ?? 0,
          replyCount: item.post.replyCount ?? 0,
          repostCount: item.post.repostCount ?? 0,
          webUrl: `https://bsky.app/profile/${handle}/post/${rkey}`,
        };
      });
  } catch (err) {
    console.error("[getBlueskyPosts] Failed to fetch Bluesky posts:", err);
    return [];
  }
}
