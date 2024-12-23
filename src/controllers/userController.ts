import { common200001Reponse, unhandledErrorResponse } from "@res/commons";
import { Request, Response } from "express";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    res
      .status(200)
      .json(common200001Reponse<string>(`Welcome back ${user.name}.`));
  } catch (err) {
    res.status(999).json(unhandledErrorResponse);
  }
};
