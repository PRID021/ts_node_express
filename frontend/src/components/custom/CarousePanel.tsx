"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";

import Image from "next/image";
import { useFeaturingRepo } from "@/hooks/user-landingRepo";
import { useEffect, useState } from "react";
import { Featuring } from "@/domain/models/Featuring";

type CarouselSlideProps = {
  desktopMedia: string;
  mobileMedia: string;
  imageAlt: string;
  heading: string;
  text: string;
};

const CarouselSlide = ({
  desktopMedia,
  mobileMedia,
  imageAlt,
  heading,
  text,
}: CarouselSlideProps) => (
  <CarouselItem>
    <Card className="p-0 m-0 hidden sm:block rounded-none">
      <CardContent className="relative items-center justify-center p-0 m-0">
        <Image
          src={desktopMedia}
          alt={imageAlt}
          layout="responsive"
          width={134}
          height={40}
          className="object-cover"
        />
        {/* Floating Card */}
        <Card className="absolute top-[15%] left-[10%] p-2 m-0 rounded-none max-w-96 bg-white  shadow-lg">
          <CardContent className="items-center justify-center p-4">
            <h1 className="text-xl font-bold">{heading}</h1>
            <p className="text-sm text-gray-600">{text}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>

    <div className="block sm:hidden">
      <Card className=" p-0 m-0 rounded-none">
        <CardContent className="flex items-center justify-center p-0 m-0">
          <Image
            src={mobileMedia}
            alt={imageAlt}
            layout="responsive"
            width={96}
            height={52}
            className="object-cover"
          />
        </CardContent>
      </Card>
      <div className="p-4">
        <h1 className="text-xl font-bold">{heading}</h1>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  </CarouselItem>
);

export function CarousePanel() {
  const featuringRepo = useFeaturingRepo();
  const [slides, setSlides] = useState<Featuring[]>([]);

  useEffect(() => {
    const fetchFeaturingFeature = async () => {
      const serverResponse = await featuringRepo?.getFeaturings();
      if (serverResponse) {
        setSlides(serverResponse.data);
      }
    };
    fetchFeaturingFeature();
  }, [featuringRepo]);

  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselSlide key={index} {...slide} />
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute top-1/2 left-[40px] transform -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75"
          aria-label="Previous slide"
        />
        <CarouselNext
          className="absolute top-1/2 right-[40px] transform -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75"
          aria-label="Next slide"
        />
      </Carousel>
    </div>
  );
}
