const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

const imageUploadController = async (req,res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        })        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {imageUploadController}