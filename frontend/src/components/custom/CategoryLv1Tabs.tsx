/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCourseModuleProvider } from "@/hooks/use-courseModuleProvider";
import { useState } from "react";
import CategoryLv2Tabs from "./CategoryLv2Tabs";

const CategoryLv1Tabs: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [state, _] = useCourseModuleProvider();

  const isLoading = state.isLoading;
  const isError = state.failure;
  const categories = state.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="w-full mx-auto ">
      {/* Tab Buttons */}
      <div className="flex border-b border-border">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`relative mr-4 py-2 font-bold text-sm capitalize  border-b-2 border-transparent ${
              (activeCategoryId ?? categories[0].id) === category.id
                ? "!border-foreground text-foreground"
                : "text-muted-foreground  hover:text-foreground"
            }`}
            onClick={() => setActiveCategoryId(category.id)}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="border-t border-b border-border">
        {categories.map(
          (category) =>
            (activeCategoryId ?? categories[0].id) === category.id && (
              <CategoryLv2Tabs
                key={category.id}
                subCategories={category.sub_categories}
              />
            )
        )}
      </div>
    </div>
  );
};

export default CategoryLv1Tabs;
