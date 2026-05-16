import express from "express";
import { notFound } from "../controllers/viewController.mjs";
import {
  handleRedirect,
  handleStatus,
  redirectLink,
} from "../controllers/redirectController.mjs";

const router = express.Router();

router.get("/error", notFound);
router.post("/dashboard/status", handleStatus);
router.post("/dashboard/link", redirectLink);

router.get("/usr/:id", handleRedirect);

export { router };
