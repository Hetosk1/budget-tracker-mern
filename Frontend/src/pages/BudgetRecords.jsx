import {useLocation, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

const api = import.meta.env.VITE_API_URL;

const BudgetRecords = (props) => {
    const location = useLocation();
    const budgetID = location.state?._id; // Get budget ID from state
    const navigate = useNavigate();

    const isLoggedin = () => !!localStorage.getItem('bud-token');

    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseName, setExpenseName] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!isLoggedin()) {
            toast.error('You must be logged in to access this page.');
            navigate('/login');
            return; // Exit early if not logged in
        }

        if (!budgetID) {
            console.log('Not a valid redirection');
            navigate('/dashboard');
            return; // Exit early if no budget ID
        }

        fetchData(); // Fetch data only if logged in and budget ID is valid
    }, [budgetID]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${api}:3000/expense`, {
                params: { budgetId: budgetID }
            });
            setData(response.data || []); // Ensure data is an array
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch expenses.');
        }
    };

    const handleExpenseAdd = async (e) => {
        e.preventDefault();
        if (!expenseName || !expenseAmount) {
            toast.error('Please fill in both fields.');
            return;
        }

        try {
            await axios.post(`${api}:3000/expense`, {
                expense_name: expenseName,
                expense_price: expenseAmount,
                budgetId: budgetID // Include budget ID when adding expense
            });
            toast.success('Expense added successfully.');
            fetchData(); // Refresh data after adding
        } catch (error) {
            console.error(error);
            toast.error('Failed to add expense.');
        }
    };

    return (
        <>
            <div className="header">Budget Editor</div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Expense Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item._id}>
                                <td>{item.expense_name}</td>
                                <td>{item.expense_price}</td>
                                <td><button>&#9746;</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form onSubmit={handleExpenseAdd}>
                    <input 
                        type="text" 
                        value={expenseName} 
                        placeholder="Expense Name"
                        required
                    />
                    <input 
                        type="number" 
                        value={expenseAmount} 
                        placeholder="Expense Amount"
                        required
                    />
                    <button type="submit">Add Expense</button>
                </form>
            </div>

            {/* Inline CSS */}
            {/* Add your inline CSS here */}
        </>
    );
};

export default BudgetRecords;
