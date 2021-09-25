import React, {useState, useRef} from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
import {Paragraph} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import Dash from 'react-native-dash';
//custom components
import {PanelTitle} from '../../components/SectionTitle';
import {
  RatingStoryPopup,
  TradingCheckoutFirst,
  TradingCheckoutOrder,
  TradingReceipt,
  PurchaseComplete,
} from '../../components/InvestCheckout';
import {ProfitLabel} from '../../components/ProfitLabel';
import {SmallLine} from '../../components/SectionTitle';
import {AnalCard, NewsCard} from '../../components/Card';
import {NavigationHeader, TrendViewHeader} from '../../components/Headers';
import {
  CustomProgressBar,
  BrandColorLabel,
  CryptoPerformanceRow,
} from '../../components/Gadgets';
//custom styles
import {investmentStyles, cryptoStyles} from '../../styles/investment';

import {newsList, analList, cryptoPerformanceList} from '../../store/datalist';

const genChartData = count => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(((Math.random() * 0.1 + 0.8) * 15000).toFixed(0));
  }
  return data;
};

const GrayLabel = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
  padding: 4px;
`;
const CryptoDetailScreen = ({navigation}) => {
  const priceEl = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
  const [cryptoName, setCryptoName] = useState('BTC');
  const [chartData, setChartData] = useState(genChartData(48));
  const [chartSlotIndex, setChartSlotIndex] = useState(1);
  // const [cryptoPrice, setCryptoPrice] = useState(chartData[chartData.length - 1]);
  const [cryptoPrice, setCryptoPrice] = useState(
    chartData[chartData.length - 1],
  );
  const touch = useRef(new Animated.ValueXY({x: -2, y: 0})).current;
  const handleChartScope = index => {
    setChartSlotIndex(index);
    switch (index) {
      case 1:
        setChartData(genChartData(60));
        break;
      case 2:
        setChartData(genChartData(60));
        break;
      case 3:
        setChartData(genChartData(60));
        break;
      case 4:
        setChartData(genChartData(60));
        break;
      case 5:
        setChartData(genChartData(60));
        break;
      case 6:
        setChartData(genChartData(60));
        break;
    }
    setCryptoPrice(chartData[chartData.length - 1]);
  };
  return (
    <SafeAreaView style={investmentStyles.container}>
      <NavigationHeader
        title=""
        onPress={() => {
          navigation.navigate('CryptoHomeScreen');
        }}
      />
      <ScrollView>
        <Text
          style={{
            marginLeft: 16,
            fontSize: 16,
            fontFamily: 'HelveticaNeueCyr',
            marginVertical: 10,
          }}>
          {cryptoName}
        </Text>
        <TrendViewHeader
          title="Bitcoin"
          source={require('../../assets/icons/candle.png')}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: 16,
              fontFamily: 'HelveticaNeueCyr',
              fontSize: 30,
              fontWeight: '500',
              paddingVertical: 0,
              color: '#2A2E3B',
            }}>
            $
          </Text>
          <TextInput
            style={{
              fontFamily: 'HelveticaNeueCyr',
              fontSize: 30,
              fontWeight: '500',
              paddingVertical: 0,
              color: '#2A2E3B',
            }}
            editable={false}
            ref={priceEl}
            value={
              cryptoPrice
                ? cryptoPrice
                : priceEl?.current?.text
                ? priceEl.current.text
                : ''
            }
          />
        </View>
        <ProfitLabel
          customStyle={{marginLeft: 16, marginTop: 10}}
          greenLabel="▲ $2.45 (0.12%)"
          blackLabel="Today"
        />
        <View style={{justifyContent: 'center'}}>
          <View
            style={{marginVertical: 16}}
            onStartShouldSetResponder={() => true}
            onResponderMove={event => {
              const xIndex = parseInt(event.nativeEvent.locationX / 7);
              touch.setValue({
                x: event.nativeEvent.locationX,
                // y: event.nativeEvent.locationY,
                y: chartData[xIndex],
              });
              if (priceEl.current) {
                priceEl.current.text = chartData[xIndex];
                priceEl.current.setNativeProps({text: chartData[xIndex]});
              }
            }}
            onResponderRelease={event => {
              touch.setValue({
                x: -2,
                y: 0,
              });
            }}>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 3, // optional, defaults to 2dp
                color: (opacity = 1) => 'rgba(103, 196, 49, 1)',
                labelColor: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
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
                marginVertical: 8,
                marginTop: 15,
                borderRadius: 0,
                paddingRight: 0,
              }}
            />
            <Animated.View
              style={{
                height: 220,
                width: 1,
                position: 'absolute',
                left: touch.x,
                justifyContent: 'center',
              }}>
              <Dash
                dashThickness={1}
                dashColor="#999"
                dashLength={2}
                dashGap={0}
                style={{
                  width: 1,
                  height: 180,
                  flexDirection: 'column',
                }}
              />
            </Animated.View>
          </View>
          <View
            style={{
              height: 1,
              position: 'absolute',
              top: '45%',
              left: 0,
            }}>
            <Dash
              dashThickness={1.5}
              dashColor="#222"
              dashLength={1.5}
              dashGap={6}
              style={{
                height: 1,
                flexDirection: 'row',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              marginVertical: 16,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  handleChartScope(1);
                }}>
                <Text
                  style={
                    chartSlotIndex == 1
                      ? investmentStyles.slotActive
                      : investmentStyles.greenChartSlot
                  }>
                  1D
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleChartScope(2);
                }}>
                <Text
                  style={
                    chartSlotIndex == 2
                      ? investmentStyles.slotActive
                      : investmentStyles.greenChartSlot
                  }>
                  1W
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleChartScope(3);
                }}>
                <Text
                  style={
                    chartSlotIndex == 3
                      ? investmentStyles.slotActive
                      : investmentStyles.greenChartSlot
                  }>
                  1M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleChartScope(4);
                }}>
                <Text
                  style={
                    chartSlotIndex == 4
                      ? investmentStyles.slotActive
                      : investmentStyles.greenChartSlot
                  }>
                  3M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleChartScope(5);
                }}>
                <Text
                  style={
                    chartSlotIndex == 5
                      ? investmentStyles.slotActive
                      : investmentStyles.greenChartSlot
                  }>
                  1Y
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleChartScope(6);
                }}>
                <Text
                  style={
                    chartSlotIndex == 6
                      ? investmentStyles.slotActive
                      : investmentStyles.greenChartSlot
                  }>
                  All
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon
                name="maximize-2"
                style={{color: '#67C431', fontWeight: 'bold'}}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <GrayLabel textColor="#2A2E3B">24H Change</GrayLabel>
              <BrandColorLabel bold height={25} red value="-1.2%" />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <GrayLabel textColor="#2A2E3B">Total Value</GrayLabel>
              <BrandColorLabel
                bold
                height={25}
                red={false}
                green
                value="$5,000"
              />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <GrayLabel textColor="#2A2E3B">P/L</GrayLabel>
              <BrandColorLabel bold height={25} green value="+12%" />
            </View>
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <PanelTitle title="Performance" />
          {cryptoPerformanceList.map((item, index) => {
            return (
              <CryptoPerformanceRow
                red={item.value > 0 ? false : true}
                green={item.value < 0 ? false : true}
                time={item.time}
                value={item.value + '%'}
                chartData={item.chartData}
                key={index}
              />
            );
          })}
        </View>
        <Text />
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Related News" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>All news</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            style={{paddingBottom: 10, marginBottom: 10}}>
            {newsList.map((item, index) => {
              return (
                <NewsCard
                  title={item.title}
                  content={item.content}
                  date={item.date}
                  uri={item.image}
                  key={index}
                  width={246}
                  imageWidth={226}
                  imageHeight={158}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={{marginTop: 16}}>
          <PanelTitle title="Analyst Rating" />
          <View>
            <View style={cryptoStyles.analystContainer}>
              <View style={{width: '20%', justifyContent: 'center'}}>
                <Pie
                  radius={36}
                  innerRadius={32}
                  sections={[
                    {
                      percentage: 60,
                      color: '#5AC53A',
                    },
                  ]}
                  backgroundColor="#ddd"
                />
                <View style={cryptoStyles.percentLabel}>
                  <Text style={{color: '#5AC53A', fontSize: 24}}>
                    60<Text style={{color: '#5AC53A', fontSize: 13}}>%</Text>
                  </Text>
                  <Text style={{color: '#5AC53A', fontSize: 13}}>BUY</Text>
                </View>
              </View>
              <View style={{width: '75%'}}>
                <CustomProgressBar
                  val={0.6}
                  color="#5AC53A"
                  text="60% Buy"
                  width={180}
                />
                <CustomProgressBar
                  val={0.12}
                  color="#2A2E3B"
                  text="12% Hold"
                  width={180}
                />
                <CustomProgressBar
                  val={0.28}
                  color="#E45A28"
                  text="28% Sell"
                  width={180}
                />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              style={{paddingBottom: 10, marginBottom: 10}}>
              {analList.map((item, index) => {
                return (
                  <AnalCard
                    title={item.title}
                    content={item.content}
                    key={item.id}
                    width={270}
                    onPress={() => refRBSheet1.current.open()}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View>
          <PanelTitle title="About BTC" />
          <Paragraph style={cryptoStyles.paragraphStyle}>
            Bitcoin, often described as a cryptocurrency, a virtual currency or
            a digital currency - is a type of money that is completely virtual.
            It's like an online version of cash. People can send Bitcoins (or
            part of one) to your digital wallet, and you can send Bitcoins to
            other people.
          </Paragraph>
          <TouchableOpacity>
            <Text style={cryptoStyles.readMore}>Read more</Text>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 12,
              borderTopWidth: 1,
              borderColor: '#EBEFF1',
            }}>
            <SmallLine
              title="Founder"
              value="Satoshi Nakamoto"
              titleSize={13}
              valueSize={13}
              bottomBorder
            />
            <SmallLine
              title="Headquarters"
              value="N/A"
              titleSize={13}
              valueSize={13}
              bottomBorder
            />
            <SmallLine
              title="Founded"
              value="2008"
              titleSize={13}
              valueSize={13}
              bottomBorder
            />
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={cryptoStyles.fixedBottomBtn}>
        <View>
          <Text style={{fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>
            Today’s Volume
          </Text>
          <Text style={{fontSize: 13, fontWeight: '400'}}>54,381,175</Text>
        </View>
        <TouchableOpacity
          style={{...cryptoStyles.tradeBtn, backgroundColor: '#5AC53A'}}
          onPress={() => {
            refRBSheet2.current.open();
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
            Invest
          </Text>
        </TouchableOpacity>
      </View>
      <RatingStoryPopup parentRef={refRBSheet1} />
      <TradingCheckoutFirst
        parentRef={refRBSheet2}
        buyRef={refRBSheet3}
        sellRef={refRBSheet1}
      />
      <TradingCheckoutOrder parentRef={refRBSheet3} reviewRef={refRBSheet4} />
      <TradingReceipt parentRef={refRBSheet4} completeRef={refRBSheet5} />
      <PurchaseComplete
        parentRef={refRBSheet5}
        bottomCaption="Back to Crypto"
      />
    </SafeAreaView>
  );
};
export default CryptoDetailScreen;
