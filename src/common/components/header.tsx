import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PRIMARY_DARK_COLOR } from '../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

type HeaderProps = {
  title: string;
  buttonIcon: React.FunctionComponent,
  onPress?: () => void;
}

const styles = StyleSheet.create({
  root: {
    height: hp(8),
    width: wp(100),
    backgroundColor: 'white',
    elevation: hp(2),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(3),
    marginHorizontal: wp(2),
    fontWeight: 'bold',
    color: PRIMARY_DARK_COLOR,
  },
  button: {
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Header: React.FC<HeaderProps> = (
  { title,
    onPress = () => { },
    buttonIcon: ButtonIcon
  }) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <AntDesign name="book" size={wp(8)} color={PRIMARY_DARK_COLOR} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onPress}>
          <ButtonIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;