import { Router } from 'express'
import * as itinerariesCtrl from '../controllers/itineraries.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ----------- Public Routes ----------- */ 

/* ----------- Private Routes ----------- */ 
router.use(decodeUserFromToken)

export {
  router
}