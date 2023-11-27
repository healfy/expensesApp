import {Expense, ExpensesDetail} from "../consts/models";
import React from "react";
import exp from "constants";

export type AppState = {
    expenses: Array<ExpensesDetail>,
    addExpense: (item: Expense) => {},
    deleteExpenses: (id: string) => {},
    updateExpenses: (id: string, data: Expense) => {},
}


export interface IExpensesProvider {
    children: React.ReactNode
}

export interface AddPayload {
    data: Expense
}

export interface DeletePayload {
    id: string,
    data?: Expense
}

export interface UpdatePayload {
    id: string,
    data: Expense
}

export type DeleteAction = {
    payload: DeletePayload,
    type: "DELETE"
}

export type UpdateAction = {
    payload: UpdatePayload,
    type: "UPDATE"
}
export type AddAction = {
    payload: AddPayload,
    type: "ADD"
}

export type Action = AddAction | DeleteAction | UpdateAction

export interface ExpensesReducer {
    state: Array<ExpensesDetail>,
    action: Action
}