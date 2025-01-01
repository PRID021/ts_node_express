import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import { Featuring } from "@models/featuring.model";
import { Media } from "@models/media.model";

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
    console.log("Database synced!");

    // Seed Media table with mock data
    const mediaData = [
      {
        description: "Desktop image 1",
        source: "http://localhost:3000/app/uploads/long_panel.jpg",
        thumb: "http://localhost:3000/app/uploads/long_panel.jpg",
        title: "Desktop Media 1",
        contentType: "image",
      },
      {
        description: "Mobile image 1",
        source: "http://localhost:3000/app/uploads/short_panel.jpg",
        thumb: "http://localhost:3000/app/uploads/short_panel.jpg",
        title: "Mobile Media 1",
        contentType: "image",
      },
      {
        description: "Desktop image 2",
        source: "http://localhost:3000/app/uploads/long_panel.jpg",
        thumb: "http://localhost:3000/app/uploads/long_panel.jpg",
        title: "Desktop Media 2",
        contentType: "image",
      },

      {
        description: "Mobile image 2",
        source: "http://localhost:3000/app/uploads/short_panel.jpg",
        thumb: "http://localhost:3000/app/uploads/short_panel.jpg",
        title: "Mobile Media 2",
        contentType: "image",
      },
    ];

    const mediaRecords = await Media.bulkCreate(mediaData, { returning: true });
    console.log("Media table seeded!");
    // Map media IDs for featuring entries
    const [desktop1, mobile1, desktop2, mobile2] = mediaRecords.map(
      (media) => media.id
    );

    // Seed Featuring table with mock data
    const featuringData = [
      {
        desktopId: desktop1,
        mobileId: mobile1,
        imageAlt: "Alt text for first feature",
        heading: "Learning that gets you",
        text: "Skills for your present (and your future). Get started with us.",
      },
      {
        desktopId: desktop2,
        mobileId: mobile2,
        imageAlt: "Alt text for second feature",
        heading: "Skills that drive you forward",
        text: "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
      },
    ];

    await Featuring.bulkCreate(featuringData);

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
