import { Post } from "@models/post";
import User from "@models/user";
import { Sequelize } from "sequelize";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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
    await sequelize.sync({ force: true });
    console.log("Database synced!");

    // Insert mock users
    const users = await User.bulkCreate([
      {
        name: "hoang.pham",
        email: "hoangduc.uit.dev@gmail.com",
        password: await User.hashPassword("Password123@@"),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: await User.hashPassword("securePass456"),
      },
    ]);

    console.log("Mock users created!");

    // Insert mock posts with markdown content
    const posts = await Post.bulkCreate([
      {
        authorId: users[0].id,
        title: "First Post by hoang.pham",
        content: await loadMarkdownContent("hoang_1.md"),
        imgUrl: "https://picsum.photos/200/300",
        shortDescription: "Eu pariatur qui ut esse irure."
      },
      {
        authorId: users[1].id,
        title: "First Post by Jane",
        content: await loadMarkdownContent("jane_1.md"),
        imgUrl: "https://picsum.photos/200/300",
        shortDescription: "Eu pariatur qui ut esse irure."
      },
    ]);

    console.log("Mock posts created!");
    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
