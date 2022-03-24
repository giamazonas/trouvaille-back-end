import { Router } from 'express'
import * as placesCtrl from '../controllers/places.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ----------- Public Routes ----------- */ 
router.get('/:id', placesCtrl.show)
router.get('/', placesCtrl.index)

/* ----------- Private Routes ----------- */ 
router.use(decodeUserFromToken)
router.post('/', checkAuth, placesCtrl.create)
router.put('/:id', checkAuth, placesCtrl.update)
router.delete('/:id', checkAuth,placesCtrl.delete)

export {
  router
}