import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const CardFeatureLinks = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).btnContainer}>
      <SingleFeature
        iconName="map-pin"
        onPress={() => {
          props.navigation.navigate('FindATMScreen');
        }}
        title="Find an ATM"
      />
      <SingleFeature
        iconName="alert-circle"
        onPress={() => {
          props.navigation.navigate('ReportChoiseScreen');
        }}
        title="Report a Problem"
      />
      <SingleFeature
        onPress={() => {
          props.navigation.navigate('TransferChoiceScreen');
        }}
        iconName="repeat"
        title="Transfer"
      />
    </View>
  );
};

export const SingleFeature = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{
        ...styles(theme).singleFeature,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : theme.colors.background_secondary,
        borderWidth: props.border ? 1 : 0,
      }}
      onPress={props.onPress}>
      <View style={styles(theme).iconContainer}>
        {props.faIcon && (
          <FontAwesome name={props.iconName} color="#5AC53A" size={24} />
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
      width: 45,
      height: 45,
      backgroundColor: theme.colors.text_primary,
    },
    iconTitle: {
      marginTop: 10,
      color: theme.colors.text_primary,
    },
  });
