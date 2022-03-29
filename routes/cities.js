import { Router } from "express";
import * as citiesCtrl from "../controllers/cities.js";
import { decodeUserFromToken, checkAuth, isAdmin } from "../middleware/auth.js";

const router = Router();

/* ----------- Public Routes ----------- */
router.get("/", citiesCtrl.index);

/* ----------- Private Routes ----------- */
router.use(decodeUserFromToken);
router.post("/", checkAuth, isAdmin, citiesCtrl.create);
router.get("/:id", checkAuth ,citiesCtrl.show);
router.put("/:id/edit", checkAuth, isAdmin, citiesCtrl.update);
router.patch("/:cityId/:placeId", checkAuth, citiesCtrl.addPlace);
router.put("/:id/edit", checkAuth, isAdmin, citiesCtrl.edit);
router.delete("/:id", checkAuth, isAdmin, citiesCtrl.delete);

export { router };
