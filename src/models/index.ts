import { Sequelize } from "sequelize";
import { createCourseTable } from "./course";
import { createMediaTable, Media } from "./media";
import { createPostTable, Post } from "./post";
import { createRefreshTokenTable } from "./refreshToken";
import { createUserTable } from "./user";

export const createTables = (sequelize: Sequelize) => {
  createUserTable(sequelize);
  createPostTable(sequelize);
  createRefreshTokenTable(sequelize);
  createMediaTable(sequelize);
  createCourseTable(sequelize);

  Post.hasMany(Media, {
    foreignKey: "postId",
    as: "media",
  });

  Media.belongsTo(Post, {
    foreignKey: "postId",
    as: "post",
  });
};
