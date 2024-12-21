import { Post } from "@models/post";
import User from "@models/user";
import { Sequelize } from "sequelize";

import { Media } from "@models/media";
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
        shortDescription: "Eu pariatur qui ut esse irure.",
        mediaContent: "img",
      },
      {
        authorId: users[1].id,
        title: "First Post by Jane",
        content: await loadMarkdownContent("jane_1.md"),
        imgUrl: "https://picsum.photos/200/300",
        shortDescription: "Eu pariatur qui ut esse irure.",
        mediaContent: "img",
      },
    ]);

    console.log("Mock posts created!");

    const medias = await Media.bulkCreate([
      {
        postId: posts[0].id,
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        source:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumb:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
        title: "Big Buck Bunny",
        contentType: "video",
      },
      {
        postId: posts[1].id,
        description: "The first Blender Open Movie from 2006",
        source:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumb:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
        title: "Elephant Dream",
        contentType: "video",
      },
    ]);

    console.log("Mock medias created!");

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
