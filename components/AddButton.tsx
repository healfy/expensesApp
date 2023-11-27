import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

interface IButtonProps {
    name: keyof typeof Ionicons.glyphMap,
    size: number;
    color: string;
    onPress: () => void
}

const IconButton: React.FC<IButtonProps> = ({color, size, name, onPress}): React.JSX.Element => {
    return <Pressable onPress={onPress} style={({pressed}) => pressed && styles.press}>
        <View style={styles.buttonContainer}>
            <Ionicons name={name} color={color} size={size}/>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 8,
        padding: 6,
        borderRadius:24,
    },
    press: {
        opacity: 0.24
    }
})
export default IconButton