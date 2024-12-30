"use client";

import { useTheme } from "@/providers/ThemeContext";
import React from "react";
import { Button } from "../ui/button";
import SignUpButton from "./SignUpButton";
import { SignInButton } from "./SignInButton";
import { toast } from "@/hooks/use-toast";
import { useAuthService } from "@/hooks/use-authService";
import { useUserService } from "@/hooks/use-userService";
import useAuthStore from "@/stores/authStore";
import UserButton from "./UserButton";
import { Search } from "lucide-react";
import { SheetDemo } from "./NavSideBar";

function NonDashBoardNavbar() {
  const { user, setUser } = useAuthStore();

  const { theme, toggleTheme } = useTheme();

  const authService = useAuthService();
  const userService = useUserService();

  return (
    <div className="w-full p-4 bg-red-400">
      {/* Tablet and higher */}
      <div className=" justify-between items-center hidden sm:flex">
        <div className="text-white text-xl">Logo</div>

        <div className="flex items-center space-x-4">
          {!user && (
            <SignInButton
              onSubmit={async (data) => {
                if (!authService) return false;
                try {
                  await authService.signIn(data);
                  if (userService) {
                    const user = await userService.profile();
                    setUser(user);
                  }
                  return true;
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
          )}
          {!user && <SignUpButton />}

          {user && <UserButton />}

          <Button
            onClick={toggleTheme}
            className="bg-card text-foreground hover:bg-button-hover"
          >
            {theme === "light" ? "🌙" : "🌞"}
          </Button>
        </div>
      </div>
      {/* Mobile  */}

      <div className=" justify-between items-center flex sm:hidden">
        <SheetDemo />

        <h3 className="text-white text-xl">Logo</h3>

        <Button
          variant="ghost"
          aria-label="Search"
          className="flex items-center p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded"
        >
          <Search className="w-5 h-5" />
          <span className="ml-2 hidden sm:block">Search</span>
        </Button>
      </div>
    </div>
  );
}

export default NonDashBoardNavbar;
