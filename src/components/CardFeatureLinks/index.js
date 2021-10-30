import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {Icon as FAIcon} from 'react-native-vector-icons/FontAwesome';

export const CardFeatureLinks = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).btnContainer}>
      <SingleFeature iconName="map-pin" title="Find an ATM" />
      <SingleFeature iconName="alert-circle" title="Report a Problem" />
      <SingleFeature iconName="repeat" title="Transfer" />
    </View>
  );
};

export const SingleFeature = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity style={styles(theme).singleFeature}>
      <View style={styles(theme).iconContainer}>
        {props.faIcon && (
          <FAIcon name={props.iconName} color="#5AC53A" size={24} />
        )}
        {!props.faIcon && (
          <Icon name={props.iconName} color="#5AC53A" size={24} />
        )}
      </View>
      {props.title && (
        <Text style={styles(theme).iconTitle}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = theme =>
  StyleSheet.create({
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
    },
    singleFeature: {
      width: '30%',
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: theme.colors.background_secondary,
      borderColor: theme.colors.background_secondary,
      padding: 12,
    },
    iconContainer: {
      borderRadius: 100,
      borderColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      backgroundColor: theme.colors.text_primary,
    },
    iconTitle: {
      marginTop: 10,
      color: theme.colors.text_primary,
    },
  });
