import React from "react";
import {View, Text, StyleSheet} from "react-native";
import ExpensesList from "../components/ExpensesList";
import ExpensesSummary from "../components/ExpensesSummary";
import {ExpensesDetail} from "../consts/models";
import {GlobalStyles} from "../consts/styles";

interface IExpensesOutputProps{
    periodName: string,
    listExpenses: Array<ExpensesDetail>,
    text: string
}
const ExpensesOutput: React.FC<IExpensesOutputProps> = ({listExpenses, periodName, text}): React.JSX.Element => {
    const  expensesSummary = listExpenses.reduce<number>((sum,item) => {return sum + item.value}, 0)
    const content = listExpenses.length > 0? <ExpensesList data={listExpenses}/> : <Text style={styles.info}>{text}</Text>
    return (
        <View style={styles.baseContainer}>
            <ExpensesSummary periodName={periodName} summary={expensesSummary}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        paddingHorizontal:4,
        paddingBottom:0,
        paddingTop: 8,
        backgroundColor: GlobalStyles.colors.primary50,
    },
    info: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
        marginTop: 32
    }
})

export default ExpensesOutput