import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//custom styles
import {globalStyles} from '../../styles/global';
import {colors} from '../../styles/colors';

export const BubbleButton = props => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
        width: props.radius ? 2 * props.radius : 100,
        height: props.radius ? 2 * props.radius : 100,
        backgroundColor: props.backgroundColor,
        left: props.position.x ? props.position.x : 80,
        top: props.position.y ? props.position.y : 80,
      }}
      onPress={props.onPress}>
      <Text style={{fontSize: 12, fontWeight: '400'}}>{props.title}</Text>
      <Text style={{fontSize: 17, fontWeight: '700'}}>${props.quantity}</Text>
    </TouchableOpacity>
  );
};

export const BubbleChart = props => {
  const panelWidth = props.panelSize.width;
  const panelHeight = props.panelSize.height;
  return <TouchableOpacity />;
};

export const BlackRoundButton = props => {
  return (
    <TouchableOpacity
      style={{
        ...props.customStyle,
        width: 237,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2E3B',
        borderRadius: 40,
      }}
      onPress={() => {
        props.onPress ? props.onPress() : null;
      }}>
      <Image
        source={props.iconUrl}
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'transparent',
          borderRadius: 4,
          marginRight: 16,
        }}
      />
      <Text
        style={{
          fontFamily: 'SF UI Display',
          color: '#fff',
          fontSize: 16,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export const CloseButton = props => {
  return (
    <TouchableOpacity style={globalStyles.closeButton} onPress={props.onPress}>
      <Icon name="x" size={28} color={colors.tn} />
    </TouchableOpacity>
  );
};

export const ContinueBottomBtn = props => {
  return (
    <TouchableOpacity
      style={globalStyles.continueBottomBtn}
      onPress={props.onPress}>
      <Text style={globalStyles.whiteText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

const calcRadius = varList => {
  const minRadius = 40;
  return varList;
};
