const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {budgetModel, userModel} = require('../schemas/db');

const budgetRouter = express.Router();

budgetRouter.post('/', authMiddleware, async (_request, _response) => {

    console.log(_request.userID);
    const body = _request.body;

    try{

        const budget = await budgetModel.create({
            budgetName: body.budgetName,
            budgetLimit: body.budgetLimit,
            userId: _request.userID
        });

        return _response.json({
            "message": "budget inserted successfully",
            budget
        });

    } catch(e){

        return _response.json(e);

    }
});

budgetRouter.get('/', authMiddleware, async (_request, _response) => {
    const userID = _request.userID;
    console.log(userID);

    const budgets = await budgetModel.find({userId: userID});
    const user = await userModel.find({_id: userID});


    return _response.json({
        budgets,
        user
    });
});

budgetRouter.put('/', authMiddleware, async (_request, _response) => {
    const userID = _request.userID;
    const body = _request.body;

    try{
        const updatedBudget = await budgetModel.updateOne({
            _id: body._id 
        }, {
            budgetName: body.budgetName,
            budgetLimit: body.budgetLimit,
        });

        return _response.json({
            message: "Updation completed succcesfully",
            updatedBudget
        });  
    } catch(e){
        return _response.json(e);
    }
});

budgetRouter.delete('/',  async (_request, _response) => {
    const body = _request.body;
    console.log(body)
    const response =  await budgetModel.deleteOne({
        _id: body._id
    });
    return _response.json(response);
});

module.exports = budgetRouter;