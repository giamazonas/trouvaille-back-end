import { Router } from 'express'
import * as citiesCtrl from '../controllers/cities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ----------- Public Routes ----------- */ 

/* ----------- Private Routes ----------- */ 
router.use(decodeUserFromToken)

export {
  router
}