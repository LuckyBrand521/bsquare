import React from 'react';
import {View, StyleSheet} from 'react-native';

const LevelBar = props => {
  // const data = props.data;
  const level = props.level;
  const data = [
    {colored: level == 5 ? true : false, value: 24},
    {colored: level >= 4 ? true : false, value: 19.5},
    {colored: level >= 3 ? true : false, value: 16.5},
    {colored: level >= 2 ? true : false, value: 12},
    {colored: level >= 1 ? true : false, value: 9},
  ];

  return (
    <View style={{...styles.barWrapper, marginTop: props.background ? 10 : 0}}>
      {data.map((item, index) => {
        return (
          <View key={index} style={{justifyContent: 'flex-end'}}>
            <View
              style={{
                ...styles.barStyle,
                height: item.value * props.scale,
                marginHorizontal: props.scale * 1.5,
                backgroundColor: item.colored ? '#5AC53A' : '#EBEFF1',
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default LevelBar;

const styles = StyleSheet.create({
  barWrapper: {
    flexDirection: 'row',
  },
  barStyle: {
    borderRadius: 3,
    width: 3,
  },
});
