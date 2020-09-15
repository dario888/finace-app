import React, {useState, useEffect, useContext, Fragment} from 'react';
import {ExpensesContext} from '../../context/expenses/expensesState';
import {AlertContext} from '../../context/alert/alertState';




const ExpensesForm = () => {
    //selectedMonth
    const { addExpanse, updateExpense, current, clearCurrent,
    } = useContext(ExpensesContext);
    const { setAlert } = useContext(AlertContext);
    
    const  [expense, setExpense] = useState( {expensesName: '', amount: '', month: ''} );
    const {expensesName, amount, month} = expense;

    const arrMonths = ['January', 'February','March','April','May','June','July','August','September',
    'October','November','December']
    
    useEffect(() => {
        //current=expense
        if(current){
            setExpense(current);
            
        } else {
            setExpense({expensesName: '', amount: '', month: ''})
        }
        
    }, [current]);

    // useEffect(() => {
    //     setExpense({...expense, month: selectedMonth});
    //     // eslint-disable-next-line
    // },[selectedMonth])
    
 
  
    const onChangeExpense = (e) => e.target.name === 'amount' 
        ? setExpense( { ...expense, [e.target.name]: Math.abs(Number(e.target.value)) } )
        : setExpense({...expense, [e.target.name]: e.target.value});
            
      

    // console.log(selectedMonth);

    const onSubmitExpense = e => {
        e.preventDefault();
        if(current) {
            updateExpense(expense);
            clearCurrent();
   
        } else {
            if(month && !arrMonths.includes(month)){
                return setAlert('Please enter correct month','danger')
            }

            addExpanse(expense);
            setExpense({expensesName: '', amount: '', month: ''});

        }

    };

    const clearAll = () => {
        clearCurrent();
        setExpense({expensesName: '', amount: '', month: ''})
    };
    

    
    return (
          
        <Fragment>
        <form className="expenseForm" onSubmit={onSubmitExpense}>
            <h3>Month</h3>
            <div className="formGroup">
                <input type="text"  onChange={onChangeExpense} name="month"
                value={month && month[0].toUpperCase() + month.slice(1).toLowerCase()}
                className="inputForms" id="expInp" maxLength={9} required
                placeholder="Month"/>
            </div>
            <h3>Expenses</h3>
            <div className="formGroup">
                <input type="text" value={expensesName} onChange={onChangeExpense} 
                name="expensesName"
                className="inputForms" id="expInp" maxLength={13} required
                placeholder="Expense Name"/>
            </div>
            <h3>Amount</h3>
            <div className="formGroup">
                <input type="number" value={amount.toString()} onChange={onChangeExpense} 
                name="amount" className="inputForms" 
                id="amtInp" placeholder="Enter Amount" max={500000} required/>
            </div>
            
            <button type="button" onClick={clearAll} className="btnForm btnHover" id="expenseCancel">
                Cancel
            </button>
            <button type="submit"  className="btnForm btnHover" id="expenseSubmit">
            {current ? 'Update Contact' : 'Add Expenses'} 
            </button>
        </form>
        </Fragment>
        
    )
}

export default ExpensesForm


/* <div className="leftSide">
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
            </div> */