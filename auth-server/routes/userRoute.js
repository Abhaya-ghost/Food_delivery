const express = require('express')
const {registerController, authController, loginController, verifyOtpController, updateProfile} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
router = express.Router()

router.post('/register', registerController)
router.post('/getUser', protect, authController)
router.post('/login', loginController)
router.post('/verifyOtp', verifyOtpController)
router.put('/updateProfile', protect, updateProfile)

module.exports = router