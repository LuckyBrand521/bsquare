import React from 'react';
import {Text, View} from 'react-native';

export const ProfitLabel = props => {
  return (
    <View style={{...props.customStyle, flexDirection: 'row'}}>
      <Text style={{color: '#67C431', fontSize: 13, fontWeight: '700'}}>
        {props.greenLabel}{' '}
      </Text>
      <Text style={{color: '#222', fontSize: 13, fontWeight: '500'}}>
        {props.blackLabel}{' '}
      </Text>
    </View>
  );
};
