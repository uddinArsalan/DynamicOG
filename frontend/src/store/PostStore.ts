import { postServices } from "@/services/post.services";
import { BasicOGPostDetails } from "@/types";
import { create } from "zustand";

interface PostStoreActions {
  getPosts: () => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

interface TemplateStoreValue {
  posts: BasicOGPostDetails[];
  loading: boolean;
  isDelete: boolean;
}

type PostStore = TemplateStoreValue & PostStoreActions;

export const usePostStore = create<PostStore>()((set) => ({
  loading: false,
  isDelete: false,
  posts: [],
  getPosts: async () => {
    set({ loading: true });
    try {
      const res = await postServices.getUserOGPosts();
      const posts = res.data.data.posts;
      set({ posts, loading: false });
    } catch (error) {
      set({ posts: [], loading: false });
      console.log(error);
    }
  },
  deletePost: async (postId: string) => {
    try {
      set({ isDelete: true });
      await postServices.deleteUserOGPosts(postId);
      set({ isDelete: false });
    } catch (error) {
      set({ isDelete: false });
      console.log(error);
    }
  },
}));
