import React, {useContext} from "react";
import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import {ExpensesDetail} from "../consts/models";
import {ExpensesContext} from "../store/expenses-context";

const RecentExpensesScreen = (): React.JSX.Element => {
    const expensesCtx = useContext(ExpensesContext)
    const today: Date = new Date()
    const expensesList: Array<ExpensesDetail> = expensesCtx.expenses.filter((item) => item.date > new Date(today.getDate() - 7))
    return (
        <ExpensesOutput periodName={"Last 7 days"} listExpenses={expensesList} text={"No recent expenses"}/>
    )
}

const styles = StyleSheet.create({})

export default RecentExpensesScreen