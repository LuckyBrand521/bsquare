import React from 'react';
import {Text, View} from 'react-native';
import {colors, measures} from '../../styles/colors';

export const SectionTitle = props => {
  return (
    <Text
      style={{
        marginLeft: 16,
        fontFamily: 'HelveticaNeueCyr',
        fontSize: props.fontSize ? props.fontSize : 34,
        fontWeight: 'bold',
        paddingVertical: 2,
        color: props.color ? props.color : '#2A2E3B',
      }}>
      {props.title}
    </Text>
  );
};

export const MoneyTitle = props => {
  return (
    <Text
      style={{
        marginLeft: 16,
        fontFamily: 'HelveticaNeueCyr',
        fontSize: 30,
        fontWeight: '500',
        paddingVertical: 0,
        color: '#2A2E3B',
      }}>
      ${props.title}
    </Text>
  );
};

export const PanelTitle = props => {
  return (
    <Text
      style={{
        marginLeft: 16,
        fontFamily: 'HelveticaNeueCyr',
        fontSize: props.fontSize ? props.fontSize : 22,
        fontWeight: 'bold',
        paddingVertical: 0,
        color: props.color ? props.color : '#2A2E3B',
      }}>
      {props.title}
    </Text>
  );
};

export const SmallLine = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: props.paddingVertical ? props.paddingVertical : 14,
        borderColor: props.borderColor ? props.borderColor : '#EBEFF1',
        borderBottomWidth: props.bottomBorder ? 1 : 0,
        borderTopWidth: props.topBorder ? 1 : 0,
        width: props.width ? props.width : '100%',
      }}>
      <Text
        style={{
          fontSize: props.titleSize ? props.titleSize : 13,
          fontWeight: props.bold ? 'bold' : '500',
          color: props.titleColor ? props.titleColor : colors.tn,
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: props.valueSize ? props.valueSize : 13,
          fontWeight: props.normal ? '500' : 'bold',
          color: props.valueColor ? props.valueColor : '#000',
        }}>
        {props.value}
      </Text>
    </View>
  );
};
