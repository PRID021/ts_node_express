export interface Course {
  id: number;
  course_sub_category_id: number;
  course_img: string;
  title: string;
  teacher_name: string;
  course_star: number;
  student_number: number;
  price: number;
}

export interface CourseSubCategory {
  id: number;
  course_category_id: number;
  title: string;
  description: string;
  courses: Course[];
}

export interface CourseCategory {
  id: number;
  title: string;
  sub_categories: CourseSubCategory[];
}
