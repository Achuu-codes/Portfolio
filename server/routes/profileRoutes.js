import { Router } from "express";
import { profile } from "../data/profile.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(profile);
});

export default router;
