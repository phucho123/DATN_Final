import React from 'react'
import styles from "./button.style"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'

const Button = ({ text, color, onPress }) => {
    return (
        <TouchableOpacity containerStyle={[styles.button, color && { backgroundColor: color }]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button