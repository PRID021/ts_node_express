import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Course } from "./fake";

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
      className="w-full"
    >
      <CarouselContent className="flex gap-2 -ml-4">
        {" "}
        {/* Horizontal gap */}
        {courses.map((course) => (
          <CarouselItem
            key={course.id}
            className="basis-1/2  md:basis-1/3 lg:basis-1/4 flex-shrink-0 pl-4" /* Responsive sizing */
          >
            <Card className="max-w-[300px]  h-[320px] flex flex-col">
              {" "}
              {/* Equal height */}
              <CardContent className="p-0 flex flex-col h-full">
                <Image
                  src={course.courseImg}
                  alt={course.title}
                  width={240}
                  height={135}
                  layout="responsive"
                  className="object-cover rounded-t-xl"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h4 className="text-sm font-semibold mb-2 ">
                    {course.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {course.teacherName}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    ⭐ {course.courseStar} (
                    {course.studentNumber.toLocaleString()} students)
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
