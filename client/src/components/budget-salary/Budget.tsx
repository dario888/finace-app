import React, {} from 'react'

const Budget = () => {
    return (
       
        <div className="budgetContainer">
            <div className="leftSide">
                <form className="budgetForm">
                    <h3>Budget</h3>
                    <div className="formGroup">
                        <input type="number" className="inputForms" id="budgetInput"/>
                    </div>
                    <button type="submit" className="btnForm" id="budgetSubmit">
                        Add Budget
                    </button>
                </form>
                <form className="expenseForm">
                    <h3>Expenses</h3>
                    <div className="formGroup">
                        <input type="text" className="inputForms" id="expensesInput"/>
                    </div>
                    <h3>Amount</h3>
                    <div className="formGroup">
                        <input type="number" className="inputForms" id="amountInput"/>
                    </div>
                    <button type="submit" className="btnForm " id="expenseSubmit">
                        Add Expenses
                    </button>
                </form>
            </div>
            <div className="rightSide">
                <div className="costsContainer">
                    <div className="divBudget">
                        <h2 className="title">Budget</h2>
                        <span className="budget-icon"><i className="fas fa-money-bill-alt fa-3x"></i></span>
                        <p>0</p>
                    </div>
                    <div className="divExpenses">
                        <h2 className="title">Expenses</h2>
                        <span className=""><i className="far fa-credit-card fa-3x"></i></span>
                        <p>0</p>
                    </div>
                    <div className="divBalance">
                        <h2 className="title">Balance</h2>
                        <span className="balance-icon"><i className="fas fa-dollar-sign fa-3x"></i></span>
                        <p>0</p>
                    </div>
                </div>
            </div>
            {/* display expenses */}
            
        </div>

       
    )
}

export default Budget
