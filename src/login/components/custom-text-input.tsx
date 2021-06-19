import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

type CustomTextInputProps = {
  title: string;
} & TextInputProps;

const styles = StyleSheet.create({
  container: {
    width: wp(80),
    height: hp(6.2),
    alignSelf: 'center',
    marginTop: hp(3),
    backgroundColor: '#fff',
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    paddingLeft: wp(3),
    fontSize: hp(2.4),
  },
  buttonEye: {
    justifyContent: 'center',
    marginRight: wp(5),
  },
});

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { title, secureTextEntry = false } = props;
  const [secureText, setSecureText] = useState(true);
  return (
    <View
      style={styles.container}>
      <TextInput
        {...props}
        placeholder={title}
        secureTextEntry={secureText && secureTextEntry}
        style={{ ...styles.textInput, width: wp(secureTextEntry ? 65 : 80), }}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.buttonEye}>
          <FontAwesome5
            name={secureText ? 'eye' : 'eye-slash'}
            size={wp(5)}
            color="#777"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};



export default CustomTextInput;