import { Router } from 'express'
import * as itinerariesCtrl from '../controllers/itineraries.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ----------- Public Routes ----------- */ 
router.get('/:id', itinerariesCtrl.show)
router.get('/', itinerariesCtrl.index)

/* ----------- Private Routes ----------- */ 
router.use(decodeUserFromToken)
router.post('/', checkAuth, itinerariesCtrl.create)
router.put('/:id', checkAuth, itinerariesCtrl.update)
router.delete('/:id', checkAuth,itinerariesCtrl.delete)

export {
  router
}