import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../styles/colors';
export default StyleSheet.create({
  textInput: {
    backgroundColor: colors.grayColor,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 22,
    color: colors.tm,
  },
});
