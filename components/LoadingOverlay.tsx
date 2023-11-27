import React from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";
import {GlobalStyles} from "../consts/styles";

const LoadingOverlay = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={"white"}/>
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
    }
})
export default LoadingOverlay