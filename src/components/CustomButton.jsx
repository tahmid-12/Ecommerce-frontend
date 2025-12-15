"use client";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading";

export default function CustomButton({
  style,
  title,
  click,
  type,
  isLoading,
  ...props
}) {
  return (
    <Button
      onClick={click}
      type={type}
      className={`${style} hover:bg-[#F85606]/40`}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : title}
    </Button>
  );
}
