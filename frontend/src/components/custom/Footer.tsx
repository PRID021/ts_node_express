import React from "react";
import Image from "next/image";
import { Globe } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white py-4 flex justify-between items-center px-6 lg:px-12">
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.svg"
          alt="uLogo"
          className="h-6"
          width={40}
          height={40}
        />
        <span>© 2025 PhDH, Inc.</span>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <a
          href="#"
          className="text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Cookie settings"
        >
          Cookie settings
        </a>
      </div>

      <div className="flex items-center space-x-2">
        <Globe className="size-4 text-white dark:text-black  " />
        <span>English</span>
      </div>
    </footer>
  );
};

export default Footer;
