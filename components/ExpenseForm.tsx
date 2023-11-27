import {View, StyleSheet, Text, Alert} from "react-native";
import Input from "../components/Input";
import {GlobalStyles} from "../consts/styles";
import React, {useState} from "react";
import Button from "../components/Button";
import {Expense} from "../consts/models";

interface Field {
    value: string,
    isValid: boolean
}

interface DefaultFormValues {
    amount: Field,
    date: Field,
    description: Field
}


interface IExpenseForm {
    onCancel: () => void,
    isEditing: boolean,
    onSubmit: (data: Expense) => void,
    defaultValues?: Expense
}

const ExpenseForm: React.FC<IExpenseForm> = ({onCancel, isEditing, onSubmit, defaultValues}): React.JSX.Element => {
    const defaultForm: DefaultFormValues = {
        amount: {value: defaultValues? defaultValues.value.toString(): "", isValid: true},
        date:  {value: defaultValues? defaultValues.date.toISOString().slice(0,10): "", isValid: true},
        description:  {value: defaultValues? defaultValues.name: "", isValid: true}
    }
    const [currentInputs, setInputs] = useState<DefaultFormValues>(defaultForm)
    const onChangeHandler = (inputId: string, entered: string) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputId]: {value: entered, isValid: true}
            }
        })
    }

    const confirmHandler = () => {
        const formData = {
            value: +currentInputs.amount.value,
            date: new Date(currentInputs.date.value),
            name: currentInputs.description.value
        }
        const isValidAmount = !isNaN(formData.value) && formData.value > 0
        const isValidDate = formData.date.toString() !== "Invalid date"
        const descrIsValid = formData.name.trim().length > 0
        if (!isValidAmount || !isValidDate || !descrIsValid) {
            setInputs(() => {
                return {
                    amount: {value: currentInputs.amount.value, isValid: isValidAmount},
                    date: {value: currentInputs.date.value, isValid: isValidDate},
                    description: {value: currentInputs.description.value, isValid: descrIsValid},
                }
            })
            return
        }
        onSubmit(formData)
    }

    const formIsInvalid = !currentInputs.amount.isValid || !currentInputs.date.isValid || !currentInputs.description.isValid

    return (
        <View>
            <Text style={styles.title}> Your expense </Text>
            <View style={styles.row}>
                <Input label={"Amount"} textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: onChangeHandler.bind(this, "amount"),
                    value: currentInputs.amount.value,
                }} style={{flex: 1}} invalid={!currentInputs.amount.isValid}/>
                <Input label={"Date"} textInputConfig={{
                    onChangeText: onChangeHandler.bind(this, "date"),
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    value: currentInputs.date.value,
                }} style={{flex: 1}} invalid={!currentInputs.date.isValid}/>
            </View>
            <Input label={"Description"} textInputConfig={{
                onChangeText: onChangeHandler.bind(this, "description"),
                multiline: true,
                autoFocus: false,
                value: currentInputs.description.value,
            }} invalid={!currentInputs.description.isValid}/>
            {formIsInvalid && <Text style={{color: "red"}}>Invalid input values - please check entered data</Text>}
            <View style={styles.buttons}>
                <Button mode={"flat"} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? "Update" : "Create"}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        color: GlobalStyles.colors.gray700,
        marginVertical: 24,
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12
    },
    button: {
        marginHorizontal: 8,
        minWidth: 120,
    },
})
export default ExpenseForm