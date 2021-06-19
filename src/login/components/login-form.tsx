import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from './custom-button';
import { EMAIL_ADDRESS, FORGOT_PASSWORD, PASSWORD, SIGN_IN } from '../constants';
import CustomTextInput from './custom-text-input';
import { Credentials } from '../model';

type LoginFormProps = {
  onSubmit: (credentials: Credentials) => void;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  forgotButton: {
    marginTop: hp(2),
  },
  forgotText: {
    textAlign: 'center',
    fontSize: wp(3),
    color: '#fff',
  },
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {

  const [state, setState] = useState<Credentials>({
    email: "",
    password: "",
  });

  return (
    <View style={styles.root}>
      <CustomTextInput
        title={EMAIL_ADDRESS}
        value={state.email}
        onChangeText={(email: string) => setState({ ...state, email })}
      />

      <CustomTextInput
        title={PASSWORD}
        value={state.password}
        secureTextEntry={true}
        onChangeText={(password: string) => setState({ ...state, password })}
      />

      <CustomButton
        text={SIGN_IN}
        disabled={false}
        activeOpacity={0.2}
        onPress={() => onSubmit(state)}
      />

      <TouchableOpacity
        style={styles.forgotButton}>
        <Text style={styles.forgotText}>
          {FORGOT_PASSWORD}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
