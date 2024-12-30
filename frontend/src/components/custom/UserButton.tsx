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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserButton: React.FC = () => {
  const { user, clearUser } = useAuthStore();
  const authService = useAuthService();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService?.logout();
      clearUser();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" bg-card text-foreground hover:bg-button-hover flex items-center justify-between">
          {user.user_name || "User"}{" "}
          <Avatar className="w-8 h-8 p-0 ml-2 ">
            <AvatarImage src={user.avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
