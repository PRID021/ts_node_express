"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";

function AppInitializer() {
  const getProfile = useAuthStore((state) => state.getProfile);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return null;
}

export default AppInitializer;
