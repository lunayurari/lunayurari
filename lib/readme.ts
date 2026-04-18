import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import fs from "fs";
import path from "path";

export interface ReadmeData {
  name: string;
  quote: string;
  bio: string;
  greeting: string;
  socialLinks: { label: string; url: string; imageUrl: string }[];
  rawHtml: string;
}

export async function parseReadme(): Promise<ReadmeData> {
  const readmePath = path.join(process.cwd(), "README.md");
  const content = fs.readFileSync(readmePath, "utf-8");

  const processor = remark().use(remarkGfm).use(remarkHtml, { sanitize: false });
  const result = await processor.process(content);
  const rawHtml = result.toString();

  // Extract name from "## 你好，我是 ..." heading
  const nameMatch = content.match(/##\s+你好，我是\s+(.+)/);
  const name = nameMatch ? nameMatch[1].trim() : "悠然折耳";

  // Extract blockquote
  const quoteMatch = content.match(/>\s+(.+)/);
  const quote = quoteMatch ? quoteMatch[1].trim() : "";

  // Extract social links from badge markdown links
  const socialLinks: { label: string; url: string; imageUrl: string }[] = [];
  const badgeLinkRegex = /\[!\[([^\]]+)\]\(([^)]+)\)\]\(([^)]+)\)/g;
  let match;
  while ((match = badgeLinkRegex.exec(content)) !== null) {
    socialLinks.push({
      label: match[1],
      url: match[3],
      imageUrl: match[2],
    });
  }

  // Extract all regular paragraphs (non-heading, non-quote, non-badge lines)
  const lines = content.split("\n");
  const paragraphs: string[] = [];
  let afterQuote = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(">")) {
      afterQuote = true;
      continue;
    }
    if (
      afterQuote &&
      trimmed &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith("[") &&
      !trimmed.startsWith("!") &&
      !trimmed.startsWith("[![")
    ) {
      paragraphs.push(trimmed);
    }
  }

  const bio = paragraphs[0] ?? "";
  const greeting = paragraphs[1] ?? "";

  return { name, quote, bio, greeting, socialLinks, rawHtml };
}
