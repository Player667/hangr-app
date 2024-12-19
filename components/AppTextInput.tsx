import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
  } from "react-native";
  import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Icon } from "react-native-vector-icons/Icon";
  
  const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.lightBlack}
        style={[
          {
            fontFamily: "poppins-regular",
            fontSize: 14,
            fontWeight: "bold",
            padding: 24,
            backgroundColor: Colors.background,
            borderRadius: 10,
            marginVertical: 10,
            width: Dimensions.get("window").width - 40
          },
          focused && {
            borderWidth: 3,
            borderColor: Colors.primary,
            shadowOffset: { width: 4, height: 10 },
            shadowColor: Colors.primary,
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
          !focused && {
            borderWidth: 3,
            borderColor: Colors.lightBlack
          }
        ]}
        {...otherProps}
      />
    );
  };
  
  export default AppTextInput;
  
  const styles = StyleSheet.create({});