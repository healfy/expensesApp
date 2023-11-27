import {createContext, useReducer} from "react";
import {Expense, ExpensesDetail} from "../consts/models";
import React from "react"
import {Action, IExpensesProvider} from "../store/models";


const EmptyState :Array<ExpensesDetail> = []

export const ExpensesContext = createContext ({
    expenses: EmptyState,
    addExpense: (data: ExpensesDetail) => {},
    deleteExpenses: (id: string) => {},
    updateExpenses: (id: string, data: Expense) => {},
    setExpenses: (data: Array<ExpensesDetail>) => {},
})



const expensesReducer = (state: Array<ExpensesDetail>, action: Action): Array<ExpensesDetail> => {
    switch (action.type) {
        case "ADD":
            return [{...action.payload.data},...state]
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload.id)
        case "UPDATE":
            const itemIndex = state.findIndex((expense) => expense.id == action.payload.id)
            const item = state[itemIndex]
            const newItem = {...item, ...action.payload.data}
            const newItems = [...state]
            newItems[itemIndex] = newItem
            return newItems
        case "SET":
            return action.payload
        default:
            return state
    }
}
const ExpensesProvider: React.FC<IExpensesProvider> = ({children}): React.JSX.Element => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);
    const addExpense = (data: ExpensesDetail) => {
        dispatch({type: "ADD", payload: {data: data}})
    }

    const updateExpense = (id: string, data: Expense) => {
        dispatch({type: "UPDATE", payload: {id: id, data: data}})
    }

    const deleteExpense = (id: string) => {
        dispatch({type: "DELETE", payload: {id: id}})
    }

    const setExpenses = (data: Array<ExpensesDetail>) => {
        dispatch({type: "SET", payload: data})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpenses: deleteExpense,
        updateExpenses: updateExpense,
        setExpenses: setExpenses,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesProvider