"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RegisterForm } from "@/components/custom/RegisterForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const stepParams = useSearchParams();
  const step = stepParams.get("step");

  // const [user, setUser] = useState<RegisterRequest>({
  //   first_name: "",
  //   last_name: "",
  //   user_name: "",
  //   email: "",
  //   password: "",
  //   birth_of_day: "",
  //   phone_number: "",
  // });

  const [isOtpVisible, setIsOtpVisible] = useState(false);

  useEffect(() => {
    if (step === "2") {
      setIsOtpVisible(true);
    } else {
      setIsOtpVisible(false);
    }
  }, [step]);

  const { toast } = useToast();

  return (
    <div className="max-w-md w-full bg-card bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      {!isOtpVisible ? (
        <RegisterForm
          onSubmit={(data) => {
            console.log("Submitted Data:", data); // Check if data is logged here
            toast({
              title: "You submitted the following values:",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">
                    {JSON.stringify(data, null, 2)}
                  </code>
                </pre>
              ),
            });
          }}
        />
      ) : (
        <form onSubmit={() => {}}>
          <div className="mb-4 flex flex-col justify-center items-center">
            <label
              htmlFor="otp"
              className="block text-sm font-medium dark:text-white mb-4"
            >
              Enter 6-digit OTP
            </label>
            <Button variant="outline" className="w-full mt-4" type="submit">
              Verify OTP
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
