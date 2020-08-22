import React, {FC} from 'react'
import {ExpenseOBJ} from './Budget'



type Budget = {
    key: string, 
    expenseO: ExpenseOBJ, 
    deleteHendler: (ID: string) => void, 
    editHendler: (ID: string) => void,
   
}

const BudgetListItem:FC<Budget>= ({expenseO, deleteHendler, editHendler}) => {
    const {expensesName, amount, id} = expenseO
    return (
        <li className="item">
        <div className="info">
            <span className="expense">{expensesName}</span>
            <span className="amount">{amount}</span>
        </div>
        <div>
            {/* <button className="editBtn" aria-label="edit buton" onClick={()=>editHendler(id)}>
            </button> */}
            <span><i className="fas fa-home"></i></span>
            {/* <button className="deleteBtn" aria-label="delete buton" onClick={()=>deleteHendler(id)}>
                
            </button> */}
        </div>
        </li>
    )
}

export default BudgetListItem
