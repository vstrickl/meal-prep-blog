import React from "react";
import { cn } from "@/lib/utils"; // Utility function to merge class names

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  className,
  ...props
}) => {
  const baseClass = "px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-black hover:bg-gray-600 focus:ring-gray-500",
    ghost: "bg-transparent text-black hover:bg-gray-200 focus:ring-gray-300",
  };

  const sizeClasses = {
    default: "h-auto text-base",
    icon: "h-10 w-10 flex items-center justify-center text-xl",
  };

  return (
    <button
      className={cn(
        baseClass,
        variantClasses[variant],
        sizeClasses[size],
        className // Allow additional classes to be merged
      )}
      {...props}
    />
  );
};
