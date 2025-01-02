import axios from "@/axios/axiosInstance";

function getUserOGPosts() {
  return axios.get("/post");
}

function deleteUserOGPosts(postId: string) {
  return axios.delete(`/post/${postId}`);
}

export const postServices = { getUserOGPosts, deleteUserOGPosts };
