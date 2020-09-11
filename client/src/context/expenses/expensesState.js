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
        filtered: null,
        error: null
    };
   
    const [state, dispatch] = useReducer(expensesReducer, initialState);

    //Get contacts
    const getExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
    
            dispatch({type: GET_EXPENSES, payload: res.data});
            console.log(res.data)

        } catch (err) {
            dispatch({type: EXPENSES_ERROR, payload: err.response.message});
            
        }
        
    }

    //Clear Expenses
    const clearExpanses = () => {
        dispatch({type: CLEAR_EXPENSES})
    }

    //Add Expenses
    const addExpanse = async (expense) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', expense, config);
    
            dispatch({type: ADD_EXPENSE, payload: res.data});
    
        } catch (err) {
            dispatch({type: EXPENSES_ERROR, payload: err.response.message});
            
        }
        
    }

     //Update Expenses
     const updateContact = async (expense) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.patch(`/api/contacts/${expense._id}`, expense, config);
    
            dispatch({type: UPDATE_EXPENSE, payload: res.data})
    
        } catch (err) {
            dispatch({type: EXPENSES_ERROR, payload: err.response.message});
            
        }
        
    }
    
    //delete Expenses
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
    
            dispatch({type: DELETE_EXPENSE, payload: id})
    
        } catch (err) {
            dispatch({type: EXPENSES_ERROR, payload: err.response.message});
            
        }
        
    }
    //Set Current Expenses
    const currentContact = (expense) => {
        dispatch({type: SET_CURRENT, payload: expense})
    }
    //Clear Current Expenses
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }
   
    // //Filter Expenses
    // const filterContact = text => {
    //     dispatch({type: FILTER_CONTACT, payload: text})
    // }
    // //Clear Expenses
    // const clearFilter = () => {
    //     dispatch({type: CLEAR_FILTER})
    // }


    return (
        <ExpensesContext.Provider value={{
            expenses: state.expenses, 
            current: state.current, 
            filtered: state.filtered,
            error: state.error,
            addExpanse, 
            deleteContact, 
            currentContact, 
            clearCurrent, 
            updateContact, 
            // filterContact, 
            // clearFilter,   
            getExpenses,
            clearExpanses

        }}>
            {props.children}
        </ExpensesContext.Provider>
    )
}

export default ExpenseState;
