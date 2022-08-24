export default function Card({
  children,
  id = "",
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className="w-[90%] sm:w-[60%] max-w-[720px] mx-auto">
      <div
        className={`rounded-md bg-gray-100 dark:bg-gray-800 mx-auto p-5 m-5 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
