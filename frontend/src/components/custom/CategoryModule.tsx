import React from "react";
import CategoryLv1Tabs from "./CategoryLv1Tabs";

function CategoryModule() {
  return (
    <div className="w-full flex flex-col ">
      <h1 className="text-xl font-bold pt-4">
        All the skills you need in one place
      </h1>
      <p className="text-muted-foreground mb-6">
        From critical skills to technical topics, Udemy supports your
        professional development.
      </p>

      <CategoryLv1Tabs />
    </div>
  );
}

export default CategoryModule;
