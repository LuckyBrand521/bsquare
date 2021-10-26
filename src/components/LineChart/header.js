import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {TrendViewHeader} from '../../components/Headers';
import {StockStateLabel} from '../../components/ProfitLabel';
import {getCryptoQuoteFromCMC} from '../../utils/thirdapi';

export default ChartHeader = ({
  chartData,
  width,
  x,
  coinName,
  coinSlug,
  active,
}) => {
  const coinId = 1; ///change after testing
  const [currentInfo, setCurrentInfo] = useState({});

  useEffect(() => {
    if (Object.keys(currentInfo).length === 0) {
      getCryptoQuoteFromCMC(coinId).then(res => {
        setCurrentInfo(res);
      });
    }
    setInterval(function () {
      getCryptoQuoteFromCMC(coinId).then(res => {
        setCurrentInfo(res);
      });
    }, 15000000);
  }, []);

  const price = useDerivedValue(() => {
    if (!active.value) {
      if (Object.keys(currentInfo).length !== 0) {
        return `$ ${parseFloat(currentInfo.quote.USD.price)
          .toFixed(2)
          .toLocaleString()}`;
      } else {
        return `$ ${chartData.chartValues[
          chartData.chartValues.length - 1
        ].toLocaleString()}`;
      }
    }
    if (
      parseInt((x.value / width) * chartData.chartValues.length) >
      chartData.chartValues.length
    ) {
      return `$ ${chartData.chartValues[
        chartData.chartValues.length - 1
      ].toLocaleString()}`;
    } else if (parseInt((x.value / width) * chartData.chartValues.length) < 0) {
      return `$ ${chartData.chartValues[0].toLocaleString()}`;
    }
    return `$ ${chartData.chartValues[
      parseInt((x.value / width) * chartData.chartValues.length)
    ].toLocaleString()}`;
  });

  const timeLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: active.value ? 1 : 0,
      // display: active.value ? 'block' : 'none',
    };
  });

  const time = useDerivedValue(() => {
    // pointTime =
    //   chartData.first_time +
    //   chartData.interval *
    //     parseInt((x.value / width) * chartData.chartValues.length);
    return `${new Date(
      1000 *
        (chartData.first_time +
          chartData.interval *
            parseInt((x.value / width) * chartData.chartValues.length)),
    ).toLocaleString('en-US')}`;
  });

  return (
    <View>
      <Text style={styles.coinName}>{coinName}</Text>
      <TrendViewHeader
        title={coinSlug}
        source={require('../../assets/icons/candle.png')}
      />
      <ReText style={styles.price} text={price} />
      <Animated.View style={[styles.timeView]}>
        <Animated.View style={[timeLabelStyle]}>
          <ReText style={{paddingVertical: 0}} text={time} />
        </Animated.View>
        {Object.keys(currentInfo).length !== 0 && (
          <StockStateLabel
            customStyle={{marginLeft: 16}}
            percentage={parseFloat(currentInfo.quote.USD.percent_change_24h)}
            currentPrice={parseFloat(currentInfo.quote.USD.price)}
            blackLabel="Today"
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  coinName: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'HelveticaNeueCyr',
    marginVertical: 10,
  },
  coinPrice: {
    marginLeft: 16,
    fontFamily: 'HelveticaNeueCyr',
    fontSize: 30,
    fontWeight: '500',
    paddingVertical: 0,
    color: '#2A2E3B',
  },
  cursor: {},
  cursorbody: {
    backgroundColor: '#E45A28',
    borderRadius: 20,
    width: 10,
    height: 10,
  },
  price: {
    fontSize: 30,
    marginTop: 0,
    marginLeft: 16,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingLeft: 16,
    marginVertical: 0,
  },
});
