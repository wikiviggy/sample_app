import ThemeButton from "../ThemeButton/ThemeButton";

interface BlogModalProps {
  title: string;
  content: string;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function BlogModal({
  title,
  content,
  onClose,
  onDelete,
  onEdit,
}: BlogModalProps) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-between p-6 text-left text-xl z-20">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
      >
        ×
      </button>

      <div className="flex flex-col gap-3 overflow-auto">
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
      </div>

      <div className="flex justify-between mt-6">
        <ThemeButton title="Delete" onClick={onDelete} variant="secondary" />
        <ThemeButton title="Edit" onClick={onEdit} />
      </div>
    </div>
  );
}
