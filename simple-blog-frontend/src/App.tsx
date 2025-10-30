import { useState } from "react";
import { usePosts, useDeletePost } from "./api/posts";
import Header from "./components/Header/Header";
import BlogPost from "./components/BlogPost/BlogPost";
import BlogModal from "./components/BlogModal/BlogModal";
import PostForm from "./components/PostForm/PostForm";
import type { BlogPostType } from "./types/blog";

export default function App() {
  const { data: posts, isLoading } = usePosts();
  const deletePost = useDeletePost();

  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="relative p-6 pt-20">
      <Header onCreate={() => setShowForm(true)} />

      <div className="mt-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts?.map((post) => (
          <BlogPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            onClick={() => setSelectedPost(post.id)}
            onEdit={() => {
              setEditingPost(post);
              setShowForm(true);
            }}
            onDelete={() => deletePost.mutate(post.id)}
          />
        ))}
      </div>


      {selectedPost && (
        <BlogModal
          {...posts!.find((p) => p.id === selectedPost)!}
          onClose={() => setSelectedPost(null)}
          onDelete={() => {
            deletePost.mutate(selectedPost);
            setSelectedPost(null);
          }}
          onEdit={() => {
            const postToEdit = posts!.find((p) => p.id === selectedPost);
            if (postToEdit) {
              setEditingPost(postToEdit);
              setShowForm(true);
              setSelectedPost(null);
            }
          }}
        />
      )}

      {showForm && (
        <PostForm
          initial={editingPost || { title: "", content: "" }}
          onClose={() => {
            setEditingPost(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
