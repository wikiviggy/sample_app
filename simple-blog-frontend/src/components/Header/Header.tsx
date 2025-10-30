import ThemeButton from "../ThemeButton/ThemeButton";

interface HeaderProps {
  onCreate: () => void;
}

export default function Header({ onCreate }: HeaderProps) {
  return (
    <div className="h-[60px] w-full bg-header flex justify-end items-center fixed top-0 left-0 px-3 text-white z-10">
      <ThemeButton onClick={onCreate} title="Create Blog Post" />
    </div>
  );
}