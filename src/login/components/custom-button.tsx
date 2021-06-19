import { PRIMARY_COLOR } from "@bookstore/common/constants";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

type CustomButtonProps = {
  text: string;
  backgroundColor?: string;
} & TouchableOpacityProps;

const styles = StyleSheet.create({
  root: {
    width: wp(80),
    height: hp(6.3),
    alignSelf: 'center',
    backgroundColor: PRIMARY_COLOR,
    marginTop: hp(4),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});


const CustomButton: React.FC<CustomButtonProps> = ({ text, disabled, onPress, backgroundColor = PRIMARY_COLOR }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.root, backgroundColor }}
      disabled={disabled}
      onPress={onPress} >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;