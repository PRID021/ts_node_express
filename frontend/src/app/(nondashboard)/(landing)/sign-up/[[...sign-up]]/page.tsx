"use client";

import { InputWithIcon } from "@/components/custom/InputWithIcon";
import PasswordStrengthMeter from "@/components/custom/PasswordStrengthMeter";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react"; // Import both icons from lucide-react
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const stepParams = useSearchParams();
  const step = stepParams.get("step"); // Retrieve 'step' query parameter from the URL

  const [fullName, setFullName] = useState(""); // Track full name input
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [otp, setOtp] = useState(""); // Track OTP input
  const [isOtpVisible, setIsOtpVisible] = useState(false); // Manage visibility of OTP form

  useEffect(() => {
    // Toggle the visibility of OTP form based on the step value from URL
    if (step === "2") {
      setIsOtpVisible(true);
    } else {
      setIsOtpVisible(false);
    }
  }, [step]); // Re-run when the step parameter changes

  // Handle input changes for each field
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  // Handle form submission (Create Account)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", { fullName, email, password });
    // After successful form submission, navigate to OTP step
    // Example: Navigate to '/sign-up?step=2'
    router.push("/sign-up?step=2");
  };

  // Handle OTP submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
    // You can handle OTP verification logic here
  };

  return (
    <div className="max-w-md w-full bg-background bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text text-b dark:text-fuchsia-300">
          {isOtpVisible ? "Enter OTP" : "Create Account"}
        </h2>

        {!isOtpVisible ? (
          // Account creation form
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              icon={User}
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={handleFullNameChange} // Update the state
            />
            <InputWithIcon
              icon={Mail}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange} // Update the state
            />
            <InputWithIcon
              icon={Lock}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange} // Update the state
            />

            <PasswordStrengthMeter password={password} />

            <Button variant="outline" className="w-full mt-4" type="submit">
              Create Account
            </Button>
          </form>
        ) : (
          // OTP input form
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4 flex flex-col justify-center items-center">
              <label
                htmlFor="otp"
                className="block text-sm font-medium dark:text-white mb-4"
              >
                Enter 6-digit OTP
              </label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={handleOtpChange} // Update OTP state
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button variant="outline" className="w-full mt-4" type="submit">
              Verify OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
