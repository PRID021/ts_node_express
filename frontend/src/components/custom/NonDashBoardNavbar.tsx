"use client";

import { useTheme } from "@/providers/ThemeContext";
import React, { useState } from "react";

// Dummy language switch function (you can use a real internationalization library like `next-i18next` here)
const languageSwitch = (currentLanguage: string) => {
  return currentLanguage === "en" ? "es" : "en";
};

function NonDashBoardNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl">Logo</div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(languageSwitch(language))}
            className="text-white"
          >
            {language === "en" ? "ES" : "EN"}
          </button>

          <button onClick={toggleTheme} className="text-white">
            {theme === "light" ? "🌙 Dark" : "🌞 Light"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NonDashBoardNavbar;
