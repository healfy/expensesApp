import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {GlobalStyles} from "../consts/styles";

interface IExpensesSummaryProps {
    periodName: string,
    summary: number
}
const ExpensesSummary:React.FC<IExpensesSummaryProps> = ({periodName, summary}): React.JSX.Element => {
    return (
        <View style={styles.baseContainer}>
            <Text style={styles.text1}>{periodName}</Text>
            <Text style={styles.text2}>$ {summary.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    baseContainer: {
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: GlobalStyles.colors.gray700,
        borderBottomWidth: 2,
    },
    text1: {
        fontSize: 12,
        color: GlobalStyles.colors.gray500,
    },
    text2: {
        fontSize: 16,
        color: GlobalStyles.colors.gray500,
        fontWeight: "bold"
    }
})

export default ExpensesSummary