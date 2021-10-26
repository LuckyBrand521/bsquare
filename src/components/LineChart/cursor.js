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
      y.value = chartData[parseInt((x.value / width) * chartData.length)];
    },
    onActive: event => {
      active.value = true;
      x.value = event.x;
      y.value = chartData[parseInt((x.value / width) * chartData.length)];
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
