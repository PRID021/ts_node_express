import { useEffect, useState } from "react";
import { container } from "@/di-container";
import { AuthService } from "@/services/auth/authService";
import { TYPES } from "@/types";

export const useAuthService = () => {
  const [authService, setAuthService] = useState<AuthService | null>(null);

  useEffect(() => {
    // Resolve the AuthService instance from the container
    const service = container.get<AuthService>(TYPES.AuthService);
    setAuthService(service);
  }, []);

  return authService;
};
