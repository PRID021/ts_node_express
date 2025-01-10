import { LearningStyle } from "../models/LearningStyle";
import { ServerResponse } from "../models/ServerResponse";

export interface LearningStylesRepository {
  getLearningStyles: () => Promise<ServerResponse<LearningStyle[], Error>>;
}
