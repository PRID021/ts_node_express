"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { useDialogStore } from "./LoginDialog";
import { useState } from "react";
import useAuthStore from "@/stores/authStore";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

export function NavSideBar() {
  const user = useAuthStore((state) => state.user);
  const { openDialog } = useDialogStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialogAndClose = (): void => {
    setIsOpen(false);
    openDialog();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-full flex flex-col justify-between m-0 p-0 gap-4"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <div className="flex flex-col p-4 ">
          {!user ? (
            <Button
              type="submit"
              variant="ghost"
              className="grow"
              onClick={openDialogAndClose}
            >
              Log In
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <h3 className="font-semibold">{user.user_name}</h3>
                <p className="text-sm ">
                  {format(new Date(user.birth_of_day), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-300 w-full" />

        {/* Navigation Links */}
        {user && (
          <div className="flex flex-col flex-grow px-4">
            {["Courses", "Billing", "Profile"].map((link) => (
              <motion.div
                key={link}
                className="relative py-2"
                whileHover="hover" // Trigger hover state
                initial="rest" // Initial state
                animate="rest" // Animate back to rest
              >
                <Link
                  href={`/student/${link.toLowerCase()}`}
                  className="text-lg  font-medium"
                >
                  {link}
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-secondary-foreground"
                  variants={{
                    rest: { width: 0, opacity: 0 }, // Hidden by default
                    hover: { width: "100%", opacity: 1 }, // Expand underline on hover
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        )}
        <div className="border-t border-gray-300 w-full" />
        <div className="mx-4 pb-4">
          <Button className="self-start w-full">
            <h3>SignOut</h3>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
