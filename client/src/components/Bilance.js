import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';

import ExpensesForm from './expenses/ExpensesForm';
import ExpenseListItem from './expenses/ExpenseListItem';
import ExpensePercentage from  './expenses/ExpensePercentage';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetListItem from './budget/BudgetListItem';

import {ExpensesContext} from '../context/expenses/expensesState';
import {BudgetsContext} from '../context/budget/budgetState';
import {AuthContext} from '../context/auth/authState';
import {MonthContext} from '../context/month/monthState';



const Bilance = () => {

    const {expenses, getExpenses} = useContext(ExpensesContext);
    const {budgets, getBudgets} = useContext(BudgetsContext);
    const {token, loadUser} = useContext(AuthContext);
    const {setMonth, selectedMonth} = useContext(MonthContext);

    const history = useHistory();

    const [budgetSum, setBudgetSum] = useState(0);
    const [expensesSum, setExpensesSum] = useState(0);

    

    // console.log(month);
    useEffect(() => {
        getBudgets();
        getExpenses();
        loadUser();
        //eslint-disable-next-line
    },[]);
 

    useEffect(() => {
        if(!selectedMonth && budgets){
            setBudgetSum(budgets.reduce((acc, cv) => acc + parseInt(cv.amount), 0));
        }

        if(selectedMonth){
            setBudgetSum(selectedBudgets.reduce((acc, cv) => acc + parseInt(cv.amount), 0));
        }
        
    //eslint-disable-next-line
    }, [budgets, selectedMonth])
    
    useEffect(() => {
        if(!selectedMonth && expenses){
            setExpensesSum(expenses.reduce((acc, cv) => acc + parseInt(cv.amount), 0));
        }

        if(selectedMonth){
            setExpensesSum(selectedExpenses.reduce((acc, cv) => acc + parseInt(cv.amount), 0));
        }
        
    //eslint-disable-next-line
    }, [expenses, selectedMonth])

    
    //Auth redirect for login if the user is not login
    useEffect(()=>{
       if(!token){
        history.replace('/login')
       }
        // eslint-disable-next-line
    },[token])
    
  
    const onChangeMonth = (e) => setMonth( e.target.value )
    
    const resetSorting = () => history.go()

    const selectedBudgets = budgets ? budgets.filter((budget) => budget.month === selectedMonth ) : null
    const selectedExpenses = expenses ? expenses.filter((expense) => expense.month === selectedMonth ) : null

    return (
        <div className="bcg">
        <div className="budgetContainer">
            {/* LEFT SIDE */}
            <div className="leftSide">
                <form className="formMonths">
                    <h5> Sort Budget and Expense by Month</h5>
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
                <button id="resetSorting" onClick={resetSorting}>Reset Sorting</button>
                </form>
                <BudgetForm />   
                <div className="divList">
                    <ul className="list" id="budgetList">
                        {
                            !selectedMonth && budgets ? budgets.map((budget) => 
                            <BudgetListItem  key={budget._id} budget={budget} /> )
                            : selectedMonth && selectedBudgets.map((budget) => 
                            <BudgetListItem  key={budget._id} budget={budget} />) 
                        }
                    </ul>
                </div>            
            </div>  

            {/* RIGHT SIDE */}
             <div className="rightSide">
             <ExpensesForm  />             
                {/* display expenses */}
                <div className="divList">
                    <ul className="list">
                        {
                            !selectedMonth && expenses ? expenses.map((expense) => 
                            <ExpenseListItem  key={expense._id} expense={expense} /> ) 
                            : selectedMonth && selectedExpenses.map((expense) => 
                            <ExpenseListItem  key={expense._id} expense={expense} /> )
                        }
                    </ul>
                </div>
                 
            </div>
        </div>
            {/* DISPLAY BILANCE */}
            <div className="costsContainer">
                <div className="divBudget">
                    <h2 className="title">Budget</h2>
                    <p>{!budgets ? '0' : budgetSum  }</p>
                </div>
                <div className="divExpenses">
                    <h2 className="title">Expenses</h2>
                    <p>{!expenses ? '0' : expensesSum}</p>
                </div>
                <div className="divBalance">
                    <h2 className="title">Balance</h2>
                    <p className={budgetSum < expensesSum ? 'minusBln' : null}>
                        { budgetSum - expensesSum}
                    </p>
                </div>
            </div>
            {/* DISPLAY Percentage */}
            <div className="expPer">
                <h2> {expenses && 'Expense Percentage'}</h2>
                {  
                    !selectedMonth && expenses ? expenses.map((expense) => 
                    <ExpensePercentage key={expense._id} expense={expense} sumAmount={expensesSum}/> ) 
                    : selectedMonth && selectedExpenses.map((expense) => 
                    <ExpensePercentage key={expense._id} expense={expense} sumAmount={expensesSum}/> ) 
                } 
            </div> 
        </div> 
                
            


       
    )
}

export default Bilance

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
    