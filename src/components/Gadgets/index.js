import * as React from 'react';
import {Text, TextPropTypes, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components';
import {ProgressBar} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';

const GrayLabel = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
  padding: 4px;
`;

export const CustomProgressBar = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        // justifyContent: 'space-between',
      }}>
      <ProgressBar
        progress={props.val}
        color={props.color}
        style={{
          backgroundColor: '#EBEFF1',
          height: props.barHeight ? props.barHeight : 4,
          width: props.width ? props.width : '100%',
        }}
      />
      <Text
        style={{
          color: props.textColor ? props.textColor : props.color,
          fontSize: props.textSize ? props.textSize : 13,
          marginLeft: 16,
        }}>
        {props.text}
      </Text>
    </View>
  );
};

export const BrandColorLabel = props => {
  return (
    <View
      style={{
        width: 46,
        height: props.height ? props.height : 20,
        backgroundColor: props.red ? '#E45A28' : '#5AC53A',
        alignItems: 'center',
        borderRadius: 6,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Helvetica Neue',
          color: '#fff',
          fontSize: 10,
          fontWeight: props.bold ? 'bold' : '500',
        }}>
        {props.value}
      </Text>
    </View>
  );
};

export const CryptoPortfolioPanel = props => {
  const itemLength = props.items.length;
  return props.items.map((item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          paddingBottom: 16,
          borderBottomColor:
            itemLength === index + 1 ? 'transparent' : '#EBEFF1',
          borderBottomWidth: itemLength === index + 1 ? 0 : 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 16,
              marginBottom: 6,
              borderRadius: 100,
              borderWidth: 0,
              borderColor: '#111',
              // elevation: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.onPress('CryptoDetailScreen');
              }}>
              <Image
                source={item.coinImage}
                style={{
                  width: 45,
                  height: 45,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 12, fontWeight: '400', color: '#83899D'}}>
            {item.name}
          </Text>
        </View>
        <View style={{flex: 5, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">Quantity</GrayLabel>
            <Text>{item.quantity}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">Bought for</GrayLabel>
            <BrandColorLabel red value={`$${item.bought}`} />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">Current Price</GrayLabel>
            <BrandColorLabel
              green={item.price > item.bought ? true : false}
              red={item.price < item.bought ? true : false}
              value={`$${item.price}`}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">P/L</GrayLabel>
            <BrandColorLabel
              green={item.pl > 0 ? true : false}
              red={item.pl < 0 ? true : false}
              value={`${item.pl}%`}
            />
          </View>
        </View>
      </View>
    );
  });
};

export const CryptoHistoryPanel = props => {
  const itemLength = props.items.length;
  return props.items.map((item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          paddingBottom: 16,
          borderBottomColor:
            itemLength === index + 1 ? 'transparent' : '#EBEFF1',
          borderBottomWidth: itemLength === index + 1 ? 0 : 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 16,
              marginBottom: 6,
              borderRadius: 100,
              borderWidth: 0,
              borderColor: '#111',
            }}>
            <Image
              source={item.coinImage}
              style={{
                width: 45,
                height: 45,
              }}
            />
          </View>
          <Text style={{fontSize: 12, fontWeight: '400', color: '#83899D'}}>
            {item.name}
          </Text>
        </View>
        <View style={{flex: 4, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#2A2E3B">Bought for</GrayLabel>
            <BrandColorLabel red value={`$${item.bought}`} />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#2A2E3B">Sold for</GrayLabel>
            <BrandColorLabel green value={`$${item.sold}`} />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#2A2E3B">P/L</GrayLabel>
            <BrandColorLabel
              green={item.pl > 0 ? true : false}
              red={item.pl < 0 ? true : false}
              value={`${item.pl}%`}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#2A2E3B">Date</GrayLabel>
            <BrandColorLabel green value={item.date} />
          </View>
        </View>
      </View>
    );
  });
};

export const CryptoPerformanceRow = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 16,
        marginTop: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEFF1',
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: '#999'}}>{props.time}</Text>
      </View>
      <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: props.chartData,
              },
            ],
          }}
          width={100}
          height={45}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 3, // optional, defaults to 2dp #E45A28
            color: props.green
              ? (opacity = 1) => 'rgba(103, 196, 49, 1)'
              : (opacity = 1) => 'rgba(228, 90, 40, 1)',
            // style: {
            //   borderRadius: 0,
            //   color: '#0f0',
            // },
            propsForDots: {
              r: '1',
            },
            // propsForBackgroundLines: {strokeWidth: 0},
            propsForVerticalLabels: false,
            propsForBackgroundLines: {
              stroke: '#ffffff',
            },
            strokeWidth: 2,
          }}
          withHorizontalLabels={false}
          // bezier
          style={{
            borderRadius: 0,
            paddingRight: 0,
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <BrandColorLabel
          height={25}
          bold
          red={props.red}
          green={props.green}
          value={props.value}
        />
      </View>
    </View>
  );
};

export const StockPortfolioPanel = props => {
  const itemLength = props.items.length;
  return props.items.map((item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          paddingBottom: 16,
          borderBottomColor:
            itemLength === index + 1 ? 'transparent' : '#EBEFF1',
          borderBottomWidth: itemLength === index + 1 ? 0 : 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 16,
              marginBottom: 6,
              borderRadius: 100,
              borderWidth: 0,
              borderColor: '#111',
              // elevation: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.onPress('StockDetailScreen');
              }}>
              <Image
                source={item.coinImage}
                style={{
                  width: 45,
                  height: 45,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 12, fontWeight: '400', color: '#83899D'}}>
            {item.name}
          </Text>
        </View>
        <View style={{flex: 5, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">Quantity</GrayLabel>
            <Text>{item.quantity}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">Bought for</GrayLabel>
            <BrandColorLabel red value={`$${item.bought}`} />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">Current Price</GrayLabel>
            <BrandColorLabel
              green={item.price > item.bought ? true : false}
              red={item.price < item.bought ? true : false}
              value={`$${item.price}`}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GrayLabel textColor="#83899D">P/L</GrayLabel>
            <BrandColorLabel
              green={item.pl > 0 ? true : false}
              red={item.pl < 0 ? true : false}
              value={`${item.pl}%`}
            />
          </View>
        </View>
      </View>
    );
  });
};

export const CheckMarker = props => {
  return (
    <View
      style={{
        // absolute: props.absolute ? 'absolute' : '',
        // top: 100,
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop,
        width: props.width,
        height: props.height,
        borderRadius: props.width,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name={props.iconStyle.name}
        size={props.iconStyle.size}
        color={props.iconStyle.color}
      />
    </View>
  );
};

export const InvestmentStatusOveriew = props => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <GrayLabel textColor="#2A2E3B">{props.label1}</GrayLabel>
        <BrandColorLabel bold height={25} green value={props.value1} />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <GrayLabel textColor="#2A2E3B">{props.label2}</GrayLabel>
        <BrandColorLabel
          bold
          height={25}
          red={false}
          green
          value={`$${props.value2}`}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <GrayLabel textColor="#2A2E3B">{props.label3}</GrayLabel>
        <BrandColorLabel
          bold
          height={25}
          green={props.value3 > 0 ? true : false}
          red={props.value3 < 0 ? true : false}
          value={`${props.value3}%`}
        />
      </View>
    </View>
  );
};
