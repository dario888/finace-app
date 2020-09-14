import React, {useContext} from 'react';
import {ExpensesContext} from '../../context/expenses/expensesState';





const ExpenseListItem = ({expense}) => {

    const { deleteExpense, currentExpense, clearCurrent} = useContext(ExpensesContext);
    const {_id, expensesName, amount, month} = expense;

    const onDelete = () => {
        deleteExpense(_id);
        clearCurrent();
    }

    return (
        <li className="item">
            <p className="expenseSpan">{expensesName}</p>
            <p className="amountSpan">{amount}</p>
            <p className="amountSpan">{month}</p>
     
            <button className="editBtn" onClick={() => currentExpense(expense)}>
                <span><i className="far fa-edit"></i></span>
            </button>
            <button className="deleteBtn"  onClick={onDelete}>
            <span><i className="fas fa-trash-alt"></i></span>
            </button>
        </li>
    )
}

export default ExpenseListItem;
