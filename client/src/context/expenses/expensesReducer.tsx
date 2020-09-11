
import {ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, CLEAR_CURRENT, 
SET_CURRENT, EXPENSE_ERROR, GET_EXPENSES, CLEAR_EXPENSES} from '../types';

import {InitContextState, ExpensesType} from './expensesState'

type ActionO = {
    type: string,
    payload: ExpensesType[] | string
}



const expenseReducer = (state: any, action: any) => {
    switch(action.type){
        case GET_EXPENSES:
            return {
                ...state,
                expenses: action.payload,
                // loading: false
            }

        // case ADD_EXPENSE:
        //     return {
        //         ...state,
        //         expenses: [action.payload, ...state.expenses],
        //         loading: false
        //     };

        // case DELETE_EXPENSE:
        //     return {
        //         ...state,
        //         expenses: state.expenses.filter((expense: object) => contact._id !== action.payload),
        //         loading: false
        //     };

        // case CLEAR_EXPENSES:
        //     return {
        //         ...state,
        //         expenses: null,
        //         filtered: null,
        //         current: null,
        //         error: null,
                
        //     };

        // case SET_CURRENT:
        //     return {
        //         ...state,
        //         current: action.payload
        //     };

        // case CLEAR_CURRENT:
        //     return {
        //         ...state,
        //         current: null
        //     };

        // case UPDATE_EXPENSE:
        //     return {
        //         ...state,
        //         expenses: state.expenses.map((contact: object) => contact._id === action.payload._id ?
        //         action.payload : contact),
        //         loading: false
        //     };

        // case FILTER_CONTACT:
        //     return {
        //         ...state,
        //         filtered: state.contacts.filter(contact => {
        //             const reqex = new RegExp(`${action.payload}`, 'gi');
        //             return contact.name.match(reqex) || contact.email.match(reqex)
        //         }) 
        //     };

        // case CLEAR_FILTER:
        //     return {
        //         ...state,
        //         filtered: null 
        //     };

        // case EXPENSE_ERROR:
        //     return {
        //         ...state,
        //         error: action.payload 
        //     };

        default:
            return state;
    }
}

export default expenseReducer;
