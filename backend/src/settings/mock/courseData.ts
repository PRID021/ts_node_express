import {
  CourseCategory,
  CourseSubCategory,
} from "@models/course_category.model";

export const courseCategories = [
  {
    title: "Development",
  },
  {
    title: "Design",
  },
];

export const subCategoriesDataFromCourseCategories = (
  createdCourseCategories: CourseCategory[]
) => {
  const [course_category_id_1, course_category_id_2] =
    createdCourseCategories.map((item) => item.id);

  return [
    {
      title: "React Development",
      description:
        "Master the skills needed to build websites and web applications.",
      course_category_id: course_category_id_1,
    },
    {
      title: "Mobile Development",
      description: "Develop cutting-edge mobile apps for iOS and Android.",
      course_category_id: course_category_id_1,
    },
    {
      title: "Data Science",
      description: "Analyze data and build predictive models with Python.",
      course_category_id: course_category_id_1,
    },

    ///
    {
      title: "Graphic Design",
      description: "Learn to create stunning designs using modern tools.",
      course_category_id: course_category_id_2,
    },
    {
      title: "UI/UX Design",
      description: "Create user-friendly and engaging digital experiences.",
      course_category_id: course_category_id_2,
    },
  ];
};

export const coursesDataFromCourseSubCategories = (
  createdSubCategories: CourseSubCategory[]
) => {
  const [sub_1, sub_2, sub_3, sub_4, sub_5] = createdSubCategories.map(
    (item) => item.id
  );

  return [
    {
      course_sub_category_id: sub_1,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "The Complete JavaScript Course 2025",
      teacher_name: "Jonas Schmedtmann",
      course_star: 4.7,
      student_number: 215784,
      price: 19.99,
    },
    {
      course_sub_category_id: sub_1,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Learn Node.js by Building Real-World Apps",
      teacher_name: "Andrew Mead",
      course_star: 4.8,
      student_number: 102345,
      price: 24.99,
    },
    {
      course_sub_category_id: sub_1,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },

    {
      course_sub_category_id: sub_1,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },
    {
      course_sub_category_id: sub_1,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },
    {
      course_sub_category_id: sub_1,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },

    {
      course_sub_category_id: sub_2,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },
    {
      course_sub_category_id: sub_3,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },
    {
      course_sub_category_id: sub_4,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },
    {
      course_sub_category_id: sub_5,
      course_img:
        "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
      title: "Mastering CSS & Flexbox",
      teacher_name: "Rachel Andrew",
      course_star: 4.6,
      student_number: 78923,
      price: 14.99,
    },
  ];
};
