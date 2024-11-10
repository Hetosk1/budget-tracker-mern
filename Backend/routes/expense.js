const express = require("express");
const { expenseModel, userModel } = require("../schemas/db");
const expenseRouter = express.Router();

expenseRouter.get('/', async (_request, _response) => {
    try{
        const expenses = await expenseModel.find({
            budgetId: _request.body.budgetId
        });
        return _response.json({
            message: "expenses fetched succesfully",
            expenses
        });
    } catch(e){
        return _response.json({
            e
        });
    }

});

expenseRouter.post('/', async (_request, _response) => {
    const body = _request.body;
    try{
        const expense = await expenseModel.create({
            expenseName: body.expenseName,
            expenseAmount: body.expenseAmount,
            budgetId: body.budgetId
        });

        return _response.json({
            "message": "Expense Created successfull",
            expense
        });
    }  catch(e){
        return _response.json({
            e
        });
    }
});

expenseRouter.put('/', async (_request, _response) => {
    const body = _request.body;
    console.log(body);
    try{
        const updatedExpense = await expenseModel.updateOne({}, {
            expenseName: body.expenseName,
            expenseAmount: body.expenseAmount,
            budgetId: body.budgetId,
        });

        return _response.json({
            updatedExpense
        });
    } catch(e){
        return _response.json({
            e
        });
    }
});

module.exports = expenseRouter;