export default function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      {children}
    </div>
  );
}
