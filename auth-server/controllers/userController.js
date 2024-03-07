const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')

const registerController = async(req,res) => {
    try {
        const exisitingUser = await User.findOne({email : req.body.email})
        if(exisitingUser){
            return res.status(200).send({
                message : 'User already exist',
                success : false,
            })
        }
        const password =req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        req.body.password = hashPassword

        const hashConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt)

        const otp = otpGenerator.generate(6, {
            digits:true,
            upperCase : false,
            specialChars : false,
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
        })

        req.body.confirmPassword = hashConfirmPassword
        if(req.body.password === req.body.confirmPassword){
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                profileImg : req.body.profileImg,
                password : hashPassword,
                confirmPassword : hashConfirmPassword,
                otp:otp,
            })
            await newUser.save()

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
                expiresIn: '1d',
            })

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth : {
                    user : 'abhayajeet02@gmail.com',
                    pass : 'kvwbenhcjfiohtva'
                }
            })

            const mailOptions = {
                from : 'Auth client webdev warriors',
                to : req.body.email,
                subject : 'Otp for email verification',
                text : `Your otp is ${otp}`,
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                    return res.status(500).send('Error sending email...')
                }
                res.send({
                    message: 'OTP sent to your registered email'
                })
            })

            return res.status(201).send({
                message: 'Register Successfully',
                data : {
                    user : newUser,
                    token, 
                },
                success : true,
            })
        }else{
            return res.status(201).send({
                message: "Password doesn't match",
                success : false,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : 'Register error',
            success : false
        })
    }
}

const authController = async (req,res) => {
    try {
        const user = await User.findOne({_id : req.body.userId})
        if(!user){
            return res.status(200).send({
                success : false,
                message : `USer not found`
            })
        }else{
            return res.status(200).send({
                success : true,
                message : `Register Successfully`,
                data : {
                    user,
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : `Auth error`
        })
    }
}

const loginController = async(req,res) => {
    try {
        const user = await User.findOne({email : req.body.email}).select('+password')

        if(!user){
            return res.status(404).send({
                success : false,
                message : `User not found`
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        const signUser = await User.findOne({email : req.body.email})

        if(!isMatch){
            return res.status(500).send({
                success : false,
                message : `Invalid password and email`
            })
        }

        const token = jwt.sign({id: signUser._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        return res.status(201).send({
            message: 'Login Successfully',
            data : {
                user : signUser,
                token, 
            },
            success : true,
        })
    } catch (error) {
        return res.status(500).send({
            success : false,
            message : `Login error`
        })
    }
}

const verifyOtpController = async(req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(user.otp === req.body.combineOtp){
            user.isVerified = true
            await user.save()
            return res.status(200).send({
                success :true,
                message : `OTP verified`
            })
        }else{
            return res.status(201).send({
                success : false,
                message : `OTP not verified`
            })
        }
    } catch (error) {
        res.status(500).send({
            success : false,
            message : `failed to verified`
        })
    }
}

const updateProfile = async(req,res) => {
    try {
        const {name, profileImg, userId, street, city, state, zipcode, country} = req.body 
        const user = await User.findById(userId)
        
        if(!user){
            return res.status(404).send({
                success : false,
                message : `User not found`
            })
        }

        user.name = name || user.name
        user.profileImg = profileImg || user.profileImg
        user.street = street || user.street
        user.city = city || user.city
        user.state = state || user.state
        user.zipcode = zipcode || user.zipcode
        user.country = country || user.country

        await user.save()
        return res.status(201).send({
            success : true,
            message : `Profile Updated`
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : `Profile Updation failed`
        })
    }
}

module.exports = {registerController, authController, loginController, verifyOtpController, updateProfile}