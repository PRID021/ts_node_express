"use client";

import { LearningStyle } from "@/domain/models/LearningStyle";
import { useLearningStylesProvider } from "@/hooks/use-learningStylesProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import TrainingTarget from "./TrainingTarget";

function LearningStyles() {
  const { data, isLoading, error } = useLearningStylesProvider();
  const [focusedItem, setFocusedItem] = useState<LearningStyle | undefined>(
    undefined
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setFocusedItem(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const items = data as LearningStyle[];

  return (
    <div className="w-full flex flex-col justify-center items-center mt-4">
      <h1 className="text-xl font-bold self-start text-start ">
        Learning focused on your goals
      </h1>

      {/* 768px and more */}
      <div className=" hidden md:flex flex-row gap-4 items-center ">
        <div className="flex flex-col gap-4 w-1/2">
          {items.map((item) => (
            <TrainingTarget
              key={item.title}
              focused={item === focusedItem}
              item={item}
              onClick={() => setFocusedItem(item)}
            />
          ))}
        </div>
        <div className="relative w-1/2">
          <Image
            src={(focusedItem ?? items[0]).illus}
            alt={(focusedItem ?? items[0]).title}
            width={1276}
            height={1396}
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {/* less than 768px */}

      <Carousel
        opts={{
          align: "center",
        }}
        className="md:hidden  w-full max-w-[80vw] mt-4"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.title}>
              <Card className="flex flex-col h-full">
                <CardContent className="flex flex-col justify-between items-end h-full">
                  <Image
                    src={item.illus}
                    alt={item.title}
                    width={240}
                    height={135}
                    className="object-cover w-full"
                  />
                  <div className="w-full h-full">
                    <h4 className="text-sm font-semibold my-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-[40px] transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75" />
        <CarouselNext className="absolute top-1/2 right-[40px] transform -translate-y-1/2   bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75" />
      </Carousel>
    </div>
  );
}

export default LearningStyles;
