import { Request, Response } from "express";
import { create200Response, create500Response } from "@utils/commonResponses";

export const greeting = async (req: Request, res: Response): Promise<void> => {
    try {
        create200Response({ res: res, message: "Hi! Nice to meet you." })
    } catch (err) {
        create500Response(res)
    }
};
