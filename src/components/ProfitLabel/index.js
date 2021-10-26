import React, {useState, useRef, useEffect} from 'react';
import {Text, View} from 'react-native';

export const ProfitLabel = props => {
  return (
    <View
      style={{
        ...props.customStyle,
        flexDirection: 'row',
      }}>
      <Text style={{color: '#67C431', fontSize: 13, fontWeight: '700'}}>
        {props.greenLabel}{' '}
      </Text>
      <Text style={{color: '#222', fontSize: 13, fontWeight: '500'}}>
        {props.blackLabel}{' '}
      </Text>
    </View>
  );
};

export const StockStateLabel = props => {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (props.percentage > 0) {
      setLabel(
        `▲ $${(
          (props.currentPrice * props.percentage) /
          (props.percentage + 100)
        ).toFixed(2)}(${props.percentage.toFixed(2)}%)`,
      );
    } else {
      setLabel(
        `▼ $${(
          (props.currentPrice * props.percentage) /
          (props.percentage + 100)
        ).toFixed(2)}(${Math.abs(props.percentage).toFixed(2)}%)`,
      );
    }
  }, []);
  return (
    <View
      style={{
        ...props.customStyle,
        flexDirection: 'row',
      }}>
      <Text
        style={{
          color: props.percentage > 0 ? '#67C431' : '#E45A28',
          fontSize: 13,
          fontWeight: '700',
        }}>
        {label}{' '}
      </Text>
      <Text style={{color: '#222', fontSize: 13, fontWeight: '500'}}>
        {props.blackLabel}{' '}
      </Text>
    </View>
  );
};
