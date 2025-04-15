import express from "express";
import { login, signup, logout } from "../Controllers/auth.controllers.js";

const router = express.Router();

router.get("/login", login);

router.get("/signup",signup);

router.get("/logout", logout);
export default router;