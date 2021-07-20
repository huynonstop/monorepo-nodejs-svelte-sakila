import express from "express";
import {
  test,
  get,
  getAll,
  create,
  update,
  remove,
} from "./actor.controller.js";
const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/:actorId", get);
router.post("/", create);
router.delete("/:actorId", remove);
router.patch("/:actorId", update);
export default router;
