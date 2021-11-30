import React, {useContext} from 'react';
import {View} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {PanelTitle} from '../../components/SectionTitle';
import {CryptoPerformanceRow} from '../../components/Gadgets';
const ranges = [
  {id: 0, label: '1D'},
  {id: 1, label: '7D'},
  {id: 2, label: '1M'},
  {id: 3, label: '3M'},
  {id: 4, label: '1Y'},
  {id: 5, label: 'ALL'},
];

const stockRanges = [
  {id: 0, label: '1D'},
  {id: 1, label: '5D'},
  {id: 2, label: '1M'},
  {id: 3, label: '6M'},
  {id: 4, label: '1Y'},
  {id: 5, label: 'ALL'},
];

export default CoinPerformanceView = ({graphData}) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={{marginTop: 16}}>
      <PanelTitle color={theme.colors.text_primary} title="Performance" />
      {ranges.map((item, index) => {
        const chartData = graphData[item.id].chartValues;
        const percent =
          ((chartData[chartData.length - 1] - chartData[0]) / chartData[0]) *
          100;
        return (
          <CryptoPerformanceRow
            red={percent > 0 ? false : true}
            green={percent < 0 ? false : true}
            time={item.label}
            value={percent.toFixed(2) + '%'}
            chartData={shrinkArray(chartData, 10)}
            key={index}
          />
        );
      })}
    </View>
  );
};

export const StockPerformanceView = ({graphData}) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={{marginTop: 16}}>
      <PanelTitle color={theme.colors.text_primary} title="Performance" />
      {stockRanges.map((item, index) => {
        const chartData = graphData[item.id].chartValues;
        const percent =
          ((chartData[chartData.length - 1] - chartData[0]) / chartData[0]) *
          100;
        return (
          <CryptoPerformanceRow
            red={percent > 0 ? false : true}
            green={percent < 0 ? false : true}
            time={item.label}
            value={percent.toFixed(2) + '%'}
            chartData={shrinkArray(chartData, 10)}
            key={index}
          />
        );
      })}
    </View>
  );
};

const shrinkArray = (arr, step) => {
  let index = step;
  let v = [];
  arr.map(item => {
    if (index == step) {
      index = 0;
      v.push(item);
    }
    index++;
  });
  return v;
};
