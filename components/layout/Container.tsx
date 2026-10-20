import React from "react";
import { cn } from "@/lib/utils";

export type ContainerWidth = "narrow" | "standard" | "wide" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: ContainerWidth;
  as?: React.ElementType;
}

const widthStyles: Record<ContainerWidth, string> = {
  narrow: "max-w-4xl",
  standard: "max-w-7xl",
  wide: "max-w-[1440px]",
  full: "max-w-full",
};

export function Container({
  children,
  width = "standard",
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12",
        widthStyles[width],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
