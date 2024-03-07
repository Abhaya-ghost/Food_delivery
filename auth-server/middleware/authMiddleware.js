const jwt = require('jsonwebtoken')

const protect =async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err){
                return res.status(404).send({
                    success : false,
                    message : `Auth failed`
                })
            }else{
                req.body.userId = decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success : false,
            message : `Auth error`
        })
    }
}

module.exports = {protect}