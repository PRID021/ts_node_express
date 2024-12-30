import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { InputWithIcon } from "./InputWithIcon";
import { Lock, User } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner } from "./LoadingSpinner";

// Validate SignIn Form

const SignInFormScheme = z.object({
  user_name: z.string({ required_error: "User name cannot be empty." }),
  password: z
    .string({ required_error: "Password cannot be empty." })
    .min(6, "Password must be at least 6 characters"),
});

interface SignInFormProps {
  onSubmit: (data: z.infer<typeof SignInFormScheme>) => Promise<boolean>;
}

export function SignInButton({ onSubmit }: SignInFormProps) {
  const form = useForm<z.infer<typeof SignInFormScheme>>({
    resolver: zodResolver(SignInFormScheme),
  });

  const { errors } = form.formState;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitLoading = async (
    data: z.infer<typeof SignInFormScheme>
  ): Promise<void> => {
    setIsLoading(true);
    setIsOpen(false);
    await onSubmit(data);
    setIsLoading(false);
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          variant="outline"
          className="hover:bg-button-hover"
        >
          {isLoading ? <LoadingSpinner /> : <p>Sign In</p>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        onInteractOutside={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
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

            <div className="flex flex-col pt-4">
              <Button variant="default" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
