import { Post } from "@models/post";
import { create200Response, create500Response } from "@utils/commonResponses";
import { Request, Response } from "express";

export const greeting = async (req: Request, res: Response): Promise<void> => {
  try {
    create200Response({ res: res, message: "Hi! Nice to meet you." });
  } catch (err) {
    create500Response(res);
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll();
    create200Response<Post[]>({
      res: res,
      message: "Get posts succesffuly",
      data: posts,
    });
  } catch (error) {
    create500Response(res);
  }
};
