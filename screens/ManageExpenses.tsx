import React, {useContext, useLayoutEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import IconButton from "../components/AddButton";
import {GlobalStyles} from "../consts/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ExpenseForm";
import {Expense} from "../consts/models";
import {deleteExpense, storeExpense, updateExpense} from "../api/http";
import LoadingOverlay from "../components/LoadingOverlay";

export type RootStackParamList = {
    ManageExpenses: { expenseId: string },
    ExpensesOverview: undefined,
};

const ManageExpensesScreen = ({route, navigation}: NativeStackScreenProps<RootStackParamList, "ManageExpenses">): React.JSX.Element => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const expensesCtx = useContext(ExpensesContext)
    const expenseId: string = route.params?.expenseId
    const isEditing: boolean = !!expenseId
    const selectedExpense = expensesCtx.expenses.find((expense => expense.id === expenseId))
    useLayoutEffect(() => {
        navigation.setOptions(
            {title: isEditing?"Edit expense": "Add expense"}
        )
    }, [navigation, isEditing])
    const cancel = () => {
        navigation.goBack()
    }
    const deleteHandler = async () => {
        setIsSubmitting(true)
        await deleteExpense(expenseId)
        expensesCtx.deleteExpenses(expenseId)
        navigation.goBack()

    }
    const confirmHandler = async (data: Expense) => {
        setIsSubmitting(true)
        if (isEditing){
            expensesCtx.updateExpenses(expenseId, data)
            await updateExpense(expenseId, data)
        } else {
            const id = await storeExpense(data)
            expensesCtx.addExpense({id: id, ...data})
        }

        navigation.goBack()
    }

    if (isSubmitting){
        return <LoadingOverlay/>
    }

    return (

        <View style={styles.container}>
            <ExpenseForm onCancel={cancel} isEditing={isEditing} onSubmit={confirmHandler} defaultValues={selectedExpense}/>

            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton name={"trash"} size={24} color={GlobalStyles.colors.error500} onPress={deleteHandler}/>
                </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopColor: GlobalStyles.colors.gray700,
        borderTopWidth: 2,
        alignItems: "center",

    },

})

export default ManageExpensesScreen