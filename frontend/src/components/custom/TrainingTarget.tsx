import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type TrainingTargetItem = {
  illusUrl: string;
  title: string;
  description: string;
  bigImg: string;
};

const TrainingTarget = (props: {
  item: TrainingTargetItem;
  focused: boolean;
  onClick: () => void;
}) => {
  const { item, focused, onClick } = props;

  return (
    <Card
      className={cn(
        "relative ml-0 flex max-w-lg  min-h-[135px] items-center gap-4 overflow-hidden rounded-md border-[0.5px] border-l-1  bg-card shadow-sm",
        {
          " border-l-0 border-purple-600": focused,
        }
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute left-[-1px] top-0 h-full w-1.5 bg-purple-600 hidden",
          { block: focused }
        )}
      />
      <CardContent className="flex items-center space-x-4 p-4 pl-6">
        <div className="flex-shrink-0">
          <Image
            src={item.illusUrl} // Replace with your icon path
            alt="Hands-on training"
            width={64}
            height={64}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-muted-foreground600">
            {item.title}
          </h2>
          <p className="text-muted-foreground600">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingTarget;
