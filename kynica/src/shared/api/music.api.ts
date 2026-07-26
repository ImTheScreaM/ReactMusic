import { IMusic, IUploadMusic } from "../interface/intarface";
import { apiClient } from "./client.ts";

export const musicApi = {
  all_music: async () => {
    const { data } = await apiClient.get("/all_music");
    
    return data.music;
  },

  user_music: async () => {
    const { data } = await apiClient.get("/user_music");
    return data.userMusic.getMusic;
  },

  add_rm_music: async (dataMusic: IMusic) => {
    const { data } = await apiClient.post("/add_rm_user_music", dataMusic);
    console.log(data,dataMusic);
    
    return data;
  },

  upload_music: async (dataMusic: IUploadMusic) => {
    const { data } = await apiClient.post("/upload_music", dataMusic, {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    });

    return data.uploadMusic;
  },
};
