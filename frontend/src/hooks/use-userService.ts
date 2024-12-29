import { useEffect, useState } from "react";
import { container } from "@/di-container";
import { TYPES } from "@/types";
import { UserService } from "@/services/userService";

export const useUserService = () => {
  const [userService, setUserService] = useState<UserService | null>(null);

  useEffect(() => {
    const service = container.get<UserService>(TYPES.UserService);
    setUserService(service);
  }, []);

  return userService;
};
