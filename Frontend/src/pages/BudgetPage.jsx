import { useEffect, useState } from 'react'; 
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Backend} from '../../backend';

const backend = import.meta.env.VITE_BACKEND_URL; 

const BudgetPage = () => {
    const isLoggedIn = () => !!localStorage.getItem('bud-token');

    const [tableData, setTableData] = useState([]);
    const [user, setUser] = useState({});
    const [budget, setBudget] = useState(0);
    const [newBudgetName, setNewBudgetName] = useState("");
    const [newBudgetAmount, setNewBudgetAmount] = useState(0);
    const [expenseId, setExpenseId] = useState('');
    const [expenseTableData, setExpenseTableData] = useState([]);
    const [expenseTableDataFiltered, setExpenseTableDataFiltered] = useState([]);
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [selectedBudgetLimit, setSelectedBudgetLimit] = useState(0);
    const [spentSelectedBudgetLimit, setSpentSelectedBudgetLimit] = useState(0);

    const navigate = useNavigate();

    const fetchData = async () => {
        await axios.get(`${backend}/budget`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('bud-token')}` 
            },
        })
        .then(response => {
            setUser(response.data.user);
            setTableData(response.data.budgets);
            setBudget(response.data.user[0].amount);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });

    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchExpenseData = async () => {
        console.log('le maro full hour')
        await axios.get(`${backend}/expense`, {
            params: {
                budgetId: expenseId
            }
        })
        .then(response => {
            console.log(response)
            setExpenseTableDataFiltered(response.data.expenses)
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchExpenseData();
    }, [expenseId]) ;

    const amountPlanned = () => {
        return tableData.reduce((total, data) => total + data.budgetLimit, 0);
    };

    const moneySpent = () => {
        return expenseTableDataFiltered.reduce((total, data) => total + data.expenseAmount, 0);
    }

    const handleBudgetAmountChange = async (e) => {
        e.preventDefault();
        await axios.put(`${backend}/user/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('bud-token')}`,
                'Content-Type': 'application/json'
            },
            body: {
                _id: user[0]._id,
                name: user[0].name,
                email: user[0].email,
                password: user[0].password,
                amount: budget
            }
        })
        .then(response => {
            toast.success('Budget Amount Changed');
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleBudgetAdd = async (e) => {
        e.preventDefault();
        if(newBudgetAmount > (budget - amountPlanned())){
            toast.error('pikina aukat ma rene ')
            return 
        }
        e.preventDefault();
        await axios.post(`${backend}/budget`, {
            budgetName: newBudgetName,
            budgetLimit: newBudgetAmount
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('bud-token')}` 
            }
        })
        .then(response => {
            console.log(response);
            toast.success('New budget added');
            fetchData(); // Refresh table data after adding a new budget
        })
        .catch(error => {
            console.log(error);
        });
    };

    const removeBudget = async (_id) => {
        await axios.delete(`${backend}/budget`, {
            data: { _id },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('bud-token')}`,
                'Content-Type': 'application/json'
            }
        })
       .then(response => {
           console.log(response);
           fetchData(); // Refresh table data after removing a budget
       })
       .catch(error => {
           console.log(error);
       });
    };

    const AddExpense = async () => {

        let budget = 0;
        tableData.map(data => {
            if(data._id == expenseId){
                budget = data.budgetLimit;
            }
        })


        if(expenseAmount > budget - moneySpent()){
            toast.error('expense limit reached');
            return ;
        } else {
            console.warn('lodo maro')
        }

        await axios.post(`${backend}/expense/`, {
            expenseName: expenseName,
            expenseAmount: expenseAmount,
            budgetId: expenseId
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        console.log(expenseAmount);
        console.log(expenseName);
        fetchExpenseData();
    }

    const removeExpense = async (expenseId) => {
        await axios.delete(`${backend}/expense/`, {
            expenseId: expenseId
        })
        .then(response => {
            console.log(response);
            fetchExpenseData();
        })
        .catch(error => {
            console.log(error);
        })
    };

    return (
        <>
            {isLoggedIn() ? 
                <>
                    <div className="header">Budget Dashboard</div>

                    <div className="budget-input">
                        <form onSubmit={handleBudgetAmountChange}>
                            <input 
                                value={budget} 
                                onChange={(e) => setBudget(e.target.value)} 
                                type="number" 
                                placeholder="Set Budget Amount"
                            />
                            <button type="submit">Save</button>
                        </form>
                    </div>

                    <div className="">
                        Budget Planned: {amountPlanned()}
                    </div>

                    <div className=''>
                        Budget Left: {budget - amountPlanned()}
                    </div>

                    <div className="table-container">
                        <table cellSpacing={"5"} className="budget-table">
                            <thead>
                                <tr>
                                    <th>Budget Name</th>
                                    <th>Budget Limit</th>
                                    <th>Budget Spent</th>
                                    <th>Delete</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map(data => (
                                    <tr key={data._id}>
                                        <td>{data.budgetName}</td>
                                        <td>{data.budgetLimit}</td>
                                        <td>{data.budgetSpent}</td>
                                        <td><button onClick={() => removeBudget(data._id)}>&#9746;</button></td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>

                    <form onSubmit={handleBudgetAdd}>
                        <input 
                            type="text" 
                            placeholder='Budget Name' 
                            onChange={(e) => setNewBudgetName(e.target.value)} 
                            required
                        />
                        <input 
                            type="number" 
                            placeholder='Budget Amount' 
                            onChange={(e) => setNewBudgetAmount(e.target.value)} 
                            required
                        />
                        <button type="submit">Add Budget</button>
                    </form> 

                    <hr />

                    <div>
                        <h2>Add a Expense</h2>
                        {/* <form action="">
                            <select onChange={(e) => setExpenseId(e.target.value)} value={expenseId} name="" id="">
                                <option value="">---</option>
                                {tableData.map(data => (
                                    <option value={data._id}>{data.budgetName}</option>
                                ))}
                            </select>
                        </form> */}

                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            AddExpense()
                        }}>
                            <select onChange={(e) => setExpenseId(e.target.value)} value={expenseId} name="" id="">
                                <option value="">---</option>
                                {tableData.map(data => (
                                    <option value={data._id}>{data.budgetName}</option>
                                ))}
                            </select>

                            <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} name="" id="" placeholder="Expense Name"/>
                            <input type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} name="" id="" placeholder="Expense Amount"/>
                            {expenseTableDataFiltered ? <button>Add Expense</button> : <button disabled>Add Expense</button>}
                        </form>

                        {expenseTableDataFiltered ? 

                            <div>
                                <div>Expense Limit : {tableData.map(data => {
                                    if(data._id == expenseId) return data.budgetLimit
                                })}</div> <div>Money spent : { moneySpent()}</div>
                                <br />
                                <table className='budget-table'>
                                <thead>
                                    <tr>
                                        <th>Expense Name</th>
                                        <th>Expense Amount</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseTableDataFiltered.map(data => (
                                        <tr>
                                            <td>{data.expenseName}</td>
                                            <td>{data.expenseAmount}</td>
                                            <td><button onClick={(e) => {
                                                e.preventDefault();
                                                console.log(data._id)
                                                removeExpense(data._id)
                                            }}>&#9746;</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>

                            : 

                            <div>Lemaro</div>

                        }


                    </div>



                    {/* Inline CSS */}
                    <style jsx>{`

                        h2{
                            font-size: 24px;
                            font-weight: bold;
                        }

                        .header {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }

                        .budget-input, .budget-planned, form {
                            margin-bottom: 20px;
                        }

                        input[type="number"], input[type="text"], select{
                            padding: 10px;
                            margin-right: 10px;
                            border-radius: 5px;
                            border: 1px solid #ccc;
                        }

                        button {
                            padding: 10px 15px;
                            border-radius: 5px;
                            border: none;
                            background-color: #007bff;
                            color: white;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }

                        button:hover {
                            background-color: #0056b3;
                        }

                        .table-container {
                            margin-top: 20px;
                        }

                        .budget-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }

                        .budget-table th, .budget-table td {
                            border: 1px solid #ccc;
                            padding: 10px;
                            text-align: left;
                        }

                        .budget-table th {
                            background-color: #f4f4f4;
                        }
                    `}</style>

                </> : 
                <> 
                    <NotLoggedin /> 
                </>
            }
        </>
    );
};

export default BudgetPage;

const NotLoggedin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    }, []);
    
    return null; // No UI to render
};
