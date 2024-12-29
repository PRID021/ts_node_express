import {
  common200001Response,
  unhandledErrorResponse,
} from "@utils/res/commons";
import { saveFile } from "@services/storage.service";
import { Request, Response } from "express";
import User from "@models/user.model";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, user_name, email } = req.user;

    console.log(req.user);

    const userData = await User.findOne({ where: { id, email, user_name } });
    if (!userData) {
      throw Error("User profile not found");
    }
    res.status(200).json(common200001Response<User>(userData));
  } catch (err) {
    console.error(err);
    res.status(999).json(unhandledErrorResponse);
  }
};

export const upFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded." });
      return;
    }

    // Save the file using the storage service
    const fileUrl = await saveFile(req.file);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      fileUrl, // URL or path to the uploaded file
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
