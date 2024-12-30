"use client";

import { useEffect } from "react";
import { useUserService } from "@/hooks/use-userService";
import useAuthStore from "@/stores/authStore";

function AppInitializer() {
  const userService = useUserService();
  const initializeUser = useAuthStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser(() => {
      return userService?.profile() ?? Promise.resolve(null);
    });
  }, [userService, initializeUser]);

  return null;
}

export default AppInitializer;
