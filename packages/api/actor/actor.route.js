import express from "express";
import {
  test,
  get,
  getAll,
  create,
  update,
  remove,
} from "./actor.controller.js";
import {
  createDTOValidatorMiddleware,
  updateDTOValidatorMiddleware,
} from "./actor.validator.js";

const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/:actorId", get);
router.post("/", createDTOValidatorMiddleware, create);
router.delete("/:actorId", remove);
router.patch("/:actorId", updateDTOValidatorMiddleware, update);
export default router;
