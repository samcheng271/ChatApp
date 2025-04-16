import express from "express";
import { login, signup, logout } from "../Controllers/auth.controllers.js";

const router = express.Router();

// Calls login function when route is http://localhost:8000/api/auth/login
router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);
export default router;