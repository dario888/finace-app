import {ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, CLEAR_CURRENT, 
SET_CURRENT, EXPENSES_ERROR, GET_EXPENSES, CLEAR_EXPENSES} from '../type.js';

    
       
    
const expenseReducer = (state, action) => {
    switch(action.type){
        case GET_EXPENSES:
            return {
                ...state,
                expenses: action.payload,
                // loading: false
            }

        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
                loading: false
            };

        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter((expense: object) => expense._id !== action.payload),
                loading: false
            };

        case CLEAR_EXPENSES:
            return {
                ...state,
                expenses: null,
                filtered: null,
                current: null,
                error: null,
                
            };

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };

        case UPDATE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.map((expense: object) => expense._id === action.payload._id ?
                action.payload : expense),
                loading: false
            };

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

        case EXPENSES_ERROR:
            return {
                ...state,
                error: action.payload 
            };

        default:
            return state;
    }
}

export default expenseReducer;
