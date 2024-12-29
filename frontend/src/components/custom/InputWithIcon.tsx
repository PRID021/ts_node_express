import { Input } from "@/components/ui/input";
import { ComponentType } from "react";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function InputWithIcon({ icon: Icon, ...props }: InputWithIconProps) {
  return (
    <div className="relative my-2">
      <span className="absolute inset-y-0 left-3 flex items-center">
        {Icon && <Icon className="w-5 h-5" />}
      </span>
      <Input
        {...props}
        className={`pl-10 border-border ${props.className || ""}`}
      />
    </div>
  );
}
