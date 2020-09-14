import {ADD_BUDGET, UPDATE_BUDGET, DELETE_BUDGET, CLEAR_CURRENT_BUDGET, 
SET_CURRENT_BUDGET, ERROR_BUDGET, GET_BUDGET, CLEAR_BUDGET} from '../type.js';
    
        
           
        
    const budgetReducer = (state, action) => {
        switch(action.type){
            case GET_BUDGET:
                return {
                    ...state,
                    budgets: action.payload,
                    loading: false
                }
    
            case ADD_BUDGET:
                return {
                    ...state,
                    budgets: [action.payload, ...state.budgets],
                    loading: false
                };
    
            case UPDATE_BUDGET:
                return {
                    ...state,
                    budgets: state.budgets.map((expense) => expense._id === action.payload._id ?
                    action.payload : expense),
                    loading: false
                };
    
            case DELETE_BUDGET:
                return {
                    ...state,
                    budgets: state.budgets.filter((expense) => expense._id !== action.payload),
                    loading: false
                };
    
            case CLEAR_BUDGET:
                return {
                    ...state,
                    budgets: null,
                    currentBudget: null,
                    error: null,
                    
                };
    
            case SET_CURRENT_BUDGET:
                return {
                    ...state,
                    currentBudget: action.payload
                };
    
            case CLEAR_CURRENT_BUDGET:
                return {
                    ...state,
                    currentBudget: null
                };
    
            case ERROR_BUDGET:
                return {
                    ...state,
                    error: action.payload 
                };
    
            default:
                return state;
        }
    }
    
    export default budgetReducer;
    