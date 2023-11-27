import {createContext, DispatchWithoutAction, useReducer} from "react";
import {Expense, ExpensesDetail} from "../consts/models";
import React from "react"
import {Expenses} from "../consts/data";
import {AppState, Action, IExpensesProvider} from "../store/models";


const EmptyState :Array<ExpensesDetail> = []

export const ExpensesContext = createContext ({
    expenses: EmptyState,
    addExpense: (data: Expense) => {},
    deleteExpenses: (id: string) => {},
    updateExpenses: (id: string, data: Expense) => {},
})



const expensesReducer = (state: Array<ExpensesDetail>, action: Action): Array<ExpensesDetail> => {
    switch (action.type) {
        case "ADD":
            const id: string = new Date().toString() + Math.random().toString()
            return [{...action.payload.data, id: id},...state]
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload.id)
        case "UPDATE":
            const itemIndex = state.findIndex((expense) => expense.id == action.payload.id)
            const item = state[itemIndex]
            const newItem = {...item, ...action.payload.data}
            const newItems = [...state]
            newItems[itemIndex] = newItem
            return newItems
        default:
            return state
    }
}
const ExpensesProvider: React.FC<IExpensesProvider> = ({children}): React.JSX.Element => {
    const [expensesState, dispatch] = useReducer(expensesReducer, Expenses);
    const addExpense = (data: Expense) => {
        dispatch({type: "ADD", payload: {data: data}})
    }

    const updateExpense = (id: string, data: Expense) => {
        dispatch({type: "UPDATE", payload: {id: id, data: data}})
    }

    const deleteExpense = (id: string) => {
        dispatch({type: "DELETE", payload: {id: id}})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpenses: deleteExpense,
        updateExpenses: updateExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesProvider