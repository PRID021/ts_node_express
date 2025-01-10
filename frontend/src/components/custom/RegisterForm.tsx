"use client";

import PasswordStrengthMeter from "@/components/custom/PasswordStrengthMeter";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Lock, Mail, Phone, User } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { InputWithIcon } from "./InputWithIcon";

// Validation schema using Zod
const RegisterFormSchema = z.object({
  user_name: z
    .string({ required_error: "User name cannot be empty." })
    .min(1, "User Name is required"),
  first_name: z
    .string({ required_error: "First name cannot be empty." })
    .min(1, "First Name is required"),
  last_name: z
    .string({ required_error: "Last name cannot be empty." })
    .min(1, "Last Name is required"),
  email: z
    .string({ required_error: "Email cannot be empty." })
    .email("Invalid email address")
    .min(1, "Email is required"),
  phone_number: z
    .string({ required_error: "Phone number cannot be empty." })
    .regex(/^\d+$/, "Phone number must be numeric") // Ensures the phone number is numeric
    .min(1, "Phone number is required"),
  password: z
    .string({ required_error: "Password cannot be empty." })
    .min(6, "Password must be at least 6 characters"),
  birth_of_day: z
    .date({ required_error: "Birth of date cannot be empty." })
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date of birth is required",
    }),
});

interface RegisterFormProps {
  onSubmit: (data: z.infer<typeof RegisterFormSchema>) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
  });

  // Accessing errors from formState
  const { errors } = form.formState;

  return (
    <div className="p-6 bg-card-background rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-center bg-clip-text text-card-foreground">
        Create Account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon={Mail}
                    placeholder="Enter your email"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage>
                  {errors.email && <span>{errors.email.message}</span>}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-border"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.first_name && (
                      <span>{errors.first_name.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-border"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.last_name && (
                      <span>{errors.last_name.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="birth_of_day"
            render={({ field }) => (
              <FormItem className="flex flex-col grow-1">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>
                  {errors.birth_of_day && (
                    <span>{errors.birth_of_day.message}</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon={Phone}
                    placeholder="Your phone number"
                    type="tel"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage>
                  {errors.phone_number && (
                    <span>{errors.phone_number.message}</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    icon={User}
                    placeholder="Enter your username"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage>
                  {errors.user_name && <span>{errors.user_name.message}</span>}
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
                    placeholder="Enter your password"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordStrengthMeter password={field.value ?? ""} />
            )}
          />
          <div className="pt-4">
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
