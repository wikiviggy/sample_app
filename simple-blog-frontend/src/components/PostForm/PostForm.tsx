import { useState } from "react";
import ThemeButton from "../ThemeButton/ThemeButton";
import type { BlogPostType } from "../../types/blog";
import { useCreatePost, useUpdatePost } from "../../api/posts";

interface PostFormProps {
  initial?: Partial<BlogPostType>;
  onClose: () => void;
}

export default function PostForm({ initial, onClose }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const isEditing = Boolean(initial?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      updatePost.mutate({ id: initial!.id!, title, content });
    } else {
      createPost.mutate({ title, content });
    }

    onClose();
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
      <div className="bg-white rounded-md shadow p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          {isEditing ? "Edit Post" : "Create Post"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title..."
            required
            className="border border-gray-300 rounded-md p-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            required
            rows={6}
            className="border border-gray-300 rounded-md p-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />

          <div className="flex justify-end gap-2 mt-4">
            <ThemeButton title="Cancel" variant="secondary" onClick={onClose} />
            <ThemeButton title={isEditing ? "Update" : "Create"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
