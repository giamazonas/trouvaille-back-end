import { Router } from "express"
import * as citiesCtrl from "../controllers/cities.js"
import { decodeUserFromToken, checkAuth, isAdmin } from "../middleware/auth.js"

const router = Router()

/* ----------- Public Routes ----------- */
router.get("/", citiesCtrl.index)

/* ----------- Private Routes ----------- */

router.use(decodeUserFromToken);
router.post("/", checkAuth, citiesCtrl.create);
router.get("/:id", checkAuth, citiesCtrl.show);
router.put("/:id", checkAuth, citiesCtrl.update);
router.patch("/:cityId/:placeId", checkAuth, citiesCtrl.addPlace);
router.delete("/:id", checkAuth, citiesCtrl.delete);

router.use(decodeUserFromToken);
// router.use(isAdmin)


export { 
  router 
}
