const Food = require("../models/foodModel")

const createFood = async (req, res) => {
    try {
        const { name, price, description, category, weight, foodImg } = req.body
        const newFood = new Food({
            name,
            price,
            description,
            category,
            weight,
            foodImg,
        })

        const saveFood = newFood.save()
        res.status(200).json({
            message: "Food successfully added",
            success: true,
            data: {
                food: saveFood
            }
        })
    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error`,
            success: false,
        })
    }
}

const getAllFoods = async (req, res) => {
    try {
        const { category } = req.query
        if (category === 'all') {
            const foodItems = await Food.find()

            res.status(200).json({
                message: "Food successfully added",
                success: true,
                data: {
                    food: foodItems
                }
            })
        } else {
            const foodItems = await Food.find({ category: category })
            res.status(200).json({
                message: "Food successfully added",
                success: true,
                data: {
                    food: foodItems
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error`,
            success: false,
        })
    }
}

const getFoodById = async (req, res) => {
    try {
        const { id } = req.params
        const foodItem = await Food.findById(id)

        res.status(200).json({
            message: "Food details",
            success: true,
            data: {
                food: foodItem
            }
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error`,
            success: false,
        })
    }
}

const getNewFoods = async (req, res) => {
    try {
        const foodItems = await Food.find().sort({createdAt : -1}).limit(12)

        res.status(200).json({
            message: "12 register food showing",
            success: true,
            data: {
                food: foodItems
            }
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error`,
            success: false,
        })
    }
}

const getFoodsFromDistinctCategory = async (req, res) => {
    try {
        const distinctCategory = await Food.distinct('category')
        const distinctFood = await Promise.all(
            distinctCategory.slice(0,8).map(async(category) => {
                const food = await Food.findOne({category})
                return food
            })
        )

        res.status(200).json({
            message: "4 different category",
            success: true,
            data: {
                food: distinctFood
            }
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error`,
            success: false,
        })
    }
}

const getTopRating = async (req, res) => {
    try {
        const topRatedFoods = await Food.find().sort({'reviews.rating' : -1}).limit(4)

        res.status(200).json({
            message: "Top Foods",
            success: true,
            data: {
                food: topRatedFoods
            }
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal Server Error`,
            success: false,
        })
    }
}

module.exports = { createFood, getAllFoods, getFoodById, getNewFoods, getFoodsFromDistinctCategory, getTopRating }