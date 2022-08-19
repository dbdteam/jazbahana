export default function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-gray-100 font-bold rounded-md ${className}`}
    >
      {children}
    </button>
  );
}
