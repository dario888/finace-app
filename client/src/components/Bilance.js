import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';

import ExpensesForm from './expenses/ExpensesForm'
import BudgetForm from '../components/budget/BudgetForm'
import ExpenseListItem from './expenses/ExpenseListItem'
import ExpensePercentage from  './expenses/ExpensePercentage'
import {ExpensesContext} from '../context/expenses/expensesState'

import {AuthContext} from '../context/auth/authState'





const Expenses = () => {

    const {expenses, getExpenses, clearExpanses, setMonth} = useContext(ExpensesContext);
    const {token, loadUser} = useContext(AuthContext);
    const history = useHistory();

    const [sum, setSum] = useState(0)

    // console.log(month);
    useEffect(() => {
        getExpenses();
        loadUser()
        //eslint-disable-next-line
    },[]);

    useEffect(() => {
        if(expenses){
            setSum(expenses.reduce((acc, cv) => acc + parseInt(cv.amount), 0));
            getExpenses();
        }
        
    //eslint-disable-next-line
    }, [expenses])

    
    //Auth redirect for login if the user is not login
    useEffect(()=>{
       if(!token){
        history.replace('/login')
       }
        // eslint-disable-next-line
    },[token])
    
  
    const onChangeMonth = (e) => setMonth( e.target.value )
    
    // let height100 = expenses ? 'height100' : null


    return (
        <div className="bcg">
        <div className="budgetContainer">
            {/* LEFT SIDE */}
            <div className="leftSide">
                <form className="formMonths">
                    <h4>Select Month</h4>
                    <select id="selectMonths"  onChange={onChangeMonth} >
                        <option className="opt">Months</option>
                        <option className="opt" value="January">January</option>
                        <option className="opt" value="February">February</option>
                        <option className="opt" value="March">March</option>
                        <option className="opt" value="April">April</option>
                        <option className="opt" value="May">May</option>
                        <option className="opt" value="June">June</option>
                        <option className="opt" value="July">July</option>
                        <option className="opt" value="August">August</option>
                        <option className="opt" value="September">September</option>
                        <option className="opt" value="October">October</option>
                        <option className="opt" value="November">November</option>
                        <option className="opt" value="December">December</option>
                    </select>
                </form>
                <BudgetForm />               
            </div>  

            {/* RIGHT SIDE */}
             <div className="rightSide">
             <ExpensesForm  />             
                {/* display expenses */}
                <div className="divList">
                    <ul className="list">
                        {
                            expenses ? expenses.map((expense) => {
                                return (
                                    <ExpenseListItem  key={expense._id} expense={expense} />
                                )

                            }) : null
                        }
                    </ul>
                </div>
                    {
                        expenses ? 
                        <button className="btnClear btnHover" onClick={clearExpanses}>Clear</button> 
                        : null
                    }
            </div>
        </div>
            {/* DISPLAY BILANCE */}
            <div className="costsContainer">
                <div className="divBudget">
                    <h2 className="title">Budget</h2>
                    <p>{'0'  }</p>
                </div>
                <div className="divExpenses">
                    <h2 className="title">Expenses</h2>
                    <p>0</p>{/* {!expenses.length ? '0' : sum}  */}
                </div>
                <div className="divBalance">
                    <h2 className="title">Balance</h2>
                    <p>
                        0{/* {!expenses.length ? displayBudget : displayBudget - sum} */}
                    </p>
                </div>
            </div>
            {/* DISPLAY Percentage */}
            <div className="expPer">
                <h2> {expenses && 'Expense Percentage'}</h2>
                {  
                    expenses ? expenses.map((expense) => 
                    <ExpensePercentage key={expense._id} expense={expense} sumAmount={sum}/> ) : null
                } 
            </div> 
        </div> 
                
            


       
    )
}

export default Expenses

     // const [month, setMonth] = useState('')
    // const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || [] )
    // const [budget, setBudget] = useState(0)
    // const [displayBudget, setDisplayBudget] = useState(0)
    // const [expensesName, setExpensesName] = useState('') 
    // const [amount, setAmount] = useState(0)
    // const [edit, setEdit] = useState(false)
    // const [id, setId] = useState('')

  
    // const setBudgetHendler = (e) => 
    // setBudget(Math.abs(parseInt(e.target.value)))
    
    // const submitBudget = (e) => {
    //     e.preventDefault()
    //     // setDisplayBudget(displayBudget )
    //     setDisplayBudget(displayBudget + budget)
    //     setBudget(0)
    // }

    // const setExpensesHendler = (e) => setExpensesName(e.target.value)

    // const setAmountHendler = (e) => 
    // setAmount(Math.abs(parseInt(e.target.value)))

    // const submitExpenses = (e) => { 
    //     e.preventDefault()

    //     if(edit){
    //         let editExpense = expenses.map((expense) => id === expense.id 
    //         ? {...expense, expensesName, amount} : expense )

    //         setEdit(false) 
    //         setExpensesName('')
    //         setAmount(0)

    //         return setExpenses(editExpense)

    //     }

    //     // setExpenses([...expenses, {id: v4(), expensesName, amount}])

    //     setExpensesName('')
    //     setAmount(0)
    // }

    // const deleteHendler = (Id: string) => {
    //     let expencesFilter = expenses.filter(expence => expence.id !== Id) 
    //     // setExpenses( expencesFilter );
    
    // }

    // const editHendler = (Id: string) => {
    //     let expense = expenses.find(item => item.id === Id);
    //     let {expensesName, amount} = expense;
    //     setExpensesName(expensesName);
    //     setAmount(amount);
    //     setEdit(true);
    //     setId(Id);
    // }
    
    // const editCancle = () => {
    //     setEdit(false);
    //     setExpensesName('')
    //     setAmount(0)

    // }

    // const clearItems = () => setExpenses([]);
    // const resetBudget = () => setDisplayBudget(0);
   //---------------------------------------------------------------------------------------------

//    if(!contacts && !loading){
//     return <h4>Please Add a Contact</h4>;
//     }
    