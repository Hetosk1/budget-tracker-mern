const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../schemas/jwt');
const userRouter = express.Router();
const {userModel} = require('../schemas/db');

userRouter.get('/', (_request, _response) => {

    return _response.status(200).json({
        "Message": "Welcome to the user route"
    });

})

userRouter.put('/', async (_request, _response) => {
    const body = _request.body.body;
    

    const updatedUser = await userModel.updateOne({
        _id: body._id
    }, {
        name: body.name,
        email: body.email,
        password: body.password,
        amount: body.amount
    });

    console.log(updatedUser)

    return _response.json({
        "message": "user updated succesfully",
        updatedUser
    });
});

userRouter.post('/signup', async (_request, _response) => {

    const body = _request.body;

    const doesEmailExist = await userModel.findOne({
        email: body.email
    });

    if(doesEmailExist){
        return _response.status(400).json({
            "Error": "Email already exist"
        });
    }
    
    else{
        const userInsertedConfirmation = await userModel.create({
            email: body.email,
            name: body.name,
            password: body.password
        });

        if(!userInsertedConfirmation){
            return _response.status(500).json({
                "Error": "Some internal Erro, Please try again"
            });
        } else {
            return _response.status(200).json({
                "Message": "User Created successfully"
            });
        }
    }

})

userRouter.post('/signin', async (_request, _response) => {

    const body = _request.body;

    const userFound = await userModel.findOne({
        email: body.email,
        password: body.password,
    });

    if(userFound){


        const token = jwt.sign({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            password: userFound.password,
        }, JWT_SECRET);

        console.log(token);
        console.log('singin ni andar');

        return _response.json({
            "Message": "Access granted",
            "Token": token,
            "Data": userFound 
        });

    } else {

        return _response.status(404).json({
            "Message": "Access Denied, Invalid credentials"
        });

    }

});

module.exports = userRouter;