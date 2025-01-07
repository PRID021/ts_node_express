import { ServerResponse } from "../models/ServerResponse";
import { User } from "../models/User";

export interface UserRepository {
  getProfile: () => Promise<ServerResponse<User, Error>>;
}
