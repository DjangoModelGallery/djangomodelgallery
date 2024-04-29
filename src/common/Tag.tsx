"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const tagColors = [
  { color: "#f0fdf4", hoverColor: "#d9f99d", textColor: "#15803d" },
  { color: "#f0fdfa", hoverColor: "#ccfbf1", textColor: "#0f766e" },
  { color: "#eff6ff", hoverColor: "#bfdbfe", textColor: "#1e40af" },
  { color: "#faf5ff", hoverColor: "#e9d5ff", textColor: "#6b21a8" },
  { color: "#fdf2f8", hoverColor: "#fbcfe8", textColor: "#9d174d" },
  { color: "#fef2f2", hoverColor: "#fecaca", textColor: "#991b1b" },
  { color: "#fffbeb", hoverColor: "#fef08a", textColor: "#854d0e" },
  { color: "#f7fee7", hoverColor: "#d9f99d", textColor: "#3f6212" },
  { color: "#ecfdf5", hoverColor: "#a7f3d0", textColor: "#065f46" },
  { color: "#f3e8ff", hoverColor: "#d8b4fe", textColor: "#5b21b6" },
];

export default function Tag({ tagName }: { tagName: string }) {
  const [color, setColor] = useState({
    color: "",
    hoverColor: "",
    textColor: "",
  });

  useEffect(() => {
    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
    setColor(randomColor);
  }, []);

  return (
    <Link
      href={`/posts?tag=${tagName}`}
      passHref
      replace
      style={{
        padding: "0.025rem 1rem",
        textUnderlineOffset: "0.1rem",
        borderRadius: "1rem",
        cursor: "pointer",

        color: color.textColor,
        backgroundColor: color.color,
        transition: "background-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = color.hoverColor;
        e.currentTarget.style.color = color.textColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color.color;
        e.currentTarget.style.color = color.textColor;
      }}
    >
      #{tagName}
    </Link>
  );
}
