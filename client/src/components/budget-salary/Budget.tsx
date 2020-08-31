import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react'
import BudgetListItem from './BudgetListItem'
import ExpensePercentage from  './ExpensePercentage'
import {v4} from 'uuid';



export type ExpenseOBJ = {
    id: string,
    expensesName: string,
    amount: number,
}


const Budget = () => {

    const [expenses, setExpenses] = useState<ExpenseOBJ[]>(JSON.parse(localStorage.getItem('expenses') as string ) || [] )
    const [budget, setBudget] = useState(0)
    const [displayBudget, setDisplayBudget] = useState(0)
    const [expensesName, setExpensesName] = useState('') 
    const [amount, setAmount] = useState(0)
    const [sum, setSum] = useState(0)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
        setSum(expenses.reduce((acc, cv) => acc + cv.amount, 0))
        localStorage.setItem('expenses', JSON.stringify(expenses))

    }, [expenses])
    
    // console.log(expenses )
    // console.log(id )

  
    const setBudgetHendler = (e: ChangeEvent<HTMLInputElement>) => 
    setBudget(Math.abs(parseInt(e.target.value)))
    
    const submitBudget = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // setDisplayBudget(displayBudget )
        setDisplayBudget(displayBudget + budget)
        setBudget(0)
    }

    const setExpensesHendler = (e: ChangeEvent<HTMLInputElement>) => setExpensesName(e.target.value)

    const setAmountHendler = (e: ChangeEvent<HTMLInputElement>) => 
    setAmount(Math.abs(parseInt(e.target.value)))

    const submitExpenses = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault()

        if(edit){
            let editExpense = expenses.map((expense) => id === expense.id 
            ? {...expense, expensesName, amount} : expense )

            setEdit(false) 
            setExpensesName('')
            setAmount(0)

            return setExpenses(editExpense)

        }

        setExpenses([...expenses, {id: v4(), expensesName, amount}])

        setExpensesName('')
        setAmount(0)
    }

    const deleteHendler = (Id: string) => {
        let expencesFilter = expenses.filter(expence => expence.id !== Id) 
        setExpenses( expencesFilter );
    
    }

    const editHendler = (Id: string) => {
        let expense = expenses.find(item => item.id === Id);
        let {expensesName, amount} = expense as ExpenseOBJ;
        setExpensesName(expensesName);
        setAmount(amount);
        setEdit(true);
        setId(Id);
    }
    
    const editCancle = () => {
        setEdit(false);
        setExpensesName('')
        setAmount(0)

    }

    const clearItems = () => setExpenses([]);
    const resetBudget = () => setDisplayBudget(0);
   //---------------------------------------------------------------------------------------------


    
    
    let height100 = expenses.length && 'height100'


    return (
        <div className="bcg">
        <div className={`budgetContainer ${height100}`}>
            {/* LEFT SIDE */}
            <div className="leftSide">
                <form className="budgetForm" onSubmit={submitBudget}>
                    <h3>Budget</h3>
                    <div className="formGroup">
                        <input type="number" value={budget.toString()} onChange={setBudgetHendler}
                        className="inputForms" id="bgtInp" required/>
                    </div>
                    <button type="submit" onClick={resetBudget} className="btnHover btnForm" id="budgetReset">
                        Reset Budget
                    </button>
                    <button type="submit" className="btnForm btnHover" id="budgetSubmit">
                        Add Budget
                    </button>
                </form>
                <form className="expenseForm" onSubmit={submitExpenses}>
                    <h3>Expenses</h3>
                    <div className="formGroup">
                        <input type="text" value={expensesName} onChange={setExpensesHendler}
                        className="inputForms" id="expInp" maxLength={13} required
                        placeholder="Expense Name"/>
                    </div>
                    <h3>Amount</h3>
                    <div className="formGroup">
                        <input type="number" value={amount.toString()} onChange={setAmountHendler}
                        className="inputForms" id="amtInp" required/>
                    </div>
                    <button type="button" onClick={editCancle} className="btnForm btnHover" id="expenseCancel">
                        Cancel
                    </button>
                    <button type="submit"  className="btnForm btnHover" id="expenseSubmit">
                    Add Expenses
                    </button>
                </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="rightSide">
                <div className="costsContainer">
                    <div className="divBudget">
                        <h2 className="title">Budget</h2>
                        <p>{!displayBudget ? '0' : displayBudget}</p>
                    </div>
                    <div className="divExpenses">
                        <h2 className="title">Expenses</h2>
                        <p>{!expenses.length ? '0' : sum} </p>
                    </div>
                    <div className="divBalance">
                        <h2 className="title">Balance</h2>
                        <p>
                            {!expenses.length ? displayBudget : displayBudget - sum}
                        </p>
                    </div>
                </div>
            {/* display expenses */}
            <div className="divList">
            <ul className="list">
                
                {
                    expenses.map((expense) => {
                        return (
                            <BudgetListItem  key={expense.id} expenseO={expense} 
                                deleteHendler={deleteHendler}
                                editHendler={editHendler} />
                        )

                    })
                }
            </ul>
            </div>
            {
                expenses.length ? 
                <button className="btnClear btnHover" onClick={clearItems}>Clear</button> 
                : null
            }
            </div>
        </div>

        {/* PROGRESS BAR */}
        
            <div className="expPer">
                <h2>Expense Percentage</h2>
                {
                    expenses.map((expense) => {
                    return (
                        <ExpensePercentage key={expense.id} expenseName={expense.expensesName} 
                        amount={expense.amount} sumAmount={sum}/>
                    )

                    })

                }
            </div>
        </div>
     
        

       
    )
}

export default Budget
