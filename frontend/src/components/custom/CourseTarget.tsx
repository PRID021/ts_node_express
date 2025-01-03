import React from "react";
import Features from "./Features";

function CourseTarget() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-4">
      <h1 className="text-xl font-bold self-start text-start">
        Learning focused on your goals
      </h1>
      <Features />
    </div>
  );
}

export default CourseTarget;
