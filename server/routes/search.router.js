import express from "express";

import {search_music_by_artist, search_music_by_name} from "../controllers/search.controller.js";

const router = express.Router();


// POST

router.post("/search_name",search_music_by_name);
router.post("/search_artist",search_music_by_artist);

export default router;

