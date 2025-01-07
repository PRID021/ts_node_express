import {
  Course,
  CourseCategory,
  CourseSubCategory,
} from "@models/course_category.model";
import { Featuring } from "@models/featuring.model";
import { Media } from "@models/media.model";
import fs from "fs/promises";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import {
  courseCategories,
  coursesDataFromCourseSubCategories,
  subCategoriesDataFromCourseCategories,
} from "./mock/courseData";
import { featuringDataFromMediaRecord } from "./mock/featuringData";
import { mediaData } from "./mock/mediaData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to load content from a markdown file
const loadMarkdownContent = async (filename: string): Promise<string> => {
  const filePath = path.join(__dirname, "../../posts", filename); // Adjust the path to match your project structure
  return await fs.readFile(filePath, "utf-8");
};

export const seedDatabase = async (sequelize: Sequelize) => {
  try {
    // Sync database to ensure tables are created
    await sequelize.sync({ force: false });
    console.log("Table schemes synced!");

    const mediaRecords = await Media.bulkCreate(mediaData, { returning: true });
    console.log("Media table record seeded!");
    // Seed Featuring table with mock data
    const featuringData = featuringDataFromMediaRecord(mediaRecords);
    await Featuring.bulkCreate(featuringData);
    console.log("Featuring table record seeded!");

    // Seed course category table with mock data
    const createdCourseCategories = await CourseCategory.bulkCreate(
      courseCategories,
      {
        returning: true,
      }
    );
    console.log("CourseCategories table record seeded!");
    // Seed course subcategory table with mock data
    const subCategoriesData = subCategoriesDataFromCourseCategories(
      createdCourseCategories
    );

    const createdSubCategories = await CourseSubCategory.bulkCreate(
      subCategoriesData,
      { returning: true }
    );
    console.log("SubCategories table record seeded!");

    const coursesData =
      coursesDataFromCourseSubCategories(createdSubCategories);

    await Course.bulkCreate(coursesData, { returning: false });

    console.log("Course table record seeded!");

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
