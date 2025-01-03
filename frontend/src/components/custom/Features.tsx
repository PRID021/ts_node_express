import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Features: React.FC = () => {
  return (
    <Card className="relative border-2 border-gray-200 hover:shadow-md transition-shadow rounded-md overflow-hidden">
      <CardContent className="flex items-start space-x-4 p-4 pl-6 border-l-4 border-l-purple-400">
        <div className="flex-shrink-0">
          <Image
            src="/certificate.webp" // Replace with your icon path
            alt="Hands-on training"
            width={64}
            height={64}
          />
        </div>
        {/* Text Content */}
        <div>
          <h2 className="text-lg font-bold">Hands-on training</h2>
          <p className="text-gray-600">
            Upskill effectively with AI-powered coding exercises, practice
            tests, and quizzes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Features;
