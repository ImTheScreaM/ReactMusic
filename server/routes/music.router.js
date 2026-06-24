import express from "express";
import {add_rm_user_music, get_all_music, get_love_user_music, upload_music,} from "../controllers/music.controller.js";
import {uploadMulter} from "../controllers/multer.controller.js";

const router = express.Router();


// GET

router.get("/all_music", get_all_music);

router.get("/user_music", get_love_user_music);

// POST

router.post("/add_rm_user_music",add_rm_user_music)
// router.post("/upload_music",uploadMulter.fields(
//   [{name:"name",maxCount:1},
//   {name:"avatar",maxCount:1}]
// ))

router.post("/test_multer",uploadMulter.fields([
  {name:"avatar",maxCount:1},
  {name:"audio",maxCount:1},
]),upload_music)

export default router;
