const express = require('express')
router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const { createOrder, markOrderAsDelivered, getSingleOrder, getAllOrders } = require('../controllers/orderController')

router.post('/createOrder', createOrder)
router.post('/getOrders', protect, getAllOrders)
router.post('/getOrder', protect, getSingleOrder)
router.post('/delivered', protect, markOrderAsDelivered)

module.exports = router