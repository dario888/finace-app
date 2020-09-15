import React, {useReducer} from 'react'
import monthReducer from './monthReducer'
import {SET_MOTH} from '../type'




export const MonthContext = React.createContext();

const MonthState = (props) => {
    const initialState = {
        selectedMonth: '',
    }

    const [state, dispatch] = useReducer(monthReducer, initialState);

    const setMonth = (selected) => dispatch({type: SET_MOTH, payload: selected})
     

    return (
        <MonthContext.Provider value={{
            selectedMonth: state.selectedMonth,
            setMonth,
           
        }}>
          {props.children}  
        </MonthContext.Provider>
    )
}

export default MonthState
