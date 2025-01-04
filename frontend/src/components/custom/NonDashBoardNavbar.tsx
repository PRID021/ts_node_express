"use client";

import { useTheme } from "@/providers/ThemeContext";
import React from "react";
import { Button } from "../ui/button";
import SignUpButton from "./SignUpButton";
import { SignInButton } from "./SignInButton";
import { toast } from "@/hooks/use-toast";
import { useAuthService } from "@/hooks/use-authService";
import useAuthStore from "@/stores/authStore";
import UserButton from "./UserButton";
import { Search } from "lucide-react";
import { NavSideBar } from "./NavSideBar";
import Image from "next/image";
import { AxiosError } from "axios";

function NonDashBoardNavbar() {
  const { user, getProfile } = useAuthStore();

  const { theme, toggleTheme } = useTheme();

  const authService = useAuthService();

  return (
    <div className="w-full p-4 bg-secondary shadow-lg overflow-hidden ">
      <div className=" justify-between items-center hidden sm:flex">
        <div className=" text-xl">
          <Image
            src="/logo.svg"
            alt="uLogo"
            className="h-6"
            width={40}
            height={40}
          />
        </div>

        <div className="flex items-center space-x-4">
          {!user && (
            <SignInButton
              onSubmit={async (data) => {
                if (!authService) return false;
                try {
                  await authService.signIn(data);
                  getProfile();

                  return true;
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "SignIn Failed",
                    description:
                      error instanceof AxiosError
                        ? error.response?.data.message
                        : "An unexpected error occurred.",
                  });
                  return false;
                }
              }}
            />
          )}
          {!user && <SignUpButton />}

          {user && <UserButton />}

          <Button onClick={toggleTheme} className="bg-card text-foreground ">
            {theme === "light" ? "🌙" : "🌞"}
          </Button>
        </div>
      </div>
      {/* Mobile  */}

      <div className=" justify-between items-center flex sm:hidden">
        <NavSideBar />

        <h3 className="text-white text-xl">Logo</h3>

        <Button
          variant="ghost"
          aria-label="Search"
          className="flex items-center p-2 rounded"
        >
          <Search className="w-5 h-5" />
          <span className="ml-2 hidden sm:block">Search</span>
        </Button>
      </div>
    </div>
  );
}

export default NonDashBoardNavbar;
