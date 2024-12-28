import { ServerResponse } from "@/services/types";
import { User } from "../models/User";

export const transformUserResponse = (response: ServerResponse<User>): User => {
  return response.data;
};
