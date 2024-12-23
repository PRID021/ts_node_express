import { Media } from "@models/media";
import { Post } from "@models/post";
import { Request, Response } from "express";
import { common200001Reponse, unhandledErrorResponse } from "@res/commons";

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Media,
          as: "media", // The alias defined in `Post.hasMany()`
        },
      ],
    });

    res.status(200).json(common200001Reponse<Post[]>(posts));
  } catch (error) {
    res.status(999).json(unhandledErrorResponse);
  }
};
