import { Media } from "@models/media.model";
import { Request, Response } from "express";
import {
  common200001Response,
  unhandledErrorResponse,
} from "@utils/res/commons";
import { Featuring } from "@models/featuring.model";

export const getFeaturings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const featurings = await Featuring.findAll({
      include: [
        {
          model: Media,
          as: "desktopMedia", // Alias for the desktop media
          attributes: ["source"],
        },
        {
          model: Media,
          as: "mobileMedia", // Alias for the mobile media,
          attributes: ["source"],
        },
      ],
    });

    res.status(200).json(common200001Response(featurings));
  } catch (error) {
    console.error(error);
    res.status(999).json(unhandledErrorResponse);
  }
};
