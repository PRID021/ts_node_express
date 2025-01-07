import { Featuring } from "../models/Featuring";
import { ServerResponse } from "../models/ServerResponse";

export interface FeaturingRepository {
  getFeaturings: () => Promise<ServerResponse<Featuring[], Error>>;
}
