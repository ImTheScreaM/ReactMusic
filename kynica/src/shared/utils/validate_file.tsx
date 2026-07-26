import { toast } from "react-toastify";
import { IUploadMusic } from "../interface/intarface.ts";
import music_controller from "../stores/music_controller.ts";

export function validate_file(formData: IUploadMusic) {
  // if (!formData.avatar || formData.avatar.size === 0) return toast.error("No avatar for music");
  // if (!formData.audio || formData.audio.size === 0) return toast.error("No file music");
  // if (!formData.name || !formData.genre) return toast.error("No name or genre");

  return music_controller.upload_music(formData);
}
