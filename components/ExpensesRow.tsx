import {ExpensesDetail} from "../consts/models";
import React from "react"
import {View, Text, Pressable, StyleSheet} from "react-native";
import {GlobalStyles} from "../consts/styles";
import {getFormattedDate} from "../utils/date";
import {useNavigation, NavigationProp} from "@react-navigation/core";
import {RootStackParamList} from "../screens/ManageExpenses";
interface IExpensesRowProps {
    row: ExpensesDetail
}

const ExpensesRow: React.FC<IExpensesRowProps> = ({row}): React.JSX.Element => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation<NavigationProp<RootStackParamList>>()
    const onPress = ( ) => {
        navigation.navigate("ManageExpenses", {expenseId: row.id})
    }
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.item}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{row.name}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(row.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${row.value.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 12,
        marginVertical: 6,
        marginHorizontal:8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: GlobalStyles.colors.primary50,
        borderBottomWidth: 1,
    },
    textBase: {
        color: GlobalStyles.colors.gray500,
    },
    description: {
        fontSize: 16,
        marginBottom:4,
        fontWeight: "bold"
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.primary500,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 75,
    },
    amount: {
        color: GlobalStyles.colors.accent500,
        fontWeight: "bold"
    },
    pressed: {
        opacity: 0.75
    }
})

export default ExpensesRow