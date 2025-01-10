import {
  Course,
  CourseCategory,
  CourseSubCategory,
} from "@models/course_category.model";
import { Featuring } from "@models/featuring.model";
import { LearningStyle } from "@models/learning_style.model";
import { Media } from "@models/media.model";
import {
  common200001Response,
  unhandledErrorResponse,
} from "@utils/res/commons";
import { Request, Response } from "express";

export const getFeaturings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const featurings = await Featuring.findAll({
      include: [
        {
          model: Media,
          as: "desktop_media", // Alias for the desktop media
          attributes: ["source"],
        },
        {
          model: Media,
          as: "mobile_media", // Alias for the mobile media,
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

export const getCourseModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courseCategories = await CourseCategory.findAll({
      include: [
        {
          model: CourseSubCategory,
          as: "sub_categories",
          include: [
            {
              model: Course,
              as: "courses",
            },
          ],
        },
      ],
    });

    console.log("courseCategories, ", courseCategories);
    res.status(200).json(common200001Response(courseCategories));
  } catch (error) {
    console.error(error);
    res.status(999).json(unhandledErrorResponse);
  }
};

export const getLearningStyles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const learningStyles = await LearningStyle.findAll({
      include: [
        {
          model: Media,
          as: "icon_media",
          attributes: ["source"],
        },
        {
          model: Media,
          as: "illus_media",
          attributes: ["source"],
        },
      ],
    });

    console.log("learningStyles, ", learningStyles);

    res.status(200).json(common200001Response(learningStyles));
  } catch (error) {
    console.error(error);
    res.status(999).json(unhandledErrorResponse);
  }
};
