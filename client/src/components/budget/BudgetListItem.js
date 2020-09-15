import React, {useContext} from 'react';
import {BudgetsContext} from '../../context/budget/budgetState'



const BudgetListItem = ({budget}) => {

    const {deleteBudget, setCurrentBudget, clearCurrentBudget} = useContext(BudgetsContext);
    const {_id, amount, month} = budget;

    const onDelete = () => {
        deleteBudget(_id);
        clearCurrentBudget();
    }


    return (
        <li className="item">
        <p className="amountSpan">{amount} <span>den</span></p>
        <p className="amountSpan">{month}</p>
 
        <button className="editBtn" onClick={() => setCurrentBudget(budget)}>
            <span><i className="far fa-edit"></i></span>
        </button>
        <button className="deleteBtn"  onClick={onDelete}>
        <span><i className="fas fa-trash-alt"></i></span>
        </button>
    </li>
    )
}

export default BudgetListItem
