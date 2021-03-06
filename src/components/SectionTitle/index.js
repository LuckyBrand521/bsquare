import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {colors} from '../../styles/colors';
import {QuestionToolTip} from '../../components/ToolTip';

export const SectionTitle = props => {
  return (
    <Text
      style={{
        marginLeft: props.marginLeft ? props.marginLeft : 16,
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
        color: props.color ? props.color : '#2A2E3B',
      }}>
      ${props.title}
    </Text>
  );
};

export const PanelTitle = props => {
  return (
    <Text
      style={{
        fontFamily: 'HelveticaNeueCyr',
        fontSize: props.fontSize ? props.fontSize : 22,
        fontWeight: 'bold',
        paddingVertical: 0,
        color: props.color ? props.color : '#2A2E3B',
        marginLeft: props.marginLeft ? props.marginLeft : 16,
      }}>
      {props.title}
    </Text>
  );
};

export const SmallLine = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: props.paddingVertical ? props.paddingVertical : 14,
        borderColor: props.borderColor
          ? props.borderColor
          : theme.colors.background_secondary,
        borderBottomWidth: props.bottomBorder ? 1 : 0,
        borderTopWidth: props.topBorder ? 1 : 0,
        width: props.width ? props.width : '100%',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: props.titleSize ? props.titleSize : 13,
            fontWeight: props.bold ? 'bold' : '400',
            color: props.titleColor
              ? props.titleColor
              : theme.colors.text_primary,
            paddingRight: 10,
          }}>
          {props.title}
        </Text>
        {props.hasTooltip && (
          <QuestionToolTip
            content={props.tooltipProps.content}
            position={props.tooltipProps.position}
            size={props.titleSize ? props.titleSize : 13}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: props.valueSize ? props.valueSize : 13,
          fontWeight: props.normal ? '400' : 'bold',
          color: props.valueColor
            ? props.valueColor
            : theme.colors.text_primary,
        }}>
        {props.value}
      </Text>
    </View>
  );
};

export const TwoColSmallLine = props => {
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
      <View>
        <Text
          style={{
            fontSize: props.titleSize ? props.titleSize : 13,
            fontWeight: props.bold ? 'bold' : '400',
            color: props.titleColor ? props.titleColor : colors.tn,
            // fontFamily: 'Helvetica Neue',
          }}>
          {props.titles[0]}
        </Text>
        <Text
          style={{
            fontSize: props.valueSize ? props.valueSize : 13,
            fontWeight: props.normal ? '400' : 'bold',
            color: props.valueColor ? props.valueColor : '#000',
          }}>
          {props.values[0]}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: props.titleSize ? props.titleSize : 13,
            fontWeight: props.bold ? 'bold' : '400',
            color: props.titleColor ? props.titleColor : colors.tn,
          }}>
          {props.titles[1]}
        </Text>
        <Text
          style={{
            fontSize: props.valueSize ? props.valueSize : 13,
            fontWeight: props.normal ? '400' : 'bold',
            color: props.valueColor ? props.valueColor : '#000',
          }}>
          {props.values[1]}
        </Text>
      </View>
    </View>
  );
};
