import { Request, Response } from "express";
import { sequelize } from '@settings/database';
import { create200Response, create500Response } from "@utils/commonResponses";

export const greeting = async (req: Request, res: Response): Promise<void> => {
    try {
        await sequelize.authenticate();
        create200Response({ res: res, message: "Hi! Nice to meet you." })
    } catch (err) {
        create500Response(res)
    }
};
