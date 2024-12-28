import { Input } from "@/components/ui/input";
import { ComponentType } from "react";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>; // Use React.ComponentType for generic components
}

export function InputWithIcon({ icon: Icon, ...props }: InputWithIconProps) {
  return (
    <div className="relative mb-6">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
        {Icon && <Icon className="w-5 h-5" />}
      </span>
      <Input {...props} className={`pl-10 ${props.className || ""}`} />
    </div>
  );
}
