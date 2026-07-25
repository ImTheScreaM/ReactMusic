import express from "express";
import { uploadMulter } from "../controllers/multer.controller.js";
import {
  add_music_in_playlist,
  change_avatar_playlist,
  create_playlist,
  delete_music_from_playlist,
  delete_playlist,
  get_music_playlist,
  get_playlist,
} from "../controllers/playlists.controller.js";

const router = express.Router();

// POST

router.post("/create_playlist", create_playlist);
router.post("/delete_playlist", delete_playlist);
router.post("/add_music_in_playlist", add_music_in_playlist);
router.post("/delete_music_from_playlist", delete_music_from_playlist);
router.post("/get_music_playlist", get_music_playlist);
router.post("/get_playlist", get_playlist);
router.post(
  "/change_playlist_avatar",
  uploadMulter.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  change_avatar_playlist,
);

// GET

export default router;
