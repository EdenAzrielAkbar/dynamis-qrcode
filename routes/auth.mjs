import express from "express";
import { getDashboard, getLogin } from "../controllers/viewController.mjs";
import {
  isAuth,
  authCallback,
  authScope,
  handleLogout,
} from "../middlewares/auth.mjs";

const router = express.Router();

router.get("/login", getLogin);

router.get("/auth/google", authScope);
router.get("/auth/google/callback", authCallback);
router.get("/dashboard", isAuth, getDashboard);
router.get("/logout", handleLogout);

export { router };
