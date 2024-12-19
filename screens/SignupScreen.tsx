import AppTextInput from "@/components/AppTextInput";
import Colors from "@/constants/Colors";
import FontSize from "@/constants/FontSize";
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

const SignupScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.semiCircle} />

      <View
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Calibri",
              fontSize: FontSize.xLarge,
              maxWidth: "80%",
              textAlign: "center",
              color: Colors.text,
              marginBottom: 20,
              fontWeight: "bold",
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontFamily: "Calibri-bold",
              fontSize: FontSize.medium,
              fontWeight: "bold",
              maxWidth: "75%",
              textAlign: "center",
              color: Colors.text,
            }}
          >
            Create a new account to see clothes rented near you!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 5,
          }}
        >
          <AppTextInput placeholder="Email" />
          <AppTextInput placeholder="Password" />
          <AppTextInput placeholder="Confirm Password" />
        </View>

      </View>


      {/* Sign Up Button */}
      <TouchableOpacity
        style={{
          padding: 10 * 2,
          backgroundColor: Colors.primary,
          marginVertical: 10 * 3,
          borderRadius: 10,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          width:  Dimensions.get("window").width - 40,
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
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* Already Have Account */}
      <TouchableOpacity
        onPress={() => console.log("Navigate to Login")} // Replace with navigation logic
        style={{
          padding: 10,
        }}
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
          Already have an account
        </Text>
      </TouchableOpacity>

      {/* Social Media Options */}
      <View
        style={{
          marginVertical: 10 * 3,
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            color: Colors.primary,
            textAlign: "center",
            fontSize: FontSize.small,
            fontWeight: "bold",
          }}
        >
          Or continue with
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {/* Google Button */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: Colors.mutedBackground,
              borderRadius: 10 / 2,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="logo-google"
              color={Colors.text}
              size={10 * 2}
            />
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: Colors.mutedBackground,
              borderRadius: 10 / 2,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="logo-apple"
              color={Colors.text}
              size={10 * 2}
            />
          </TouchableOpacity>

          {/* Facebook Button */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: Colors.mutedBackground,
              borderRadius: 10 / 2,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="logo-facebook"
              color={Colors.text}
              size={10 * 2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    semiCircle: {
      position: "absolute",
      top: -250, // Move it partially off-screen
      right: -250, // Move it partially off-screen
      width: 500, // Diameter of the circle
      height: 500, // Same as the width for a perfect circle
      backgroundColor: Colors.mutedBackground, // Use your gray color
      borderRadius: 250, // Half of the width/height to make it a circle
      zIndex: -1, // Ensure it appears behind the content
    },
    content: {
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontFamily: "poppins-bold",
      fontSize: 28,
      color: Colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: "poppins-regular",
      fontSize: 16,
      color: Colors.text,
      textAlign: "center",
    },
  });

export default SignupScreen;
