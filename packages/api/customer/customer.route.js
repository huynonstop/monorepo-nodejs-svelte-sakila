import express from "express";
import {
  test,
  get,
  getAll,
  create,
  update,
  remove,
} from "./customer.controller.js";
const router = express.Router();

router.get("/test", test);

router.get("/", getAll);
router.get("/:customerId", get);
router.post("/", create);
router.delete("/:customerId", remove);
router.patch("/:customerId", update);
export default router;
