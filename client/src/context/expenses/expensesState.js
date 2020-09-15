import React, {useReducer} from 'react';
import axios from 'axios';
import expensesReducer from './expensesReducer';

import {ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, CLEAR_CURRENT, 
SET_CURRENT, EXPENSES_ERROR, GET_EXPENSES, CLEAR_EXPENSES} from '../type.js';



export const ExpensesContext = React.createContext();

const ExpenseState = (props) => {

    const initialState = {
        expenses: null,
        current: null,
        loading: true,
        error: null
    };
   
    const [state, dispatch] = useReducer(expensesReducer, initialState);

    //Get contacts
    const getExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
    
            dispatch({type: GET_EXPENSES, payload: res.data});
            // console.log(res.data)

        } catch (error) {
            dispatch({type: EXPENSES_ERROR, payload: error.response.msg});
            
        }
        
    }

    //Add Expenses
    const addExpanse = async (expense) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/expenses', expense, config);
    
            dispatch({type: ADD_EXPENSE, payload: res.data});
    
        } catch (error) {
            dispatch({type: EXPENSES_ERROR, payload: error.response.msg});
            
        }
        
    }

     //Update Expenses
     const updateExpense = async (expense) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            //Update in DB
            const res = await axios.put(`/api/expenses/${expense._id}`, expense, config);
    
            dispatch({type: UPDATE_EXPENSE, payload: res.data})//update client
            // console.log(res.data);
        } catch (error) {
            dispatch({type: EXPENSES_ERROR, payload: error.response.msg});
            
        }
        
    }
    
    //delete Expenses
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`/api/expenses/${id}`);//delete in DB
           
            dispatch({type: DELETE_EXPENSE, payload: id})//delete in cliient
    
        } catch (error) {
            dispatch({type: EXPENSES_ERROR, payload: error.response.msg});
            
        }
        
    }


    //Clear Expenses
    const clearExpanses = () => dispatch({type: CLEAR_EXPENSES})
    
    //Set Current Expenses
    const currentExpense = (expense) => dispatch({type: SET_CURRENT, payload: expense})
    
    //Clear Current Expenses
    const clearCurrent = () => dispatch({type: CLEAR_CURRENT})

    


    return (
        <ExpensesContext.Provider value={{
            expenses: state.expenses, 
            current: state.current, 
            loading: state.loading,
            selectedMonth: state.selectedMonth,
            error: state.error,
            addExpanse, 
            deleteExpense, 
            currentExpense, 
            clearCurrent, 
            updateExpense,    
            getExpenses,
            clearExpanses,

        }}>
            {props.children}
        </ExpensesContext.Provider>
    )
}

export default ExpenseState;
