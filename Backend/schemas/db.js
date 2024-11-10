const mongoose = require('mongoose');
const MONGOOSE_URI = "mongodb://127.0.0.1:27017/budgetTracker";

const initDatabase = async () => {

    mongoose.connect(MONGOOSE_URI)
    .then(() => {
        console.log(`Connected to Database`);
    })
    .catch((_error) => {
        console.log(`Error connecting to database : ${_error}`);
    });

};

const ExpenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    budgetId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});

const BudgetSchema = new mongoose.Schema({
    budgetName: {
        type: String,
        required: true
    },
    budgetLimit: {
        type: Number, 
        required: true
    },
    budgetSpent: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    }
});

const expenseModel = mongoose.model("expense", ExpenseSchema);
const budgetModel = mongoose.model("budget", BudgetSchema);
const userModel = mongoose.model("user", userSchema);

module.exports = {
    initDatabase,
    expenseModel,
    budgetModel,
    userModel
};