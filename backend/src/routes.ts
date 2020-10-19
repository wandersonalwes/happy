import { Router } from 'express'
import multer from 'multer'
import authMiddleware from './app/middlewares/auth'

import uploadConfig from './config/upload'
import OrphanagesController from './app/controllers/OrphanagesController'
import SessionsController from './app/controllers/SessionsController'
import UsersController from './app/controllers/UsersController'

const routes = Router()
const upload = multer(uploadConfig)

routes.post('/users', UsersController.create)
routes.post('/sessions', SessionsController.create)
routes.post('/forgot_password', SessionsController.forgotPassword)
routes.post('/reset_password', SessionsController.resetPassword)


routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

// routes.use(authMiddleware)

export default routes