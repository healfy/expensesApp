import {StyleSheet, Text, TextInput, View} from "react-native";
import {TextInputProps} from "react-native/Libraries/Components/TextInput/TextInput";
import React from "react";
import {GlobalStyles} from "../consts/styles";

interface InputProps {
    label: string
    textInputConfig?: TextInputProps,
    style?: object,
    invalid: boolean
}

const Input: React.FC<InputProps> = ({label, textInputConfig, style, invalid}) => {
    const inputStyles: Array<object> = [styles.input]
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if (invalid){
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={[styles.base, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles}/>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        marginVertical: 8,
        marginHorizontal: 4,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.gray700,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.accent500,
        color: GlobalStyles.colors.gray700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,

    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    invalidLabel:{
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})

export default Input