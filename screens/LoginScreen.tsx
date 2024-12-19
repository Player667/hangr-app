import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppTextInput from "@/components/AppTextInput";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.semiCircle} />

      <View style={{ padding: 20 }}>
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text
            style={{
              fontFamily: "Calibri",
              fontSize: FontSize.xxLarge,
              maxWidth: "60%",
              textAlign: "center",
              color: Colors.text,
              marginBottom: 30,
              fontWeight: "bold",
            }}
          >
            Login Here
          </Text>

          <Text
            style={{
              fontFamily: "Calibri-bold",
              fontSize: FontSize.large,
              fontWeight: "bold",
              maxWidth: "65%",
              textAlign: "center",
              color: Colors.text,
            }}
          >
            Welcome back, you've been missed!
          </Text>
        </View>

        <View style={{ marginVertical: 30 }}>
          <AppTextInput
            placeholder="Email"
          />
          <AppTextInput
            placeholder="Password"
          />
        </View>
      </View>

      <View style={{ width: Dimensions.get("window").width - 40 }}>
        <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: FontSize.small,
              fontWeight: "bold",
              color: Colors.primary,
              alignSelf: "center",
            }}
          >
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={() => console.log("Sign In Pressed")}
        style={{
          padding: 18,
          backgroundColor: Colors.primary,
          marginVertical: 30,
          borderRadius: 10,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          width: Dimensions.get("window").width - 40,
        }}
      >
        <Text
          style={{
            fontFamily: "Calibri",
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
            fontWeight: "bold",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Need to Sign Up? */}
      <TouchableOpacity
        onPress={() => console.log("Navigate to Sign Up")}
        style={{ padding: 10 }}
      >
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            color: Colors.text,
            textAlign: "center",
            fontSize: FontSize.small,
            fontWeight: "bold",
          }}
        >
          Don't have an account?
        </Text>
      </TouchableOpacity>

      {/* Social Media Options */}
      <View style={{ marginVertical: 30 }}>
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            color: Colors.primary,
            textAlign: "center",
            fontSize: FontSize.small,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Or continue with
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* Google Button */}
          <TouchableOpacity
            onPress={() => console.log("Google Pressed")}
            style={{
              padding: 10,
              backgroundColor: Colors.mutedBackground,
              borderRadius: 10 / 2,
              marginHorizontal: 10,
            }}
          >
            <Ionicons name="logo-google" color={Colors.text} size={20} />
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity
            onPress={() => console.log("Apple Pressed")}
            style={{
              padding: 10,
              backgroundColor: Colors.mutedBackground,
              borderRadius: 10 / 2,
              marginHorizontal: 10,
            }}
          >
            <Ionicons name="logo-apple" color={Colors.text} size={20} />
          </TouchableOpacity>

          {/* Facebook Button */}
          <TouchableOpacity
            onPress={() => console.log("Facebook Pressed")}
            style={{
              padding: 10,
              backgroundColor: Colors.mutedBackground,
              borderRadius: 10 / 2,
              marginHorizontal: 10,
            }}
          >
            <Ionicons name="logo-facebook" color={Colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  semiCircle: {
    position: "absolute",
    top: -250,
    right: -250,
    width: 500,
    height: 500,
    backgroundColor: Colors.mutedBackground,
    borderRadius: 250,
    zIndex: -1,
  },
});
