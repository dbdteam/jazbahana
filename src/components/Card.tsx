import { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center h-screen ${className}`}>
      <div className="rounded-md bg-dark max-w-[48ch] mx-auto p-10 m-10">
        {children}
      </div>
    </div>
  );
}
