"use client";

import React, { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RegisterForm } from "./RegisterForm";
import { toast } from "@/hooks/use-toast";
import { InputOTPForm } from "./InputOTPForm";
import { AxiosError } from "axios";
import { User } from "@/domain/models/User";
import { Button } from "../ui/button";
import { useAuthService } from "@/hooks/use-authService";

function SignUpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [user, setUser] = useState<User | null>(null);
  const authService = useAuthService();

  const clearRegisterState = () => {
    setUser(null);
    setStep(1);
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-button-hover">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent
        className="m-0 p-0"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle>Create an Account</DialogTitle>
        </VisuallyHidden>
        {step === 1 && (
          <RegisterForm
            onSubmit={async (data) => {
              if (!authService) return;
              try {
                // Format the data (convert birth_of_day to ISO string)
                const formattedData = {
                  ...data,
                  birth_of_day: data.birth_of_day.toISOString(),
                };
                const createdUser = await authService.register(formattedData);
                if (!createdUser) return;
                setUser(createdUser);
                setStep(2);
                toast({
                  title: "Registration Successful!",
                  description:
                    "Your account has been created, We sent an OTP to your email to verify your account.",
                });
              } catch (error) {
                console.log("75 ==> ", error);
                toast({
                  variant: "destructive",
                  title: "Registration Failed",
                  description:
                    error instanceof AxiosError
                      ? error.response?.data?.message || error.message
                      : "An unexpected error occurred. Please try again later.",
                });
              }
            }}
          />
        )}

        {step === 2 && (
          <InputOTPForm
            onSubmit={async (otpFrom) => {
              if (!user || !authService) {
                return;
              }
              const formData = {
                ...otpFrom,
                user_id: user.id.toString(),
              };
              try {
                const success = await authService.verify(formData);
                if (!success) return;
                toast({
                  title: "Verify Successful!",
                  description:
                    "Your account already verify, now you can sign in and explore our service.",
                });
                clearRegisterState();
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Verification Failed",
                  description:
                    error instanceof AxiosError
                      ? error.response?.data?.message || error.message
                      : "An unexpected error occurred. Please try again later.",
                });
              }
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SignUpButton;
