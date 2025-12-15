import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordInput({
  name,
  label,
  control,
  variant = "primary",
  ...props
}) {
  const [showPass, setShowPass] = useState(false);
  return (
    <FormField
      render={({ field }) => {
        return (
          <FormItem className={"w-full"}>
            <div
              className={cn(
                variant === "secondary" ? "flex items-center" : "",
                "w-full"
              )}
            >
              {label ? (
                <FormLabel className={"w-full max-w-fit"}>{label}</FormLabel>
              ) : (
                ""
              )}
              <div className="relative">
                <FormControl className={"w-full"}>
                  <Input
                    {...field}
                    {...props}
                    type={showPass ? "text" : "password"}
                  />
                </FormControl>
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer absolute right-[5px] top-[50%] translate-y-[-50%]"
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </div>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
      name={name}
      control={control}
    />
  );
}
