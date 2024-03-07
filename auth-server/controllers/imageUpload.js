const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name : "djzrxxrct",
    api_key : "165646831326863",
    api_secret : "7G5NWjaYKnu2k4U27FxW2XbGPpA"
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