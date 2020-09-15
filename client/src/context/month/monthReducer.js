import {SET_MOTH } from '../type'

const monthReducer = (state, action) => {
    switch(action.type){
        case SET_MOTH:
            return {
                ...state,
                selectedMonth: action.payload 
            }

        

     
        default:
            return state;
    }
}

export default monthReducer
