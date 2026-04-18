import { parseReadme } from "@/lib/readme";
import Link from "next/link";
import { Avatar } from "@/components/avatar";

export const dynamic = "force-static";

export default async function HomePage() {
  const { name, quote, bio, greeting } = await parseReadme();

  return (
    <main className="min-h-screen bg-white">
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
            <Link
              href="https://twitter.com/lunayurari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#666666] hover:text-[#171717] transition-colors"
            >
              X
            </Link>
            <Link
              href="https://bsky.app/profile/lunayurari.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#666666] hover:text-[#171717] transition-colors"
            >
              Bluesky
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="mx-auto max-w-[720px] px-6 pt-20 pb-16">
        {/* Avatar */}
        <div className="mb-8">
          <Avatar src="/avatar.jpg" alt={name} size={80} />
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
          <Link
            href="https://twitter.com/lunayurari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[9999px] text-[12px] font-medium transition-opacity hover:opacity-80"
            style={{
              background: "#171717",
              color: "#ffffff",
              fontFeatureSettings: '"liga"',
            }}
          >
            <XIcon />
            @lunayurari
          </Link>
          <Link
            href="https://bsky.app/profile/lunayurari.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[9999px] text-[12px] font-medium transition-opacity hover:opacity-80"
            style={{
              background: "#0f73ff",
              color: "#ffffff",
              fontFeatureSettings: '"liga"',
            }}
          >
            <BlueskyIcon />
            悠然折耳
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-[#ebebeb] mb-12" />

        {/* Additional README content */}
        {greeting && (
          <article>
            <p
              className="text-[16px] text-[#4d4d4d] leading-[1.8]"
              style={{ fontFeatureSettings: '"liga"' }}
            >
              {greeting}
            </p>
          </article>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb]">
        <div className="mx-auto max-w-[720px] px-6 py-8 flex items-center justify-between">
          <span className="text-[12px] text-[#808080]">
            © {new Date().getFullYear()} {name}
          </span>
          <span className="text-[12px] text-[#808080]">nya~</span>
        </div>
      </footer>
    </main>
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

function BlueskyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 600 530"
      fill="currentColor"
    >
      <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0173-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
    </svg>
  );
}

