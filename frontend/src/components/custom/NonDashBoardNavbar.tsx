"use client";

import { useTheme } from "@/providers/ThemeContext";
import React, { useState } from "react";
import { Button } from "../ui/button";
import SignUpButton from "./SignUpButton";
import { SignInButton } from "./SignInButton";
import { toast } from "@/hooks/use-toast";

const languageSwitch = (currentLanguage: string) => {
  return currentLanguage === "en" ? "es" : "en";
};

function NonDashBoardNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("en");

  const handleSubmit = async (data: {
    user_name: string;
    password: string;
  }): Promise<boolean> => {
    try {
      // Simulate an async operation (e.g., sending data to an API)
      toast({
        title: "Registration Successful!",
        description: JSON.stringify(data),
      });

      // Simulate a delay or async operation here
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Mock 3-second delay

      // If everything is successful, return true
      return true;
    } catch (error) {
      // In case of an error, return false
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
      return false; // Indicate failure
    }
  };
  return (
    <div className="w-full p-4 bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl">Logo</div>

        <div className="flex items-center space-x-4">
          <SignInButton
            onSubmit={async (data) => {
              return await handleSubmit(data);
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
