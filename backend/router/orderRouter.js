import express from 'express'
import { createCheckOutSession, getOrders } from '../controller/oderControler.js'
import { isAuth } from '../middlewares/isAuthenticated.js'

let router = express.Router()

router.route("/createCheckOutSession").post(isAuth,createCheckOutSession)
router.route("/getOrders").get(isAuth,getOrders)

export default router;

