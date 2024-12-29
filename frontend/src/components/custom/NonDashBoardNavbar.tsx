"use client";

import { useTheme } from "@/providers/ThemeContext";
import React, { useState } from "react";
import { Button } from "../ui/button";
import SignUpButton from "./SignUpButton";
import { SignInButton } from "./SignInButton";
import { toast } from "@/hooks/use-toast";
import { useAuthService } from "@/hooks/use-authService";

const languageSwitch = (currentLanguage: string) => {
  return currentLanguage === "en" ? "es" : "en";
};

function NonDashBoardNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  const authService = useAuthService();

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl">Logo</div>

        <div className="flex items-center space-x-4">
          <SignInButton
            onSubmit={async (data) => {
              if (!authService) return false;
              try {
                const userToken = await authService.signIn(data);
                return userToken !== null;
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "SignIn Failed",
                  description:
                    error instanceof Error
                      ? error.message
                      : "An unexpected error occurred.",
                });
                return false;
              }
            }}
          />
          <SignUpButton />
          <Button
            onClick={() => setLanguage(languageSwitch(language))}
            className="bg-card text-foreground"
          >
            {language === "en" ? "ES" : "EN"}
          </Button>

          {/* Theme Toggle Button */}
          <Button onClick={toggleTheme} className="bg-card text-foreground">
            {theme === "light" ? "🌙" : "🌞"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NonDashBoardNavbar;
