import { ReactNode } from "react";

export default function Card({
  children,
  id = "",
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={`flex items-center min-h-screen ${className}`}>
      <div className="rounded-md bg-dark max-w-[480px] mx-auto p-10 m-10">
        {children}
      </div>
    </div>
  );
}
