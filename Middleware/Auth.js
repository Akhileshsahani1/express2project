 const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    let decodeToken;
      
if (!authHeader) {
    req.isAuth = false
    return res.status(401).json({status: 0, message: "request not authorize."})
}


    const token = authHeader.split(' ')[1]
    if (! token || token == '') {
        return res.status(401).json({status: 0, message: "request not authorize."})
    }

    try {
        decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({status: 0, message: "request not authorize."})
    }
    req.userId = decodeToken.userId
    next()
}

