import React  from 'react'





const ExpenseListItem = ({expenseO, deleteHendler, editHendler}) => {
    const {expensesName, amount, id} = expenseO
    return (
        <li className="item">
            <p className="expenseSpan">{expensesName}</p>
            <p className="amountSpan">{amount}</p>
     
            <button className="editBtn"  onClick={()=>editHendler(id)}>
                <span><i className="far fa-edit"></i></span>
            </button>
            <button className="deleteBtn"  onClick={()=>deleteHendler(id)}>
            <span><i className="fas fa-trash-alt"></i></span>
            </button>
        </li>
    )
}

export default ExpenseListItem;
