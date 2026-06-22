import express from "express";
import {add_rm_user_music, get_all_music, get_love_user_music,} from "../controllers/music.controller.js";

const router = express.Router();


// GET

router.get("/all_music", get_all_music);

router.get("/user_music", get_love_user_music);

// POST

router.post("/add_rm_user_music",add_rm_user_music)


export default router;
