import express from "express";

import { validate } from "../middleware/middleware.js";
import { auth_schema } from "../middleware/middleware.js";
import { login, logout, register } from "../controllers/auth_controller.js";

const router = express.Router();


router.post("/register",register);

router.post("/login",login);

router.post("/logout",logout);


export default router