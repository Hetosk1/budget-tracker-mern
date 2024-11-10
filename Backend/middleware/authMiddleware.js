const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../schemas/jwt');

function authMiddleware(_request, _response, _next) {

    
    const token = _request.headers.authorization;
    console.log(_request)
    console.log(token);


    if(!token){
        return _response.status(401).json({
            "Message": "Token not found in the headers"
        });
    } 

    const rawToken = token.split(' ')[1];


    try{

        const decoded = jwt.verify(rawToken, JWT_SECRET);
        _request.email = decoded.email;
        _request.userID = decoded.id;
        console.log(`😶‍🌫️😶‍🌫️`)
        console.log(decoded)
        _next();

    } catch(error){

        return _response.json({
            error
        });

    }

}

module.exports = authMiddleware;