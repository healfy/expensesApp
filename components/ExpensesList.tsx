import React from "react";
import {StyleSheet, FlatList} from "react-native";
import {ExpensesDetail} from "../consts/models";
import ExpensesRow from "../components/ExpensesRow";

interface IExpensesListProps {
    data: Array<ExpensesDetail>
}
const ExpensesList: React.FC<IExpensesListProps> = ({data}): React.JSX.Element => {
    return (
        <FlatList data={data} renderItem={(items) => {
            return <ExpensesRow row={items.item}/>
        }} keyExtractor={(item) => item.id}
        />
    )
}

const styles = StyleSheet.create({

})

export default ExpensesList