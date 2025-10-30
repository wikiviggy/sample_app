interface ThemeButtonProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}

export default function ThemeButton({
  title,
  onClick,
  type = "button",
  variant = "primary",
}: ThemeButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "secondary"
      ? "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-300"
      : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles}`}
    >
      {title}
    </button>
  );
}
