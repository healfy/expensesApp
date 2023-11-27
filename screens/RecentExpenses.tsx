import React, {useContext, useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import {ExpensesDetail} from "../consts/models";
import {ExpensesContext} from "../store/expenses-context";
import {getExpenses} from "../api/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

const RecentExpensesScreen = (): React.JSX.Element => {
    const expensesCtx = useContext(ExpensesContext)
    const [isFetching, setIsFetching] = useState(true)
    const [isError, setIsError] = useState("")
    useEffect(() => {
        const fetchExpenses = async () => {
            setIsFetching(true)
            try {
                const expenses = await getExpenses()
                expensesCtx.setExpenses(expenses)

            } catch (error) {
                setIsError("Could not fetch")
            }

            setIsFetching(false)
        }
        fetchExpenses();
    }, []);

    const onErrorHandler = () => {
        setIsError("")
    }

    if (isError && !isFetching) {
        return <ErrorOverlay message={isError} onPress={onErrorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverlay/>
    }
    const today: Date = new Date()
    const expensesList: Array<ExpensesDetail> = expensesCtx.expenses.filter((item) => item.date > new Date(today.getDate() - 7))
    return (
        <ExpensesOutput periodName={"Last 7 days"} listExpenses={expensesList} text={"No recent expenses"}/>
    )
}

const styles = StyleSheet.create({})

export default RecentExpensesScreen