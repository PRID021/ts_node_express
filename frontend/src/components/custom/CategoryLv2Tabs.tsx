"use client";

import { CourseSubCategory } from "@/domain/models/CourseCategory";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { CarouselCourses } from "./CarouselCourses";

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
      <div className="flex gap-4">
        {subCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setActiveSubCategoryId(category.id)}
            className={cn("bg-primary/20", {
              "bg-primary":
                category.id === (activeSubCategoryId ?? subCategories[0].id),
            })}
          >
            <p>{category.title}</p>
          </Button>
        ))}
      </div>

      <div>
        {subCategories.map(
          (category) =>
            category.id === activeSubCategoryId && (
              <CarouselCourses key={category.id} courses={category.courses} />
            )
        )}
      </div>
    </div>
  );
}

export default CategoryLv2Tabs;
