import React, {useContext} from 'react';
import {ThemeContext} from 'react-native-elements';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Popable} from 'react-native-popable';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const UploadButton = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity style={styles(theme).container} onPress={props.onPress}>
      <AntDesign
        name={props.name}
        size={22}
        color={theme.colors.text_secondary}
      />
      <Text style={styles(theme).label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: theme.colors.text_secondary,
      borderRadius: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background_secondary,
      width: 160,
      height: 120,
    },
    label: {
      color: theme.colors.text_secondary,
      fontSize: 14,
      marginTop: 16,
    },
  });
