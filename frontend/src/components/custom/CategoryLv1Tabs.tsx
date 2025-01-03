"use client";

import { useState } from "react";
import { categoriesLv1 } from "./fake";
import CategoryLv2Tabs from "./CategoryLv2Tabs";

const CategoryLv1Tabs: React.FC = () => {
  const [activeCategoryLv1, setActiveCategoryLv1] = useState<string>("cat1");

  return (
    <div className="w-full mx-auto">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200">
        {categoriesLv1.map((categoryLv1) => (
          <button
            key={categoryLv1.id}
            className={`mr-4 py-2 font-medium text-sm ${
              activeCategoryLv1 === categoryLv1.id
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveCategoryLv1(categoryLv1.id)}
          >
            {categoryLv1.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
        {categoriesLv1.map(
          (categoryLv1) =>
            activeCategoryLv1 === categoryLv1.id && (
              <CategoryLv2Tabs
                key={categoryLv1.id}
                categoriesLv2={categoryLv1.subCategory}
              />
            )
        )}
      </div>
    </div>
  );
};

export default CategoryLv1Tabs;
