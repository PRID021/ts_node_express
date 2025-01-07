import { DataTypes, Model, Sequelize } from "sequelize";

export class CourseCategory extends Model {
  public id!: number;
  public title!: string;
}

export const initCourseCategory = (sequelize: Sequelize) => {
  CourseCategory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "course_categories",
      modelName: "CourseCategory",
    }
  );
};

export class CourseSubCategory extends Model {
  public id!: number;
  public course_category_id!: number;
  public title!: string;
  public description!: string;
}

export const initCourseSubCategory = (sequelize: Sequelize) => {
  CourseSubCategory.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      course_category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: CourseCategory,
          key: "id",
        },
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "course_sub_categories",
      modelName: "CourseSubCategory",
    }
  );
};

export class Course extends Model {
  public id!: number;
  public course_sub_category_id!: number;
  public course_img!: string;
  public title!: string;
  public teacher_name!: string;
  public course_star!: number;
  public student_number!: number;
  public price!: number;
}

export const initCourse = (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      course_sub_category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: CourseSubCategory,
          key: "id",
        },
        onDelete: "CASCADE", // Deletes courses when the subcategory is deleted
      },
      course_img: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      teacher_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      course_star: {
        type: DataTypes.FLOAT, // Allows for decimals (e.g., 4.7)
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
      student_number: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.FLOAT, // To accommodate prices with decimals
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      tableName: "courses",
      modelName: "Course",
    }
  );
};
