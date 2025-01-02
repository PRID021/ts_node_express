import React from "react";

function ArchivePanel() {
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
      <h1 className=" text-xl font-bold p-2">
        See what others are achieving through learning
      </h1>
    </div>
  );
}

export default ArchivePanel;
