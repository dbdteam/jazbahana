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
    <div id={id} className="w-[90%] sm:w-[60%] mx-auto">
      <div
        className={`rounded-md bg-gray-100 dark:bg-gray-800 mx-auto p-5 m-5 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
