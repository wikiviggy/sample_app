import type { BlogPostType } from "../../types/blog";
import ThemeButton from "../ThemeButton/ThemeButton";

interface BlogPostProps extends BlogPostType {
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BlogPost({
  title,
  content,
  onClick,
  onEdit,
  onDelete,
}: BlogPostProps) {
  return (
    <div className="flex flex-col justify-between border border-gray-200 bg-white rounded-lg p-4">
      <div onClick={onClick} className="cursor-pointer text-left">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-700 text-sm line-clamp-3">{content}</p>
      </div>

      <div className="flex justify-end gap-2 mt-3">
        <ThemeButton title="Edit" onClick={onEdit} />
        <ThemeButton title="Delete" onClick={onDelete} variant="secondary" />
      </div>
    </div>
  );
}
