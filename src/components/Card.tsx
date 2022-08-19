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
      <div className="rounded-md bg-gray-100 dark:bg-gray-800 max-w-[480px] mx-auto p-10 m-10">
        {children}
      </div>
    </div>
  );
}
