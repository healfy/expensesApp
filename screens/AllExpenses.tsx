import React, {useContext} from "react";
import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";

const AllExpensesScreen = (): React.JSX.Element => {
    const expensesCtx = useContext(ExpensesContext)
    return (
        <ExpensesOutput periodName={"All Expenses"} listExpenses={expensesCtx.expenses} text={"No expenses at the moment"}/>
    )
}

const styles = StyleSheet.create({})

export default AllExpensesScreen