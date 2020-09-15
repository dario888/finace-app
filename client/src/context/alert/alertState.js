import React, {useReducer} from 'react';
import {v4} from 'uuid';
import alertReducer from './alertReduce';
import {SET_ALERT, REMOVE_ALERT} from '../type';




//Creating the Context
export const AlertContext = React.createContext()


const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);
    
    //Set Alert
    const setAlert = (msg, type, timeout = 6000) => {
        const id = v4();   
    
        dispatch({type: SET_ALERT, payload: {msg, type, id}});

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);

    }
      
  
    

    return (
        <AlertContext.Provider value={{ alerts: state, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    )




  
}

export default AlertState;
