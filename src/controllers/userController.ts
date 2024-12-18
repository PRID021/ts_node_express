import { Request, Response } from "express";
import { create200Response, create500Response } from "@utils/commonResponses";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        create200Response({ res: res, message: `Welcome back ${user.name}.` })
    } catch (err) {
        create500Response(res)
    }
};
