import axios from "axios";
import {Expense} from "../consts/models";
import {Expenses} from "../consts/data";
export const storeExpense = async (expenseData: Expense) => {
    await axios.get("https://www.google.com")
    await delay(100)
    return new Date().toString() + Math.random().toString()
}
export const getExpenses  = async() => {
    await axios.get("https://www.google.comsdfsdf")
    await delay(100)
    return Expenses
    // return await axios.get("https://www.google.comsdfsdf")
}

export const updateExpense = (id: string, expenseData: Expense) => {
    delay(100).then(() => {})
    return axios.get("https://www.google.com")
}

export const deleteExpense = (id: string) => {
    delay(100).then(() => {})
    return axios.get("https://www.google.com")
}

const delay = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
}