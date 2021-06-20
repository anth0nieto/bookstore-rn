import { PRIMARY_LIGHT_COLOR } from "@bookstore/common/constants";
import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { Credentials } from "../model";
import { loginUser } from "../store/slices/user-slice";
import LoginForm from "./login-form";
import { useEffect } from "react";
import { RootState } from "@bookstore/common/store";
import { useContext } from "react";
import { AuthContext } from "@bookstore/router/context";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_LIGHT_COLOR,
  },
  title: {
    color: 'white',
    fontSize: hp(4),
    fontWeight: 'bold',
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
  const { userInfo, isFetching, isError } = useSelector((root: RootState) => root.login.user);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (userInfo.sessionTokenBck !== null) {
      if (authContext) {
        authContext.signIn(userInfo.sessionTokenBck);
      }
    }
  }, [userInfo.sessionTokenBck]);

  const handleSubmit = ({ email, password }: Credentials) => {
    dispatch(loginUser(email, password));
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView
        centerContent={false}
        contentContainerStyle={styles.keyboardAware}>
        <View style={styles.logoContainer}>
          <AntDesign name="book" size={wp(15)} color="white" />
          <Text style={styles.title}>Bookstore</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm
            onSubmit={handleSubmit}
            isLoading={isFetching}
            isError={isError}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginContainer;