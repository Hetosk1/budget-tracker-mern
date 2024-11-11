import { useEffect, useState } from 'react'; 
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

ChartJS.register(ArcElement);

const BudgetPage = () => {
    const isLoggedIn = () => !!localStorage.getItem('bud-token');

    const [tableData, setTableData] = useState([]);
    const [user, setUser] = useState({});
    const [budget, setBudget] = useState(0);
    const [newBudgetName, setNewBudgetName] = useState("");
    const [newBudgetAmount, setNewBudgetAmount] = useState(0);
    const navigate = useNavigate();

    const fetchData = async () => {
        await axios.get('http://localhost:3000/budget', {
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

    const amountPlanned = () => {
        return tableData.reduce((total, data) => total + data.budgetLimit, 0);
    };

    const handleBudgetAmountChange = async (e) => {
        e.preventDefault();
        await axios.put('http://localhost:3000/user/', {
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
        await axios.post('http://localhost:3000/budget', {
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
        await axios.delete('http://localhost:3000/budget', {
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

    const redirectToPage = (data) => {
        navigate('/budget', { state: { _id: data._id } });
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

                    <div className="budget-planned">
                        Budget Planned: {amountPlanned()}
                    </div>

                    <div className="table-container">
                        <table cellSpacing={"5"} className="budget-table">
                            <thead>
                                <tr>
                                    <th>Budget Name</th>
                                    <th>Budget Limit</th>
                                    <th>Budget Spent</th>
                                    <th>Delete</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map(data => (
                                    <tr key={data._id}>
                                        <td>{data.budgetName}</td>
                                        <td>{data.budgetLimit}</td>
                                        <td>{data.budgetSpent}</td>
                                        <td><button onClick={() => removeBudget(data._id)}>&#9746;</button></td>
                                        <td><button onClick={() => redirectToPage(data)}>&#x1F58A;</button></td>
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

                    {/* Inline CSS */}
                    <style jsx>{`
                        .header {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }

                        .budget-input, .budget-planned, form {
                            margin-bottom: 20px;
                        }

                        input[type="number"], input[type="text"] {
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