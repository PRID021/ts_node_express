import { ServerResponse } from "@/types";
import { User } from "../domain/models/User";

export const transformUserResponse = (response: ServerResponse<User>): User => {
  return response.data;
};
