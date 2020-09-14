import {ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, CLEAR_CURRENT, 
SET_CURRENT, EXPENSES_ERROR, GET_EXPENSES, CLEAR_EXPENSES, SET_MOTH} from '../type.js';

    
       
    
const expenseReducer = (state, action) => {
    switch(action.type){
        case GET_EXPENSES:
            return {
                ...state,
                expenses: action.payload,
                loading: false
            }

        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
                loading: false
            };

        case UPDATE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.map((expense) => expense._id === action.payload._id ?
                action.payload : expense),
                loading: false
            };

        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense._id !== action.payload),
                loading: false
            };

        case CLEAR_EXPENSES:
            return {
                ...state,
                expenses: null,
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

        case EXPENSES_ERROR:
            return {
                ...state,
                error: action.payload 
            };

        case SET_MOTH:
        return {
            ...state,
            selectedMonth: action.payload 
        };

        default:
            return state;
    }
}

export default expenseReducer;
