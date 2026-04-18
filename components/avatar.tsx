"use client";

import { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export function Avatar({ src, alt, size = 80 }: AvatarProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="rounded-full bg-[#fafafa] flex items-center justify-center"
        style={{
          width: size,
          height: size,
          boxShadow: "rgb(235,235,235) 0px 0px 0px 1px",
        }}
        aria-label={alt}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size * 0.45}
          height={size * 0.45}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ebebeb"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="rounded-full overflow-hidden bg-[#fafafa]"
      style={{
        width: size,
        height: size,
        boxShadow: "rgb(235,235,235) 0px 0px 0px 1px",
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}
