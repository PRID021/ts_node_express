"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import TrainingTarget, { TrainingTargetItem } from "./TrainingTarget";

const Items: TrainingTargetItem[] = [
  {
    illusUrl: "/hands-on-practice.webp",
    title: "Hands-on training",
    description:
      "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
    bigImg: "/desktop-hands-on-learning-2x.webp",
  },
  {
    illusUrl: "/certificate.webp",
    title: "Certification prep",
    description:
      "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
    bigImg: "/desktop-certification-prep-2x.webp",
  },
  {
    illusUrl: "/empty-state.webp",
    title: "Insights and analytics",
    description:
      "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
    bigImg: "/desktop-insights-and-analytics-2x.webp",
  },
  {
    illusUrl: "/organizations.webp",
    title: "Customizable content",
    description:
      "Create tailored learning paths for team and organization goals and even host your own content and resources.",
    bigImg: "/desktop-customizable-2x.png",
  },
];

function CourseTarget() {
  const [focusedItem, setFocusedItem] = useState<TrainingTargetItem>(Items[0]);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-4">
      <h1 className="text-xl font-bold self-start text-start">
        Learning focused on your goals
      </h1>

      {/* 768px and more */}
      <div className=" hidden md:flex flex-row gap-4 items-center">
        <div className="space-y-4 w-1/2">
          {Items.map((item) => (
            <TrainingTarget
              key={item.title}
              focused={item === focusedItem}
              item={item}
              onClick={() => setFocusedItem(item)}
            />
          ))}
        </div>
        <div className="relative w-1/2 ">
          <Image
            src={focusedItem.bigImg}
            alt={focusedItem.title}
            width={1276}
            height={1396}
            layout="responsive"
            priority
            className="rounded-md"
          />
        </div>
      </div>

      {/* less than 768px */}

      <Carousel
        opts={{
          align: "center",
        }}
        className=" md:hidden w-full"
      >
        <CarouselContent>
          {Items.map((item) => (
            <CarouselItem key={item.title} className="w-full">
              <Card>
                <CardContent className=" flex flex-col w-full">
                  <Image
                    src={item.bigImg}
                    alt={item.title}
                    width={240}
                    height={135}
                    layout="responsive"
                    className="object-cover rounded-t-xl w-full"
                  />
                  <div className="w-full">
                    <h4 className="text-sm font-semibold my-2 ">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CourseTarget;
