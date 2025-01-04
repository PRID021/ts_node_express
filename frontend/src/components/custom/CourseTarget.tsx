"use client";

import React, { useState } from "react";
import TrainingTarget, { TrainingTargetItem } from "./TrainingTarget";
import Image from "next/image";

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
    <div className="w-full flex flex-col justify-center items-start py-4 gap-4">
      <h1 className="text-xl font-bold self-start text-start">
        Learning focused on your goals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Left Column: List of Training Targets */}
        <div className="space-y-4">
          {Items.map((item) => (
            <TrainingTarget
              key={item.title}
              focused={item === focusedItem}
              item={item}
              onClick={() => setFocusedItem(item)}
            />
          ))}
        </div>

        {/* Right Column: Focused Image */}
        <div className="relative w-full">
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
    </div>
  );
}

export default CourseTarget;
