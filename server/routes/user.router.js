import express from "express";
import {
  change_avatar,
  change_bio,
  change_username,
  session,
} from "../controllers/user.controller.js";

const router = express.Router();

// GET

router.get("/session", session);

// POST

router.post("/change_bio", change_bio);
router.post("/change_avatar",change_avatar)
router.post("/change_username", change_username);

// DELETE

export default router