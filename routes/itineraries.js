import { Router } from "express";
import * as itinerariesCtrl from "../controllers/itineraries.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/* ----------- Public Routes ----------- */
router.get("/", itinerariesCtrl.index);
router.get("/:id", itinerariesCtrl.show);

/* ----------- Private Routes ----------- */
router.use(decodeUserFromToken);
router.post("/add", checkAuth, itinerariesCtrl.create);
router.put("/:id", checkAuth, itinerariesCtrl.update);
router.delete("/:id", checkAuth, itinerariesCtrl.delete);

export { router };
