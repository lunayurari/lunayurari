import { parseReadme } from "@/lib/readme";
import { getBlueskyPosts, type BlueskyPost } from "@/lib/bluesky";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { CurrentYear } from "@/components/current-year";
import socialData from "@/data/social.json";

export const revalidate = 3600;

type SocialEntry = (typeof socialData.links)[number];

function getSocialStyle(entry: SocialEntry): {
  bg: string;
  icon: React.ReactNode;
  display: string;
} {
  switch (entry.platform) {
    case "x":
      return { bg: "#171717", icon: <XIcon />, display: entry.username };
    case "bluesky":
      return { bg: "#0f73ff", icon: <BlueskyIcon />, display: entry.username };
    case "github":
      return { bg: "#24292f", icon: <GitHubIcon />, display: entry.username };
    default:
      return { bg: "#171717", icon: null, display: entry.username };
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function HomePage() {
  const { name, quote, bio, greeting } = parseReadme();
  const posts = await getBlueskyPosts("lunayurari.bsky.social", 5);
  const socialLinks = socialData.links;

  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* Top nav bar */}
      <nav
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm"
        style={{ boxShadow: "rgba(0,0,0,0.08) 0px 0px 0px 1px" }}
      >
        <div className="mx-auto max-w-[720px] px-6 py-4 flex items-center justify-between">
          <span
            className="text-[14px] font-semibold text-[#171717] tracking-[-0.32px]"
            style={{ fontFeatureSettings: '"liga"' }}
          >
            {name}
          </span>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-[#666666] hover:text-[#171717] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1">
        <section className="mx-auto max-w-[720px] px-6 pt-20 pb-16">
          {/* Avatar */}
          <div className="mb-8">
            <Avatar src="/avatar.png" alt={name} size={80} />
          </div>

          {/* Name heading */}
          <h1
            className="text-[40px] font-semibold text-[#171717] leading-[1.2] mb-4"
            style={{
              letterSpacing: "-2.4px",
              fontFeatureSettings: '"liga"',
            }}
          >
            {name}
          </h1>

          {/* Quote */}
          {quote && (
            <blockquote className="mb-6 pl-4 border-l-2 border-[#ebebeb]">
              <p
                className="text-[16px] text-[#4d4d4d] leading-[1.8] italic"
                style={{ fontFeatureSettings: '"liga"' }}
              >
                {quote}
              </p>
            </blockquote>
          )}

          {/* Bio */}
          {bio && (
            <p
              className="text-[16px] text-[#4d4d4d] leading-[1.8] mb-8"
              style={{ fontFeatureSettings: '"liga"' }}
            >
              {bio}
            </p>
          )}

          {/* Social badges */}
          <div className="flex flex-wrap gap-2 mb-12">
            {socialLinks.map((link) => {
              const { bg, icon, display } = getSocialStyle(link);
              return (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[9999px] text-[12px] font-medium transition-opacity hover:opacity-80"
                  style={{
                    background: bg,
                    color: "#ffffff",
                    fontFeatureSettings: '"liga"',
                  }}
                >
                  {icon}
                  {display}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-[#ebebeb] mb-12" />

          {/* Additional README content */}
          {greeting && (
            <article className="mb-12">
              <p
                className="text-[16px] text-[#4d4d4d] leading-[1.8]"
                style={{ fontFeatureSettings: '"liga"' }}
              >
                {greeting}
              </p>
            </article>
          )}

          {/* Bluesky posts */}
          {posts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BlueskyIcon color="#0f73ff" size={14} />
                <h2 className="text-[13px] font-semibold text-[#171717] tracking-[-0.16px]">
                  最近发帖
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {posts.map((post) => (
                  <PostCard key={post.uri} post={post} handle="lunayurari.bsky.social" />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb]">
        <div className="mx-auto max-w-[720px] px-6 py-8 flex items-center justify-between">
          <span className="text-[12px] text-[#808080]">
            © <CurrentYear /> {name}
          </span>
          <span className="text-[12px] text-[#808080]">nya~</span>
        </div>
      </footer>
    </main>
  );
}

function PostCard({ post, handle }: { post: BlueskyPost; handle: string }) {
  return (
    <a
      href={post.webUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-[#ebebeb] bg-white p-4 hover:bg-[#fafafa] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <BlueskyIcon color="#0f73ff" size={13} />
          <span className="text-[13px] font-medium text-[#171717]">
            {handle}
          </span>
        </div>
        <span className="text-[12px] text-[#aaaaaa]">
          {formatDate(post.createdAt)}
        </span>
      </div>

      {/* Post text */}
      <p className="text-[14px] text-[#171717] leading-[1.65] mb-3 whitespace-pre-wrap break-words">
        {post.text}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-5 text-[12px] text-[#aaaaaa]">
        <span className="inline-flex items-center gap-1">
          <ReplyIcon />
          {post.replyCount}
        </span>
        <span className="inline-flex items-center gap-1">
          <RepostIcon />
          {post.repostCount}
        </span>
        <span className="inline-flex items-center gap-1">
          <LikeIcon />
          {post.likeCount}
        </span>
      </div>
    </a>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function BlueskyIcon({
  size = 12,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 600 530"
      fill={color}
    >
      <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0173-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function RepostIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

