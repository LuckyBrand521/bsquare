import React, {useContext} from 'react';
import {ThemeContext} from 'react-native-elements';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Popable} from 'react-native-popable';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const TouchableBorderedWrapper = ({onPress, children}) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity style={styles(theme).borderedWrapper} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
export const FlexRowWrapper = ({children}) => {
  const theme = useContext(ThemeContext).theme;
  return <View style={styles(theme).flexRow}>{children}</View>;
};
export const FlexBetweenWrapper = ({children, style}) => {
  const theme = useContext(ThemeContext).theme;
  return <View style={[styles(theme).flexBetween, style]}>{children}</View>;
};
const styles = theme =>
  StyleSheet.create({
    borderedWrapper: {
      borderWidth: 1,
      borderColor: theme.colors.text_secondary,
      borderRadius: 10,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
