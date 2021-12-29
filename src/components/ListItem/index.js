import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from 'react-native-elements';
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

export const ListItemWithGreenArrow = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity style={styles(theme).item2} onPress={props.onPress}>
      <View>
        <Text style={styles(theme).mediumText}>{props.content1}</Text>
        <Text style={styles(theme).normalsmallLabel}>{props.content2}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={theme.colors.green} />
    </TouchableOpacity>
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

export const ListItemWithPriceDate = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={{...styles(theme).item, paddingVertical: 10}}>
      <View style={{...styles(theme).flexBetween, width: '100%'}}>
        <View>
          <Text style={styles(theme).itemText}>{props.content}</Text>
          <Text style={styles(theme).grayText}>{cvtDate(props.time)}</Text>
        </View>
        <Text style={styles(theme).itemText}>${props.price}</Text>
      </View>
    </View>
  );
};

export const ListItemWithSwitch = props => {
  const theme = useContext(ThemeContext).theme;
  const [isOn, setIsOn] = useState(props.isOn);
  return (
    <View
      style={{...styles(theme).item, marginHorizontal: 0, paddingVertical: 13}}>
      <Text style={styles(theme).normalText}>{props.content}</Text>
      <ToggleSwitch
        isOn={props.isOn}
        onColor="#5AC53A"
        offColor={theme.colors.text_secondary}
        size="large"
        onToggle={() => {
          if (props.onToggle) {
            props.onToggle();
          } else {
            setIsOn(isOn);
          }
        }}
      />
    </View>
  );
};

export const ListItemWithImage = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{
        ...styles(theme).item,
        paddingVertical: 0,
        marginHorizontal: 0,
      }}
      onPress={props.onPress}>
      <View style={styles(theme).flexRow}>
        <SingleFeature
          faIcon={props.faIcon}
          iconName={props.iconName}
          onPress={() => {}}
          backgroundColor="transparent"
          border={false}
        />
        <Text
          style={{
            ...styles(theme).normalText,
            fontWeight: '700',
            fontSize: props.fontSize
              ? props.fontSize
              : styles(theme).normalText.fontSize,
          }}>
          {props.content}
        </Text>
      </View>
      <Icon
        name={props.rightIcon ? props.rightIcon : 'chevron-right'}
        size={24}
        color={theme.colors.green}
      />
    </TouchableOpacity>
  );
};

export const ListItemThree = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{
        ...styles(theme).threeColumn,
        borderBottomColor: props.bordered
          ? theme.colors.background_third
          : 'transparent',
        borderBottomWidth: props.bordered ? 1 : 0,
      }}
      onPress={props.onPress}>
      <Text style={styles(theme).normalLabel}>{props.value[0]}</Text>
      <Text style={styles(theme).normalLabel}>{props.value[1]}</Text>
      <Text style={styles(theme).normalLabel}>{props.value[2]}</Text>
    </TouchableOpacity>
  );
};

export const ListItemThree2 = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View
      style={{
        ...styles(theme).threeColumn,
        borderBottomColor: props.bordered
          ? theme.colors.background_third
          : 'transparent',
        borderBottomWidth: props.bordered ? 1 : 0,
      }}>
      <Text style={styles(theme).normalsmallLabel}>{props.value[0]}</Text>
      <Text style={styles(theme).normalsmallLabel}>{props.value[1]}</Text>
      <Text style={styles(theme).normalsmallLabel}>{props.value[2]}</Text>
    </View>
  );
};

const cvtTime = time => {
  const f = new Date(time);
  return f.toLocaleString();
};
const cvtDate = time => {
  const f = new Date(time);
  return f.toDateString();
};
const styles = theme =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background_secondary,
      marginHorizontal: 16,
      paddingRight: 5,
    },
    item2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background_third,
    },
    threeColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
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
    mediumText: {
      fontWeight: '700',
      fontSize: 16,
      color: theme.colors.text_primary,
    },
    normalLabel: {
      fontWeight: '400',
      fontSize: 16,
      color: theme.colors.text_primary,
    },
    normalsmallLabel: {
      fontWeight: '400',
      fontSize: 13,
      color: theme.colors.text_secondary,
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
