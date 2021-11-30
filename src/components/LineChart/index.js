import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import {Svg, Path} from 'react-native-svg';
import Cursor from './cursor';
import ChartHeader from './header';
//custom Style
import {investmentStyles} from '../../styles/investment';
const AnimatedPath = Animated.createAnimatedComponent(Path);
const ranges = [
  {id: 0, label: '1D'},
  {id: 1, label: '7D'},
  {id: 2, label: '1M'},
  {id: 3, label: '3M'},
  {id: 4, label: '1Y'},
  {id: 5, label: 'ALL'},
];

export default SVGLineChart = props => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const [current, setCurrent] = useState(0);
  const active = useSharedValue(false);
  const chartData = cvtArraytoChartData(
    props.graphData[current].chartValues,
    20,
    props.height - 10,
    props.width,
  );
  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = chartData.path;
    return {
      d: path,
    };
  });
  return (
    <View>
      <ChartHeader
        chartData={props.graphData[current]}
        currentPrice={props.stockDetail ? props.stockDetail.currentPrice : 0}
        width={props.width}
        x={x}
        coinId={props.coinId}
        coinName={props.coinName}
        coinSlug={props.coinSlug}
        active={active}
        type={props.type}
        detail={props.productData ? props.productData : ''}
      />
      <View>
        <Svg height={props.height} width={props.width}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="none"
            stroke="#5AC53A"
            strokeWidth="2"
          />
        </Svg>
        <Cursor
          chartData={chartData.val_arr}
          width={props.width}
          x={x}
          y={y}
          active={active}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {ranges.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrent(item.id);
              }}>
              <Text
                style={
                  current == item.id
                    ? investmentStyles.slotActive
                    : investmentStyles.greenChartSlot
                }>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const cvtArraytoChartData = (data, min, max, width) => {
  const length = data.length;
  const min_val = Math.min(...data);
  const max_val = Math.max(...data);
  let res_arr = [];
  let path_str = '';
  let prefix = 'M';
  for (let i = 0; i < length; i++) {
    let yVal = ((max_val - data[i]) / (max_val - min_val)) * (max - min) + 20;
    let xVal = (i * width) / length;
    path_str += `${prefix}${xVal} ${yVal} `;
    prefix = 'L';
    res_arr.push(yVal);
  }
  return {path: path_str, val_arr: res_arr};
};
const styles = StyleSheet.create({
  cursor: {},
  cursorbody: {
    backgroundColor: '#000',
    borderRadius: 20,
    width: 10,
    height: 10,
  },
});
