"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useAuthService } from "@/hooks/use-authService";

const UserButton: React.FC = () => {
  const { user, clearUser } = useAuthStore();
  const authService = useAuthService();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      clearUser(() => {
        authService?.delUserToken();
      });
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) return null; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-card text-foreground">
          {user.user_name || "User"}{" "}
          {/* Replace with user-specific display name */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card text-foreground">
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
