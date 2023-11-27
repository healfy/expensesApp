import {Pressable, Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../consts/styles";
import React from "react";
interface IButton {
    children: React.ReactNode,
    onPress: () => void
    mode?: string,
    style?: object
}
const Button: React.FC<IButton>  = ({children, onPress, mode, style}) => {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === "flat" && styles.flat]}>
                    <Text style={[styles.text,  mode === "flat" && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: "transparent"
    },
    text: {
        color: "white",
        textAlign: "center",
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    }
})

export default Button