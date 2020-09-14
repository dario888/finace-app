import React, {useReducer} from 'react';
import axios from 'axios';
import budgetReducer from './budgetReducer';

import {ADD_BUDGET, UPDATE_BUDGET, DELETE_BUDGET, CLEAR_CURRENT_BUDGET, 
SET_CURRENT_BUDGET, ERROR_BUDGET, GET_BUDGET, CLEAR_BUDGET} from '../type.js';



export const BudgetsContext = React.createContext();

const BudgetsState = (props) => {

    const initialState = {
        budgets: null,
        currentBudget: null,
        loading: true,
        error: null
    };
   
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    //Get contacts
    const getBudgets = async () => {
        try {
            const res = await axios.get('/api/budget');
    
            dispatch({type: GET_BUDGET, payload: res.data});
            // console.log(res.data)

        } catch (error) {
            dispatch({type: ERROR_BUDGET, payload: error.response.msg});
            
        }
        
    }

    //Add Expenses
    const addBudget = async (budget) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/budget', budget, config);
    
            dispatch({type: ADD_BUDGET, payload: res.data});
    
        } catch (error) {
            dispatch({type: ERROR_BUDGET, payload: error.response.msg});
            
        }
        
    }

     //Update Expenses
     const updateBudget = async (budget) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            //Update in DB
            const res = await axios.put(`/api/budget/${budget._id}`, budget, config);
    
            dispatch({type: UPDATE_BUDGET, payload: res.data})//update client
            // console.log(res.data);
        } catch (error) {
            dispatch({type: ERROR_BUDGET, payload: error.response.msg});
            
        }
        
    }
    
    //delete Expenses
    const deleteBudget = async (id) => {
        try {
            await axios.delete(`/api/budget/${id}`);//delete in DB
           
            dispatch({type: DELETE_BUDGET, payload: id})//delete in cliient
    
        } catch (error) {
            dispatch({type: ERROR_BUDGET, payload: error.response.msg});
            
        }
        
    }


    //Clear Expenses
    const clearBudgets = () => dispatch({type: CLEAR_BUDGET})
    
    //Set Current Expenses
    const setCurrentBudget = (budget) => dispatch({type: SET_CURRENT_BUDGET, payload: budget})
    
    //Clear Current Expenses
    const clearCurrentBudget = () => dispatch({type: CLEAR_CURRENT_BUDGET})


    


    return (
        <BudgetsContext.Provider value={{
            expenses: state.expenses, 
            currentBudget: state.currentBudget, 
            loading: state.loading,
            error: state.error,
            addBudget, 
            deleteBudget, 
            setCurrentBudget, 
            clearCurrentBudget, 
            updateBudget,    
            getBudgets,
            clearBudgets,
           

        }}>
            {props.children}
        </BudgetsContext.Provider>
    )
}

export default BudgetsState;
