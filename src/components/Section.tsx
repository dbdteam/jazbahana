import type { ReactNode } from "react";

export default function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${className}`}
    >
      {children}
    </div>
  );
}
