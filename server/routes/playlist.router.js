import express from 'express';
import {
  add_music_in_playlist,
  create_playlist,
  delete_music_from_playlist,
  delete_playlist,
  get_music_playlist,
  get_playlist
} from "../controllers/playlists.controller.js";


const router = express.Router();

// POST

router.post("/create_playlist",create_playlist);
router.post("/delete_playlist",delete_playlist);
router.post("/add_music_in_playlist",add_music_in_playlist);
router.post("/delete_music_from_playlist",delete_music_from_playlist)
router.post("/get_music_playlist",get_music_playlist);

// GET

router.post("/get_playlist",get_playlist);



export default router;