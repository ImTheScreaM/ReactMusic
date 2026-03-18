import express from "express";
import {
  add_music,
  find_music,
  get_all_music,
  get_user_music,
  love_user_music,
  remove_user_music,
} from "../controllers/music_controller.js";

const router = express.Router();

router.get("/all_music", get_all_music);

router.get("/find_music", find_music);

router.get("/user_music", get_user_music);

router.get("/get_love_music",love_user_music)

router.post("/add_music", add_music);

router.delete("/remove_my_music", remove_user_music);

export default router;
