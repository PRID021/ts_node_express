"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputWithIcon } from "./InputWithIcon";
import { User, Lock } from "lucide-react";
import { useAuthService } from "@/hooks/use-authService";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/authStore";

interface DialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

// Create a zustand store for dialog state
export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

const SignInFormScheme = z.object({
  user_name: z.string({ required_error: "User name cannot be empty." }),
  password: z
    .string({ required_error: "Password cannot be empty." })
    .min(6, "Password must be at least 6 characters"),
});

export function LoginDialog() {
  const { isOpen, closeDialog } = useDialogStore();
  const authService = useAuthService();
  const getProfile = useAuthStore((state) => state.getProfile);

  const form = useForm<z.infer<typeof SignInFormScheme>>({
    resolver: zodResolver(SignInFormScheme),
  });
  const { errors } = form.formState;
  const onSubmitLoading = async (
    data: z.infer<typeof SignInFormScheme>
  ): Promise<void> => {
    if (!authService) return;
    try {
      await authService.signIn(data);
      getProfile();
      closeDialog();
    } catch (error) {
      toast({
        description: ` ${error}`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-[375px] border rounded-md ">
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(onSubmitLoading)}
          >
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      icon={User}
                      placeholder="Enter you username"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.user_name && (
                      <span>{errors.user_name.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      icon={Lock}
                      placeholder="Enter you password"
                      type="password"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.password && <span>{errors.password.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit">Log In</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
