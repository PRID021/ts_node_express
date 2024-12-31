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
          <Menu className="w-6 h-6 text-gray-800" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        {!user ? (
          <div className="grid gap-4 py-4">
            <Button
              type="submit"
              variant="ghost"
              className="grow"
              onClick={openDialogAndClose}
            >
              Log In
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-4">
              {/* Example: Show user's avatar */}
              <Image
                src={user.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <h3 className="font-semibold">{user.user_name}</h3>
                <p className="text-sm text-gray-500">{user.birth_of_day}</p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
