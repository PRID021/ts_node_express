export type Course = {
  id: string;
  courseImg: string;
  title: string;
  teacherName: string;
  courseStar: number;
  studentNumber: number;
  price: number;
};

export type CategoryLv2 = {
  id: string;
  label: string;
  description: string;
  courses: Course[];
};

export type CategoryLv1 = {
  id: string;
  label: string;
  subCategory: CategoryLv2[];
};

export const categoriesLv1: CategoryLv1[] = [
  {
    id: "cat1",
    label: "Development",
    subCategory: [
      {
        id: "subcat1",
        label: "Web Development",
        description:
          "Master the skills needed to build websites and web applications.",
        courses: [
          {
            id: "course1",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "The Complete JavaScript Course 2025",
            teacherName: "Jonas Schmedtmann",
            courseStar: 4.7,
            studentNumber: 215784,
            price: 19.99,
          },
          {
            id: "course2",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Learn Node.js by Building Real-World Apps",
            teacherName: "Andrew Mead",
            courseStar: 4.8,
            studentNumber: 102345,
            price: 24.99,
          },
          {
            id: "course3",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Mastering CSS & Flexbox",
            teacherName: "Rachel Andrew",
            courseStar: 4.6,
            studentNumber: 78923,
            price: 14.99,
          },
          {
            id: "course4",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Mastering CSS & Flexbox",
            teacherName: "Rachel Andrew",
            courseStar: 4.6,
            studentNumber: 78923,
            price: 14.99,
          },
          {
            id: "course5",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Mastering CSS & Flexbox",
            teacherName: "Rachel Andrew",
            courseStar: 4.6,
            studentNumber: 78923,
            price: 14.99,
          },
          {
            id: "course6",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Mastering CSS & Flexbox",
            teacherName: "Rachel Andrew",
            courseStar: 4.6,
            studentNumber: 78923,
            price: 14.99,
          },
        ],
      },
      {
        id: "subcat2",
        label: "Mobile Development",
        description: "Develop cutting-edge mobile apps for iOS and Android.",
        courses: [
          {
            id: "course4",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Flutter & Dart - The Complete Guide 2025",
            teacherName: "Maximilian Schwarzmüller",
            courseStar: 4.9,
            studentNumber: 158932,
            price: 29.99,
          },
          {
            id: "course5",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Build Apps with React Native",
            teacherName: "Stephen Grider",
            courseStar: 4.6,
            studentNumber: 98567,
            price: 22.99,
          },
          {
            id: "course6",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Kotlin for Android Development",
            teacherName: "Antonio Leiva",
            courseStar: 4.5,
            studentNumber: 65748,
            price: 19.99,
          },
        ],
      },
      {
        id: "subcat3",
        label: "Data Science",
        description: "Analyze data and build predictive models with Python.",
        courses: [
          {
            id: "course7",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Python for Data Science and Machine Learning",
            teacherName: "Jose Portilla",
            courseStar: 4.8,
            studentNumber: 198754,
            price: 34.99,
          },
          {
            id: "course8",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Deep Learning A-Z™: Neural Networks Explained",
            teacherName: "Kirill Eremenko",
            courseStar: 4.7,
            studentNumber: 129843,
            price: 39.99,
          },
          {
            id: "course9",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "R Programming for Data Analysis",
            teacherName: "Hadley Wickham",
            courseStar: 4.5,
            studentNumber: 98456,
            price: 29.99,
          },
        ],
      },
    ],
  },
  {
    id: "cat2",
    label: "Design",
    subCategory: [
      {
        id: "subcat1",
        label: "Graphic Design",
        description: "Learn to create stunning designs using modern tools.",
        courses: [
          {
            id: "course10",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Adobe Photoshop Masterclass",
            teacherName: "Chris Parker",
            courseStar: 4.8,
            studentNumber: 154876,
            price: 19.99,
          },
          {
            id: "course11",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Illustrator CC for Beginners",
            teacherName: "Lindsay Marsh",
            courseStar: 4.6,
            studentNumber: 84765,
            price: 24.99,
          },
        ],
      },
      {
        id: "subcat2",
        label: "UI/UX Design",
        description: "Create user-friendly and engaging digital experiences.",
        courses: [
          {
            id: "course12",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "UI/UX Design Bootcamp",
            teacherName: "Joe Natoli",
            courseStar: 4.7,
            studentNumber: 98745,
            price: 29.99,
          },
          {
            id: "course13",
            courseImg:
              "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
            title: "Figma for Beginners",
            teacherName: "Daniel Scott",
            courseStar: 4.9,
            studentNumber: 126543,
            price: 22.99,
          },
        ],
      },
    ],
  },
];
