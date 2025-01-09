import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Course } from "@/domain/models/CourseCategory";
import Image from "next/image";

type CarouselCoursesProps = {
  courses: Course[];
};

export function CarouselCourses(props: CarouselCoursesProps) {
  const courses = props.courses;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="max-w-[calc(100vw-64px)]"
    >
      <CarouselContent>
        {courses.map((course) => (
          <CarouselItem
            key={course.id}
            className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4  "
          >
            <Card className="p-0 ml-4 max-w-[calc(100vw-84px)] h-full">
              <CardContent className="p-0 flex flex-col">
                <div className="flex-[2] w-full">
                  <Image
                    src={course.course_img}
                    alt={course.title}
                    width={240}
                    height={135}
                    className="w-full h-full object-cover rounded-t-xl "
                  />
                </div>

                <div className="flex-[1] p-4">
                  <h4 className="text-sm font-semibold mb-2">{course.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {course.teacher_name}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    ⭐ {course.course_star} (
                    {course.student_number.toLocaleString()} students)
                  </p>
                  <p className="mt-2 font-semibold text-blue-500">
                    ₫{course.price.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/3 left-[40px] transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75" />
      <CarouselNext className="absolute top-1/3 right-[40px] transform -translate-y-1/2   bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75" />
    </Carousel>
  );
}
