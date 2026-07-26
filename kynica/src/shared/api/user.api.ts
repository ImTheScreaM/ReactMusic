import { apiClient } from "./client.ts";

export const userApi = {
  update_username: async (data:string) => {
    await apiClient.post('/change_username',{new_name:data})
  },

  update_bio: async (data:string) => {
    await apiClient.post('/change_bio',{new_bio:data});
  },

  update_avatar: async (avatar:string) => {
    await apiClient.post('/change_avatar',{newAvatar:avatar});
  }
}