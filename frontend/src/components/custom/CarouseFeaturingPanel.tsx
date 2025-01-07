"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { Card, CardContent } from "../ui/card";

import { useFeaturingProvider } from "@/hooks/use-featuringProvider";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type CarouselSlideProps = {
  desktop_media: string;
  mobile_media: string;
  imageAlt: string;
  heading: string;
  text: string;
};

const CarouselSlide = ({
  desktop_media,
  mobile_media,
  imageAlt,
  heading,
  text,
}: CarouselSlideProps) => (
  <CarouselItem>
    <Card className="p-0 m-0 hidden sm:block rounded-none">
      <CardContent className="relative items-center justify-center p-0 m-0">
        <Image
          src={desktop_media}
          alt={imageAlt}
          layout="responsive"
          width={134}
          height={40}
          className="object-cover"
        />
        {/* Floating Card */}
        <Card className="absolute top-[15%] left-[10%] p-2 m-0 rounded-none max-w-96 bg-card shadow-lg">
          <CardContent className="items-center justify-center p-4">
            <h1 className="text-xl font-bold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{text}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>

    <div className="block sm:hidden">
      <Card className="p-0 m-0 rounded-none">
        <CardContent className="flex items-center justify-center p-0 m-0">
          <Image
            src={mobile_media}
            alt={imageAlt}
            width={96}
            height={52}
            layout="responsive"
            className="object-cover"
          />
        </CardContent>
      </Card>
      <div className="p-4">
        <h1 className="text-xl font-bold">{heading}</h1>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  </CarouselItem>
);

const CarouselSkeleton = () => (
  <CarouselItem>
    <Card className="p-0 m-0 hidden sm:block rounded-none">
      <CardContent className="relative items-center justify-center p-0 m-0">
        <Skeleton className="w-full h-[500px] sm:h-[380px] object-cover animate-pulse" />
      </CardContent>
    </Card>
  </CarouselItem>
);

export function CarouseFeaturingPanel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [state, stateModifier] = useFeaturingProvider();

  const loading = state.isLoading;
  const slides = state.data ?? [];

  return (
    <div className="relative w-full">
      <Carousel className="w-full" plugins={[plugin.current]}>
        <CarouselContent>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselSkeleton key={index} />
              ))
            : slides.map((slide, index) => (
                <CarouselSlide key={index} {...slide} />
              ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute top-1/2 left-[40px] transform -translate-y-1/2 z-10 bg-card bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75"
          aria-label="Previous slide"
        />
        <CarouselNext
          className="absolute top-1/2 right-[40px] transform -translate-y-1/2 z-10 bg-card bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75"
          aria-label="Next slide"
        />
      </Carousel>
    </div>
  );
}
