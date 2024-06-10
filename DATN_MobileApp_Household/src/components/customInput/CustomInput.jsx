import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomInput = ({
  containerStyle,
  placeholder,
  onChangeText,
  defaultValue,
  isOnlySeen,
  inputType,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);
  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  useEffect(() => {
    setText(defaultValue || ""); // Update text state when defaultValue changes
  }, [defaultValue]);

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!text) {
      animatedLabel(0);
    }
  };

  const getInputType = () => {
    switch (inputType) {
      case "text":
        return "default";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  };

  const handleTextChange = (text) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
    if (text) {
      animatedLabel(1);
    } else {
      animatedLabel(isFocused ? 1 : 0);
    }
  };

  const animatedLabel = (toValue) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const labelStyle = {
    left: 10,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 0],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ["gray", "#888"],
    }),
  };

  const inputFocusStyle = {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: isFocused ? "#4285F4" : "#EEE",
  };

  const inputDisabledStyle = {
    backgroundColor: isOnlySeen ? "#E0E8F7" : "",
    color: isOnlySeen ? "#FFF" : "#333",
  };

  const inputStyle = {
    flex: 1,
    fontSize: 16,
    height: 50,
    marginTop: placeholder ? 10 : 0,
    paddingLeft: 10,
  };

  return (
    <View style={containerStyle}>
      <View style={[styles.innerContainer]}>
        <Animated.Text style={[styles.label, labelStyle]}>{placeholder}</Animated.Text>
        <View
          style={[
            styles.inputContainer,
            inputFocusStyle,
            inputDisabledStyle,
            error ? { borderWidth: 1, borderColor: "red" } : { borderWidth: 1, borderColor: "#4285F4" },
          ]}
        >
          <TextInput
            {...props}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={text}
            keyboardType={getInputType()}
            textAlignVertical="center"
            textContentType={props.secureTextEntry ? "newPassword" : props.secureTextEntry}
            secureTextEntry={showPassword}
            editable={!isOnlySeen}
          />
          {props.secureTextEntry && !!text && (
            <View>
              <TouchableOpacity style={{ width: 24 }} onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <Icon name="eye-outline" color={"gray"} size={24} />
                ) : (
                  <Icon name="eye-off-outline" color={"gray"} size={24} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    height: 60,
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    color: "gray",
    zIndex: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
});

export default CustomInput;
