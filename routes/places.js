import { Router } from 'express'
import * as placesCtrl from '../controllers/places.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ----------- Public Routes ----------- */ 

/* ----------- Private Routes ----------- */ 
router.use(decodeUserFromToken)

export {
  router
}