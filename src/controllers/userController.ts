import { common200001Reponse, unhandledErrorResponse } from "@res/commons";
import { saveFile } from "@services/storageService";
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
