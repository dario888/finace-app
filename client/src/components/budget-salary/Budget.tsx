import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react'
import BudgetListItem from './BudgetListItem'
import {v4} from 'uuid';



export type ExpenseOBJ = {
    id: string,
    expensesName: string,
    amount: number
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

  
    const setBudgetHendler = (e: ChangeEvent<HTMLInputElement>) => setBudget(parseInt(e.target.value))
    
    const submitBudget = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisplayBudget(budget)
        setBudget(0)
    }

    const setExpensesHendler = (e: ChangeEvent<HTMLInputElement>) => setExpensesName(e.target.value)

    const setAmountHendler = (e: ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value))

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
   
    
    
    let height100 = expenses.length >= 3 && 'height100'


    return (
       
        <div className={`budgetContainer ${height100}`}>
            <div className="leftSide">
                <form className="budgetForm" onSubmit={submitBudget}>
                    <h3>Budget</h3>
                    <div className="formGroup">
                        <input type="number" value={budget.toString()} onChange={setBudgetHendler}
                        className="inputForms" id="bgtInp" required/>
                    </div>
                    <button type="submit" className="btnForm" id="budgetSubmit">
                        Add Budget
                    </button>
                </form>
                <form className="expenseForm" onSubmit={submitExpenses}>
                    <h3>Expenses</h3>
                    <div className="formGroup">
                        <input type="text" value={expensesName} onChange={setExpensesHendler}
                        className="inputForms" id="expInp" maxLength={13} required/>
                    </div>
                    <h3>Amount</h3>
                    <div className="formGroup">
                        <input type="number" value={amount.toString()} onChange={setAmountHendler}
                        className="inputForms" id="amtInp" required/>
                    </div>
                    <button type="button" onClick={editCancle} className="btnForm " id="expenseSubmit">
                        Cancel
                    </button>
                    <button type="submit"  className="btnForm " id="expenseSubmit">
                    Add Expenses
                    </button>
                </form>
            </div>
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
            {
                expenses.length ? 
                <button className="btnClear" onClick={clearItems}>Clear</button> 
                : null
            }
            </div>
        </div>

       
    )
}

export default Budget
