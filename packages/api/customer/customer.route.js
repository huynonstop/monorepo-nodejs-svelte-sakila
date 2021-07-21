import express from "express";
import {
  test,
  get,
  getAll,
  create,
  update,
  remove,
} from "./customer.controller.js";
import {
  createDTOValidatorMiddleware,
  updateDTOValidatorMiddleware,
} from "./customer.validator.js";
const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/:customerId", get);
router.post("/", createDTOValidatorMiddleware, create);
router.delete("/:customerId", remove);
router.patch("/:customerId", updateDTOValidatorMiddleware, update);
export default router;
