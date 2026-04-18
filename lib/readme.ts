import fs from "fs";
import path from "path";

export interface ReadmeData {
  name: string;
  quote: string;
  bio: string;
  greeting: string;
}

const DEFAULTS: ReadmeData = {
  name: "悠然折耳",
  quote: "",
  bio: "",
  greeting: "",
};

export function parseReadme(): ReadmeData {
  let content: string;
  try {
    const readmePath = path.join(process.cwd(), "README.md");
    content = fs.readFileSync(readmePath, "utf-8");
  } catch (err) {
    console.error("[parseReadme] Failed to read README.md:", err);
    return DEFAULTS;
  }

  // Extract name from "## 你好，我是 ..." heading
  const nameMatch = content.match(/##\s+你好，我是\s+(.+)/);
  const name = nameMatch ? nameMatch[1].trim() : DEFAULTS.name;

  // Extract blockquote
  const quoteMatch = content.match(/>\s+(.+)/);
  const quote = quoteMatch ? quoteMatch[1].trim() : "";

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
      !trimmed.startsWith("[")
    ) {
      paragraphs.push(trimmed);
    }
  }

  const bio = paragraphs[0] ?? "";
  const greeting = paragraphs[1] ?? "";

  return { name, quote, bio, greeting };
}
