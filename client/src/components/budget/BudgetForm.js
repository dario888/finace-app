import React, {useState, useEffect, useContext, Fragment} from 'react';
import Alert from '../../components/Alert'

// import {ExpensesContext} from '../../context/expenses/expensesState'
import {BudgetsContext} from '../../context/budget/budgetState';
import {AlertContext} from '../../context/alert/alertState';



const BudgetForm = () => {
    
    const { currentBudget, clearCurrentBudget, addBudget, updateBudget, 
    budgets, getBudgets} = useContext(BudgetsContext);
    const {setAlert} = useContext(AlertContext);
    // const {selectedMonth} = useContext(ExpensesContext);
       
    const  [budget, setBudget] = useState( {amount: '', month: ''} );
    const {amount, month} = budget;

    const arrMonths = ['January', 'February','March','April','May','June','July','August','September',
    'October','November','December']
    
    
    useEffect(() => {
        //current=expense
        if(currentBudget){
            setBudget(currentBudget);
           
        } else {
            setBudget({ amount: '', month: ''})
        }
        // eslint-disable-next-line
    }, [currentBudget]);


    useEffect(() => {
        getBudgets();
        // eslint-disable-next-line
    },[budgets])
    
    
    const setBudgetHendler = (e) => e.target.name === 'amount' 
    ? setBudget({ ...budget, [e.target.name]: Math.abs(Number(e.target.value))}) 
    : setBudget({...budget, [e.target.name]: e.target.value});


    const onSubmitBudget = e => {
        e.preventDefault();
        if(currentBudget) {
            if(month && !arrMonths.includes(month)){
                return setAlert('Please enter correct Month','danger')
            }

            if(budget.amount < 1){
                return setAlert('Please enter amount bigger than 0','danger')
            }

            updateBudget(budget);
            clearCurrentBudget();     
            
        } else {
            if(month && !arrMonths.includes(month)){
               return setAlert('Please enter correct Month','danger')
            }

            if(budget.amount < 1){ 
                return setAlert('Please enter Amount bigger than 0','danger')
            }
            
            addBudget(budget);
            setBudget({ amount: '', month: ''});

        }

    };

    const clearAll = () => {
        clearCurrentBudget();
        setBudget({ amount: '', month: ''})
    };

    
     
   

    
    return (
        <Fragment>
            <Alert />
            <form className="budgetForm" onSubmit={onSubmitBudget}>
                <h3>Month</h3>
                <div className="formGroup">
                    <input type="text" name="month" onChange={setBudgetHendler}
                    value={month && month[0].toUpperCase() + month.slice(1).toLowerCase()} 
                    className="inputForms" id="bgtInp" maxLength={9} required/>
                </div>
                <h3>Budget</h3>
                <div className="formGroup">
                    <input type="number" name="amount" value={amount.toString()} onChange={setBudgetHendler}
                    className="inputForms" id="bgtInp" max={500000}
                    required/>
                </div>
                <button type="button" onClick={clearAll} className="btnForm" id="budgetReset">
                    Cancel
                </button>
                <button type="submit" className="btnForm" id="budgetSubmit">
                {currentBudget ? 'Update Contact' : 'Add Budget'} 
                </button>
            </form>
        </Fragment>
    )
}

export default BudgetForm


 
