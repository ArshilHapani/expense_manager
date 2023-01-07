import React, { useReducer, createContext, useContext } from 'react';
import contextReducer from './state/contextReducer';
const initialState = [];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transaction, dispatch] = useReducer(contextReducer, initialState)    
    //Action creators

    const deleteTransaction = (id) => {        
         dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
        });
    }
    const addTransactions = (transaction) => {
         dispatch({
            type: "ADD_TRANSACTION",
            payload: transaction
        });
    }

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransactions,
            transaction
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
export const useStateContext = () => useContext(ExpenseTrackerContext);