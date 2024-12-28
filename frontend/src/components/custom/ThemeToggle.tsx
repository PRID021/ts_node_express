"use client";

import { useTheme } from "@/providers/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full"
      onClick={toggleTheme}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
