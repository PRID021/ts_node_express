import { Post } from "@models/post";
import User from "@models/user";
import { Sequelize } from "sequelize";

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
        password: await User.hashPassword("Passsword123@@"),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: await User.hashPassword("securePass456"),
      },
    ]);

    console.log("Mock users created!");

    // Insert mock posts
    const posts = await Post.bulkCreate([
      {
        authorId: users[0].id,
        title: "First Post by hoang.pham",
        content: "This is the content of hoang's first post.",
      },
      {
        authorId: users[1].id,
        title: "First Post by Jane",
        content: "This is the content of Jane's first post.",
      },
    ]);

    console.log("Mock posts created!");
    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
