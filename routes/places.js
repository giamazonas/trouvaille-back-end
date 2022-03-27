import { Router } from "express";
import * as placesCtrl from "../controllers/places.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/* ----------- Public Routes ----------- */
router.get("/", placesCtrl.index);
router.get("/:id", placesCtrl.show);

/* ----------- Private Routes ----------- */
router.use(decodeUserFromToken);
router.post("/", checkAuth, placesCtrl.create);
router.put("/:id", checkAuth, placesCtrl.update);
router.delete("/:id", checkAuth, placesCtrl.delete);

router.post('/:id/comments', checkAuth, placesCtrl.createReview);

export { router };
