import express from "express";

import { validate } from "../middleware/middleware.js";
import { auth_schema } from "../middleware/middleware.js";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

// POST
router.post("/register",register);

router.post("/login",login);

router.post("/logout",logout);

// GET
// DELETE

export default router