"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  id: number;
  text: string;
  logo?: string; // Optional, only some testimonials have a logo
  description?: string; // Optional, only for logo-based testimonials
  author?: string; // Optional, only for testimonials without logos
  role?: string; // Optional, only for testimonials without logos
  link: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Udemy was rated the most popular online course or certification program for learning how to code according to StackOverflow's 2023 Developer survey.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Stack_Overflow_logo.svg",
    description: "37,076 responses collected",
    link: "View Web Development courses",
  },
  {
    id: 2,
    text: "Udemy was truly a game-changer and a great guide for me as we brought Dimensional to life.",
    author: "Alvin Lim",
    role: "Technical Co-Founder, CTO at Dimensional",
    link: "View this iOS & Swift course",
  },
  {
    id: 3,
    text: "Udemy gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
    author: "William A. Wachlin",
    role: "Partner Account Manager at Amazon Web Services",
    link: "View this AWS course",
  },
  {
    id: 4,
    text: "With Udemy Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    author: "Ian Stevens",
    role: "Head of Capability Development, North America at Publicis Sapient",
    link: "Read full story",
  },
];

const UserArchivesPanel: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl font-bold p-2">
        See what others are achieving through learning
      </h1>

      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        orientation="horizontal"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[300px]">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pt-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 min-w-[300px]"
            >
              <div className="p-1">
                <Card className="h-[250px]">
                  <CardContent className="p-4 flex flex-col gap-4 items-start justify-center">
                    <Image
                      src="/quote.svg"
                      alt="quote icon"
                      width={17}
                      height={17}
                    />

                    <p className="text-sm h-[80px]">{testimonial.text}</p>

                    {testimonial.logo && (
                      <div className="flex flex-col h-[50px] justify-center items-start gap-2">
                        <Image
                          src={testimonial.logo}
                          alt="logo"
                          layout="intrinsic" // Use intrinsic to preserve image aspect ratio
                          className="object-contain"
                          width={80}
                          height={40}
                        />
                        <p className="text-muted-foreground text-xs">
                          {testimonial.description}
                        </p>
                      </div>
                    )}

                    {!testimonial.logo && (
                      <div className="flex flex-row gap-4 justify-center items-center h-[50px]">
                        <Avatar style={{ width: "40px", height: "40px" }}>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <AvatarFallback
                            style={{ fontSize: "12px", lineHeight: "40px" }}
                          >
                            CN
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <p className="text-muted-foreground text-xs">
                            {testimonial.author}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    )}

                    <a
                      href="#"
                      className="text-blue-500 text-sm font-bold mt-2 block"
                    >
                      {testimonial.link}
                    </a>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default UserArchivesPanel;
