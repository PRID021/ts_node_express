import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Check, Dot } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Course } from "@/domain/models/CourseCategory";
import { HoverCardPortal } from "@radix-ui/react-hover-card";
import Image from "next/image";
import { Button } from "../ui/button";

type CourseCarouselProps = {
  courses: Course[];
};

type CourseCardProps = {
  course: Course;
};

function CourseItemCard({ course }: CourseCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card className="p-0 ml-4 max-w-[calc(100vw-84px)] h-full">
          <CardContent className="p-0 flex flex-col">
            <div className="flex-[2] w-full">
              <Image
                src={course.course_img}
                alt={course.title}
                width={240}
                height={135}
                className="w-full h-full object-cover rounded-t-xl"
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
      </HoverCardTrigger>
      <HoverCardPortal container={document.body}>
        <HoverCardContent
          side="right"
          align="center"
          className="flex flex-col w-fit p-4 max-w-[320px] bg-card"
        >
          <h1 className=" font-bold text-lg ">{course.title}</h1>
          <div className=" text-sm text-muted-foreground flex flex-row justify-start items-center">
            <p>{`29.5 total hoursAll`}</p>
            <Dot className="size-4" />
            <p>{`All level`}</p>
            <Dot className="size-4" />
            <p>{`No subtitle`}</p>
          </div>
          <p className=" text-sm mt-2">
            Become a Pro Copywriter with the Complete Copywriting and Content
            Marketing Course. Use ChatGPT. Get 70+ Pro Templates.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            {[
              "Master the art of copywriting",
              "Learn how to write compelling copy",
              "Understand the psychology of selling",
              "Discover how to write for different mediums",
              "Learn how to write for different audiences",
              "Understand how to write for different industries",
            ].map((item, index) => (
              <div key={index} className="flex gap-2 justify-start items-start">
                <Check className="w-4 h-4 mt-1" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
          <Button className="bg-background px-4 py-2 rounded-md text-foreground mt-2 font-bold shadow-md hover:shadow-lg transition-shadow">
            Buy Now
          </Button>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}

export function CourseCarousel({ courses }: CourseCarouselProps) {
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
            <CourseItemCard course={course} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/3 left-[40px] transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75" />
      <CarouselNext className="absolute top-1/3 right-[40px] transform -translate-y-1/2   bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75" />
    </Carousel>
  );
}
