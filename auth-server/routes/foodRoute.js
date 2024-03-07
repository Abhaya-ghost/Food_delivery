const express = require('express')
router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const { createFood, getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCategory, getTopRating } = require('../controllers/foodController')

router.post('/addfood', protect, createFood)
router.get('/getAllFoods', getAllFoods)
router.get('/getFood/:id', getFoodById)
router.get('/getNewFoods', getNewFoods)
router.get('/specialFoods', getFoodsFromDistinctCategory)
router.get('/getTopRated', getTopRating)

module.exports = router
