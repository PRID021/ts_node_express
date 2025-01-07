import { Sequelize } from "sequelize";

import { createMediaTable, Media } from "./media.model";

import {
  Course,
  CourseCategory,
  CourseSubCategory,
  initCourse,
  initCourseCategory,
  initCourseSubCategory,
} from "./course_category.model";
import { Featuring, initFeaturingModel } from "./featuring.model";
import { createRefreshTokenTable } from "./refresh_token.model";
import { createUserTable } from "./user.model";
import { createUserAddressTable } from "./user_address.model";

export const createTables = (sequelize: Sequelize) => {
  createUserTable(sequelize);
  createUserAddressTable(sequelize);
  createRefreshTokenTable(sequelize);
  createMediaTable(sequelize);

  /// Course Module
  initCourseCategory(sequelize);
  initCourseSubCategory(sequelize);
  initCourse(sequelize);

  initFeaturingModel(sequelize);

  associateModels();
};

export const associateModels = () => {
  // CourseCategory -> CourseSubCategory
  CourseCategory.hasMany(CourseSubCategory, {
    foreignKey: "course_category_id",
    as: "sub_categories",
  });
  CourseSubCategory.belongsTo(CourseCategory, {
    foreignKey: "course_category_id",
    as: "category",
  });

  // CourseSubCategory -> Course
  CourseSubCategory.hasMany(Course, {
    foreignKey: "course_sub_category_id",
    as: "courses",
  });
  Course.belongsTo(CourseSubCategory, {
    foreignKey: "course_sub_category_id",
    as: "sub_category",
  });

  // Featuring -> Media
  Featuring.belongsTo(Media, { as: "desktop_media", foreignKey: "desktop_id" });
  Featuring.belongsTo(Media, { as: "mobile_media", foreignKey: "mobile_id" });

  // Media -> Featuring
  Media.hasMany(Featuring, {
    foreignKey: "desktop_id",
    as: "desktop_features",
  });
  Media.hasMany(Featuring, { foreignKey: "mobile_id", as: "mobile_features" });
};
