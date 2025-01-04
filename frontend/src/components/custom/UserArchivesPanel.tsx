import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

function UserArchivesPanel() {
  const testimonials = [
    {
      id: 1,
      text: "Udemy was rated the most popular online course or certification program for learning how to code according to StackOverflow's 2023 Developer survey.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Stack_Overflow_logo.svg",
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

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl font-bold p-2">
        See what others are achieving through learning
      </h1>

      <Carousel
        opts={{
          align: "start",
        }}
        orientation="horizontal"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[300px]">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pt-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className=" h-[250px]">
                  <CardContent className="p-4">
                    {testimonial.logo && (
                      <div className="flex justify-center mb-4">
                        <Image
                          src={testimonial.logo}
                          alt="logo"
                          layout="intrinsic" // Use intrinsic to preserve image aspect ratio
                          className="object-contain"
                          width={80}
                          height={20} // Set height proportional to the image
                        />
                      </div>
                    )}
                    <p className="text-sm mb-2">{testimonial.text}</p>
                    {testimonial.author && (
                      <p className="font-semibold text-sm">
                        {testimonial.author}
                      </p>
                    )}
                    {testimonial.role && (
                      <p className="text-xs text-muted-foreground500">
                        {testimonial.role}
                      </p>
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
}

export default UserArchivesPanel;
