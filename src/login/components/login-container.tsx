import { PRIMARY_DARK_COLOR, PRIMARY_LIGHT_COLOR } from "@bookstore/common/constants";
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { Credentials } from "../model";
import { loginUser } from "../store/slices/user-slice";
import LoginForm from "./login-form";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_LIGHT_COLOR,
  },
  keyboardAware: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    marginTop: hp(1),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 3,
  },
});

const LoginContainer: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }: Credentials) => {
    dispatch(loginUser(email, password));
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView
        centerContent={false}
        contentContainerStyle={styles.keyboardAware}>
        <View style={styles.logoContainer}>

        </View>
        <View style={styles.formContainer}>
          <LoginForm onSubmit={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginContainer;