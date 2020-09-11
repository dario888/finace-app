import React, {useReducer, FC} from 'react';
import axios from 'axios';

import expensesReducer from './expensesReducer';

import {ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, CLEAR_CURRENT, 
SET_CURRENT, EXPENSE_ERROR, GET_EXPENSES, CLEAR_EXPENSES} from '../types';



export type InitContextState = { 
    expenses: ExpensesType[], 
    // current: any,
    // loading: boolean,
    // error: any, 
    getExpenses: () => Promise<void> 
}
type ContextValue = undefined | InitContextState ;

export type ExpensesType = {
    id: string,
    expensesName: string,
    price: number,
    month: string,
    date: Date,
}

type Props = { children: React.ReactNode };
//   type InitialStateType = {
//     products: ProductType[];
//    
//   }
  
//   const initialState = {
//     products: [],
//     shoppingCart: 0,
//   }
//Creating the Context
export const ExpensesContext = React.createContext<ContextValue>(undefined);

const ExpenseState: FC<Props> = (props) => {

    const initialState = {
        expenses: [],
        // current: null,
        // filtered: null,
        // loading: true,
        // error: null
    };

    const [state, dispatch] = useReducer(expensesReducer, initialState);

    //Get contacts
    const getExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
    
            dispatch({type: GET_EXPENSES, payload: res.data});
            console.log(res.data)

        } catch (err) {
            dispatch({type: EXPENSE_ERROR, payload: err.response.message});
            
        }
        
    }

    // //Clear Contacts
    // const clearExpanses = () => {
    //     dispatch({type: CLEAR_EXPENSES})
    // }

    // //Add Contact
    // const addExpanse = async (expense: object) => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     try {
    //         const res = await axios.post('/api/contacts', expense, config);
    
    //         dispatch({type: ADD_EXPENSE, payload: res.data});
    
    //     } catch (err) {
    //         dispatch({type: EXPENSE_ERROR, payload: err.response.message});
            
    //     }
        
    // }

    //  //Update Contact
    //  const updateContact = async (expense: object) => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     try {
    //         const res = await axios.patch(`/api/contacts/${expense._id}`, expense, config);
    
    //         dispatch({type: UPDATE_EXPENSE, payload: res.data})
    
    //     } catch (err) {
    //         dispatch({type: EXPENSE_ERROR, payload: err.response.message});
            
    //     }
        
    // }
    
    // //delete Contact
    // const deleteContact = async (id: string) => {
    //     try {
    //         await axios.delete(`/api/contacts/${id}`);
    
    //         dispatch({type: DELETE_EXPENSE, payload: id})
    
    //     } catch (err) {
    //         dispatch({type: EXPENSE_ERROR, payload: err.response.message});
            
    //     }
        
    // }
    // //Set Current Contact
    // const currentContact = (expense:object) => {
    //     dispatch({type: SET_CURRENT, payload: expense})
    // }
    // //Clear Current Contact
    // const clearCurrent = () => {
    //     dispatch({type: CLEAR_CURRENT})
    // }
   
    // //Filter Contact
    // const filterContact = text => {
    //     dispatch({type: FILTER_CONTACT, payload: text})
    // }
    // //Clear Filter
    // const clearFilter = () => {
    //     dispatch({type: CLEAR_FILTER})
    // }


    return (
        <ExpensesContext.Provider value={{
            expenses: state.expenses, 
            // current: state.current, 
            // filtered: state.filtered,
            // error: state.error,
            // addExpanse, 
            // deleteContact, 
            // currentContact, 
            // clearCurrent, 
            // updateContact, 
            // filterContact, 
            // clearFilter,   
            getExpenses,
            // clearExpanses

        }}>
            {props.children}
        </ExpensesContext.Provider>
    )
}

export default ExpenseState;
