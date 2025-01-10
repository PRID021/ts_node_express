import {
  CourseCategory,
  CourseSubCategory,
} from "@models/course_category.model";

export const courseCategories = [{ title: "Development" }, { title: "Design" }];

export const subCategoriesDataFromCourseCategories = (
  createdCourseCategories: CourseCategory[]
) => {
  if (createdCourseCategories.length < 2) {
    throw new Error("Insufficient course categories provided.");
  }

  const [developmentId, designId] = createdCourseCategories.map(
    (item) => item.id
  );

  const subCategories = [
    {
      category: "Development",
      items: [
        {
          title: "React Development",
          description:
            "Master the skills needed to build websites and web applications.",
        },
        {
          title: "Mobile Development",
          description: "Develop cutting-edge mobile apps for iOS and Android.",
        },
        {
          title: "Data Science",
          description: "Analyze data and build predictive models with Python.",
        },
      ],
    },
    {
      category: "Design",
      items: [
        {
          title: "Graphic Design",
          description: "Learn to create stunning designs using modern tools.",
        },
        {
          title: "UI/UX Design",
          description: "Create user-friendly and engaging digital experiences.",
        },
      ],
    },
  ];

  return subCategories.flatMap(({ category, items }) =>
    items.map((item) => ({
      ...item,
      course_category_id: category === "Development" ? developmentId : designId,
    }))
  );
};

export const coursesDataFromCourseSubCategories = (
  createdSubCategories: CourseSubCategory[]
) => {
  if (createdSubCategories.length < 5) {
    throw new Error("Insufficient subcategories provided.");
  }

  const subCategoryIds = createdSubCategories.map((item) => item.id);

  const courses = [
    {
      subCategoryIndex: 0,
      items: [
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
          title: "The Complete JavaScript Course 2025",
          teacher_name: "Jonas Schmedtmann",
          course_star: 4.7,
          student_number: 215784,
          price: 19.99,
        },
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/3600048_b195_20.jpg",
          title: "The Complete AI-Powered Copywriting Course & ChatGPT Course",
          teacher_name: "Andrew Mead",
          course_star: 4.8,
          student_number: 102345,
          price: 24.99,
        },
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/5231088_b1e8_2.jpg",
          title: "ChatGPT Master: Complete OpenAI ChatGPT Course",
          teacher_name: "Faisal Zamir",
          course_star: 4.8,
          student_number: 294056,
          price: 10.99,
        },
      ],
    },
    {
      subCategoryIndex: 1,
      items: [
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
          title: "Mastering CSS & Flexbox",
          teacher_name: "Rachel Andrew",
          course_star: 4.6,
          student_number: 78923,
          price: 14.99,
        },
      ],
    },
    {
      subCategoryIndex: 2,
      items: [
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
          title: "Mastering CSS & Flexbox",
          teacher_name: "Rachel Andrew",
          course_star: 4.6,
          student_number: 78923,
          price: 14.99,
        },
      ],
    },
    {
      subCategoryIndex: 3,
      items: [
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
          title: "Mastering CSS & Flexbox",
          teacher_name: "Rachel Andrew",
          course_star: 4.6,
          student_number: 78923,
          price: 14.99,
        },
      ],
    },
    {
      subCategoryIndex: 4,
      items: [
        {
          course_img:
            "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
          title: "Mastering CSS & Flexbox",
          teacher_name: "Rachel Andrew",
          course_star: 4.6,
          student_number: 78923,
          price: 14.99,
        },
      ],
    },
  ];

  return courses.flatMap(({ subCategoryIndex, items }) =>
    items.map((course) => ({
      ...course,
      course_sub_category_id: subCategoryIds[subCategoryIndex],
    }))
  );
};
