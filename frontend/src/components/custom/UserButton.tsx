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

const UserButton: React.FC = () => {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Perform any additional logout logic if needed
      clearUser();
      router.push("/"); // Redirect to the homepage or a login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) return null; // Safeguard in case this is rendered without a logged-in user

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
