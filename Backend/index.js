const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {initDatabase, UserSchema} = require('./schemas/db');
 
const userRouter = require('./routes/user');
const budgetRouter = require('./routes/budget');
const expenseRouter = require('./routes/expense');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

initDatabase();

app.get('/', (_request, _response) => {
    return _response.status(200).json("Welcome to the budget app");
});

app.use('/user', userRouter);
app.use('/budget', budgetRouter);
app.use('/expense', expenseRouter);

app.listen(PORT, () => {
    console.log(`server listening at port : ${PORT}`)
});