import React from "react";
import Image from "next/image";

function TopTrend() {
  return (
    <div className="w-full flex flex-col lg:flex-row-reverse items-center lg:items-start gap-4 my-4">
      {/* Image Section */}
      <div className="w-full lg:w-2/3 relative">
        <Image
          src="/top_trend.webp"
          alt="Top trends"
          className="object-cover rounded-md"
          layout="responsive"
          width={1284}
          height={750}
        />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col justify-center px-4 lg:px-6  self-center">
        <h1 className="text-xl font-bold mb-4 text-foreground ">
          Top trends for the future of work
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Our 2025 Global Learning & Skills Trends Report is out now! Find out
          how to build the skills to keep pace with change.
        </p>
      </div>
    </div>
  );
}

export default TopTrend;
