import { Router } from "express";
import * as profilesCtrl from "../controllers/profiles.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get("/", checkAuth, profilesCtrl.index)
router.get("/itineraries/:id", checkAuth, profilesCtrl.showItineraries)
router.patch("/:profileId/:itineraryId", checkAuth, profilesCtrl.addItinerary)

export { router }
