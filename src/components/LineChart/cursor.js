import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

export default Cursor = ({chartData, width, x, y, active}) => {
  const CURSOR_RADIUS = 5;
  const gestureHandler = useAnimatedGestureHandler({
    onStart: event => {
      x.value = event.x;
      y.value = chartData[parseInt((x.value / width) * chartData.length)]
        ? chartData[parseInt((x.value / width) * chartData.length)]
        : 0;
    },
    onActive: event => {
      active.value = true;
      x.value = event.x;
      if (x.value >= width) {
        x.value = width - 1;
      } else if (x.value < 0) {
        x.value = 0;
      }
      y.value = chartData[parseInt((x.value / width) * chartData.length)]
        ? chartData[parseInt((x.value / width) * chartData.length)]
        : 0;
    },
    onEnd: () => {
      active.value = false;
    },
  });
  let translateY = 100;
  const style = useAnimatedStyle(() => {
    const translateX = x.value - CURSOR_RADIUS;
    translateY = y.value - CURSOR_RADIUS;
    // const translateY = 100;
    return {
      transform: [{translateX}, {translateY}],
      opacity: withTiming(active.value ? 1 : 0),
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.cursor, style]}>
          <View style={styles.cursorbody} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cursor: {},
  cursorbody: {
    backgroundColor: '#E45A28',
    borderRadius: 20,
    width: 10,
    height: 10,
  },
});
