"use client";

import { CourseSubCategory } from "@/domain/models/CourseCategory";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { CourseCarousel } from "./CourseCarousel";

type SubCategoryTabsProps = {
  subCategories: CourseSubCategory[];
};

function CategoryLv2Tabs(props: SubCategoryTabsProps) {
  const subCategories = props.subCategories ?? [];
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>(
    subCategories[0].id
  );

  return (
    <div className="flex  flex-col gap-8 py-4">
      <Carousel>
        <CarouselContent className="flex gap-2">
          {subCategories.map((category) => (
            <CarouselItem
              key={category.id}
              className=" basis-1/1" // Makes the width fit the content
            >
              <Button
                onClick={() => setActiveSubCategoryId(category.id)}
                className={cn("bg-primary/20 ", {
                  "bg-primary":
                    category.id ===
                    (activeSubCategoryId ?? subCategories[0].id),
                })}
              >
                <p>{category.title}</p>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div>
        {subCategories.map(
          (category) =>
            category.id === activeSubCategoryId && (
              <CourseCarousel key={category.id} courses={category.courses} />
            )
        )}
      </div>
    </div>
  );
}

export default CategoryLv2Tabs;
