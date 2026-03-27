import express from "express";
import {
  add_music,
  find_music,
  get_all_music,
  get_love_user_music,
  remove_user_music,
} from "../controllers/music_controller.js";

const router = express.Router();


// GET

router.get("/all_music", get_all_music);

router.get("/find_music", find_music);

router.get("/user_music", get_love_user_music);


// POST

router.post("/add_music", add_music);

// DELETE

router.delete("/remove_user_music", remove_user_music);

export default router;
