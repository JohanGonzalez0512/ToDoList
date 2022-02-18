const {validationResult} = require('express-validator')

const validateFileds = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok : false,
            msg : "There was an error while your petition was processed, verify it please",
            errors : errors.mapped()
        })
    }
    next()
}

module.exports = {
    validateFileds
};
