
import { apiClient } from "./client.ts";

export const playlistApi = {
  create: async (name: string) => {
    const { data } = await apiClient.post("/create_playlist", { name });
    return data.playlist;
  },

  delete: async (playlistId: number) => {
    await apiClient.post("/delete_playlist", { playlistId });
  },

  get: async () => {
    const { data } = await apiClient.post("/get_playlist");
    return data;
  },

  add_music: async (playlistId: number, musicId: number) => {
    const { data } = await apiClient.post("/add_music_in_playlist", {
      playlistId,
      musicId,
    });
    return data.data;
  },

  delete_music: async (playlistId: number, musicId: number) => {
    await apiClient.post("/delete_music_from_playlist", { playlistId, musicId });
  },

  get_music: async (playlistId: number) => {
    const { data } = await apiClient.post("/get_music_playlist", { playlistId });
    return data;
  },

  update_info: async (formData: FormData) => {
    await apiClient.post("/change_playlist_avatar", formData, {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    });
  },
};
