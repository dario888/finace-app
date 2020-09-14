import React, {useState, useEffect, useContext, Fragment} from 'react'
import {ExpensesContext} from '../../context/expenses/expensesState'
import {BudgetsContext} from '../../context/budget/budgetState'



const BudgetForm = () => {
    
    const {selectedMonth} = useContext(ExpensesContext);
    const {currentBudget, clearCurrentBudget, addBudget, updateBudget} = useContext(BudgetsContext);
       
    const  [budget, setBudget] = useState( {amount: '', month: ''} );
    const {amount} = budget;
    
    useEffect(() => {
        //current=expense
        if(currentBudget){
            setBudget(currentBudget);
            
        } else {
            setBudget({ amount: '', month: ''})
        }
        
    }, [currentBudget]);

    useEffect(() => {
        setBudget({...budget, month: selectedMonth});
        // eslint-disable-next-line
    },[selectedMonth])
    

    
    const setBudgetHendler = (e) => setBudget({ ...budget, [e.target.name]: Math.abs(Number(e.target.value))})


    // console.log(selectedMonth);

    const onSubmitBudget = e => {
        e.preventDefault();
        if(currentBudget) {
            updateBudget(budget);
            clearCurrentBudget();     
            
        } else {
            addBudget(budget);
            setBudget({expensesName: '', amount: '', month: ''});

        }

    };

    const clearAll = () => {
        clearCurrentBudget();
        setBudget({ amount: '', month: ''})
    };
     
   

    
    return (
        <Fragment>
            <form className="budgetForm" onSubmit={onSubmitBudget}>
                <h3>Budget</h3>
                <div className="formGroup">
                    <input type="number" value={amount.toString()} onChange={setBudgetHendler}
                    className="inputForms" id="bgtInp" required/>
                </div>
                <button type="submit" onClick={clearAll} className="btnHover btnForm" id="budgetReset">
                    Cancel
                </button>
                <button type="submit" className="btnForm btnHover" id="budgetSubmit">
                {currentBudget ? 'Update Contact' : 'Add Budget'} 
                </button>
            </form>
        </Fragment>
    )
}

export default BudgetForm


    // const setBudgetHendler = (e) => 
    // setBudget(Math.abs(parseInt(e.target.value)))
    
    // const submitBudget = (e) => {
    //     e.preventDefault()
    //     // setDisplayBudget(displayBudget )
    //     setDisplayBudget(displayBudget + budget)
    //     setBudget(0)
    // }
