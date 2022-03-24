import { Router } from 'express'
import * as citiesCtrl from '../controllers/cities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()



/* ----------- Public Routes ----------- */ 
router.get('/', citiesCtrl.index)
router.get('/:id', citiesCtrl.show)


/* ----------- Private Routes ----------- */ 
router.use(decodeUserFromToken)
router.post('/add', checkAuth, citiesCtrl.create)
router.put('/:id/edit', checkAuth, citiesCtrl.update)
router.delete('/:id/edit', checkAuth, citiesCtrl.delete)

export {
  router
}