import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from 'react-native-elements';
import {Icon as FAIcon} from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import {SingleFeature} from '../CardFeatureLinks';

export const ListItemWithArrow = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).item}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles(theme).normalText}>{props.content}</Text>
      </TouchableOpacity>
      <Icon
        name="chevron-right"
        size={20}
        color={theme.colors.text_secondary}
      />
    </View>
  );
};
export const ListItemWithOutArrow = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).borderedItem}>
      <Text style={styles(theme).normalText}>{props.content}</Text>
      <Text style={styles(theme).normalText}>{props.content}</Text>
    </View>
  );
};

export const ListItemWithPrice = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={{...styles(theme).item, paddingVertical: 10}}>
      <View style={styles(theme).flexBetween}>
        <View>
          <Text style={styles(theme).itemText}>{props.content}</Text>
          <Text style={styles(theme).grayText}>{cvtTime(props.time)}</Text>
        </View>
        <Text style={styles(theme).itemText}>${props.price}</Text>
      </View>
      <Icon
        name="chevron-right"
        size={20}
        color={theme.colors.text_secondary}
      />
    </View>
  );
};

export const ListItemWithSwitch = props => {
  const theme = useContext(ThemeContext).theme;
  const [isOn, setIsOn] = useState(props.isOn);
  return (
    <View
      style={{...styles(theme).item, marginHorizontal: 0, paddingVertical: 16}}>
      <Text style={styles(theme).normalText}>{props.content}</Text>
      <ToggleSwitch
        isOn={isOn}
        onColor="#5AC53A"
        offColor={theme.colors.text_secondary}
        size="large"
        onToggle={isOn => {
          setIsOn(isOn);
        }}
      />
    </View>
  );
};

export const ListItemWithImage = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{...styles(theme).item, paddingVertical: 0, marginHorizontal: 0}}>
      <View style={styles(theme).flexRow}>
        <SingleFeature
          faIcon={props.faIcon}
          iconName={props.iconName}
          onPress={() => {}}
          backgroundColor="transparent"
          border={false}
        />
        <Text style={{...styles(theme).normalText, fontWeight: '700'}}>
          {props.content}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color="#5AC53A" />
    </TouchableOpacity>
  );
};

export const ListItemThree = props => {
  const theme = useContext(ThemeContext).theme;
  <View style={styles(theme).threeColumn} />;
};

const cvtTime = time => {
  const f = new Date(time);
  return f.toLocaleString();
};

const styles = theme =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background_third,
      marginHorizontal: 16,
      paddingRight: 5,
    },
    threeColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    borderedItem: {
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background_third,
      marginHorizontal: 16,
    },
    normalText: {
      fontWeight: '700',
      fontSize: 13,
      color: theme.colors.text_primary,
    },
    itemText: {
      fontWeight: '600',
      fontSize: 16,
      color: theme.colors.text_primary,
    },
    grayText: {
      fontWeight: '400',
      fontSize: 13,
      color: theme.colors.text_secondary,
    },
    flexBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '85%',
      alignItems: 'center',
    },
    flexRow: {
      flexDirection: 'row',
      width: '85%',
      alignItems: 'center',
    },
  });
