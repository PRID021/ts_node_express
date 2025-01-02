"use client";

import React, { useState } from "react";
import { CategoryLv2 } from "./fake";
import { Button } from "../ui/button";
import { CarouselCourses } from "./CarouselCourses";
import { cn } from "@/lib/utils";

type SubCategoryTabsProps = {
  categoriesLv2: CategoryLv2[];
};

function CategoryLv2Tabs(props: SubCategoryTabsProps) {
  const categoriesLv2 = props.categoriesLv2;
  const [activeCategory, setActiveCategory] = useState(categoriesLv2[0].id);
  console.log(categoriesLv2);

  return (
    <div className="flex  flex-col gap-8 py-4">
      <div className="flex gap-4">
        {categoriesLv2.map((category) => (
          <Button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "bg-primary/20", // Default styles for the button
              { "bg-primary": category.id === activeCategory } // Active styles
            )}
          >
            <p>{category.label}</p>
          </Button>
        ))}
      </div>

      <div>
        {categoriesLv2.map(
          (category) =>
            category.id === activeCategory && (
              <CarouselCourses key={category.id} courses={category.courses} />
            )
        )}
      </div>
    </div>
  );
}

export default CategoryLv2Tabs;
