import express from "express";
import actorRoutes from "../actor/actor.route.js";
import customerRoutes from "../customer/customer.route.js";
const router = express.Router();

console.log("Loading actor routes");
router.use("/api/actor", actorRoutes);
router.use("/api/customer", customerRoutes);

export default router;
