import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {GlobalStyles} from "../consts/styles";
import Button from "../components/Button";

interface IErrorOverlay {
    message: string,
    onPress: () => void
}
const ErrorOverlay: React.FC<IErrorOverlay> = ({message, onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onPress}>OK</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary500
    },
    text: {
        textAlign: "center",
        marginBottom: 8,
        color:GlobalStyles.colors.error50
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color:GlobalStyles.colors.accent500
    }
})
export default ErrorOverlay