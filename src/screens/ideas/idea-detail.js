import React, {useState, useRef} from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import styled from 'styled-components';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
import {Paragraph} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import Dash from 'react-native-dash';
import AnimatedNumbers from 'react-native-animated-numbers';
//custom components
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {SmallLine} from '../../components/SectionTitle';
import {StockNewsCard, AnalCard, StockCard} from '../../components/Card';
import {NavigationHeader, TrendViewHeader} from '../../components/Headers';
import {AnalysisTag} from '../../components/AnalysisTag';
import {RollingNumber} from '../../components/Inputs';
import {
  BrandColorLabel,
  CryptoPortfolioPanel,
  CryptoHistoryPanel,
  CustomProgressBar,
} from '../../components/Gadgets';
import {
  RatingStoryPopup,
  TradingCheckoutFirst,
  TradingCheckoutOrder,
  TradingReceipt,
  PurchaseComplete,
} from '../../components/InvestCheckout';
const GrayLabel = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
  padding: 4px;
`;
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  newsList,
  analList,
  stockList,
  cryptoPortfolioList,
} from '../../store/datalist';
const {width, height} = Dimensions.get('window');

const genChartData = count => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(((Math.random() * 0.1 + 0.8) * 150).toFixed(2));
  }
  return data;
};

const IdeaDetailScreen = ({navigation}) => {
  const priceEl = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
  const [stockName, setStockName] = useState('BCG');
  const [chartData, setChartData] = useState(genChartData(48));
  const [chartSlotIndex, setChartSlotIndex] = useState(1);
  const [stockPrice, setStockPrice] = useState(chartData[chartData.length - 1]);
  const [analData, setAnalData] = useState([
    {label: 'Quantity', red: false, value: '10'},
    {label: 'Price', red: false, value: '$400'},
    {label: 'P/L', red: false, value: '%30'},
  ]);
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
    setStockPrice(chartData[chartData.length - 1]);
  };

  const touch = useRef(new Animated.ValueXY({x: -60, y: 0})).current;
  // const price = useRef(
  //   new Text.setValue({value: chartData[chartData.length - 1]}),
  // ).current;
  return (
    <SafeAreaView style={investmentStyles.container}>
      <NavigationHeader
        title=""
        onPress={() => {
          navigation.navigate('IdeaHomeScreen');
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
          {stockName}
        </Text>
        <TrendViewHeader
          title="Blockchain Gaming"
          source={require('../../assets/icons/candle.png')}
        />
        {/* <MoneyTitle title={stockPrice} /> */}
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
          {/* <TextInput
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
              stockPrice
                ? stockPrice
                : priceEl?.current?.text
                ? priceEl.current.text
                : ''
            }
          /> */}
          {/* <AnimatedNumbers
            includeComma
            animateToNumber={anim}
            fontStyle={{fontSize: 30, fontWeight: '500'}}
          /> */}
          <RollingNumber val={stockPrice} />
        </View>
        <ProfitLabel
          customStyle={{marginLeft: 16, marginTop: 10}}
          greenLabel="▲ $2.45 (1.2%)"
          blackLabel="Today"
        />
        <View style={{justifyContent: 'center'}}>
          <View
            // onTouchStart={e => {
            //   console.log('touchMove', e.nativeEvent);
            // }}
            // onTouchMove={e => {
            //   const xIndex = parseInt(e.nativeEvent.locationX / 7);
            //   setFingerLocation(parseInt(e.nativeEvent.locationX));
            //   // console.log(chartData[xIndex]);
            //   setStockPrice(chartData[xIndex]);
            // }}
            style={{marginVertical: 16}}
            onStartShouldSetResponder={() => true}
            onResponderMove={event => {
              const xIndex = parseInt(event.nativeEvent.locationX / 7);
              touch.setValue({
                x: event.nativeEvent.locationX - 30,
                // y: event.nativeEvent.locationY,
                y: chartData[xIndex],
              });
              // priceEl.current.setValue({title: chartData[xIndex]});
              // priceEl.current.children[0] = chartData[xIndex];
              // price.setValue({value: chartData[xIndex]});
              // console.log(price);
              // if (priceEl.current) {
              //   priceEl.current.text = chartData[xIndex];
              //   priceEl.current.setNativeProps({text: chartData[xIndex]});
              // }
              setStockPrice(chartData[xIndex]);
            }}
            onResponderRelease={event => {
              touch.setValue({
                x: -60,
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
                // style: {
                //   borderRadius: 0,
                //   color: '#0f0',
                // },
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
                position: 'absolute',
                top: -12,
                left: touch.x,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#AAA'}}>10:00 PM</Text>
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
                      ? styles.slotActive
                      : styles.greenChartSlot
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
                      ? styles.slotActive
                      : styles.greenChartSlot
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
                      ? styles.slotActive
                      : styles.greenChartSlot
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
                      ? styles.slotActive
                      : styles.greenChartSlot
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
                      ? styles.slotActive
                      : styles.greenChartSlot
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
                      ? styles.slotActive
                      : styles.greenChartSlot
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

        <AnalysisTag items={analData} />
        <View style={{marginTop: 16}}>
          <PanelTitle title="Coins and Tokens" />
          <CryptoPortfolioPanel
            onPress={() => {}}
            items={cryptoPortfolioList}
          />
        </View>

        <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
          <PanelTitle title="News" />
          <TouchableOpacity>
            <Text style={investmentStyles.greenLabel}>Show more</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          {newsList.map((item, index) => {
            return (
              <StockNewsCard
                title={item.title}
                content={item.content}
                uri={item.image}
                key={item.id}
                newsHour={item.hour}
                lightHave={item.light}
              />
            );
          })}
        </View>
        <View>
          <PanelTitle title="About" />
          <Paragraph style={styles.paragraphStyle}>
            Apple Inc. is an American multinational technology company that
            specializes in consumer electronics, computer software, and online
            services. Apple is the world's largest technology company by revenue
            and, since January 2021, the world's most valuable company.
          </Paragraph>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={styles.fixedBottomBtn}>
        <View>
          <Text style={{fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>
            Today’s Volume
          </Text>
          <Text style={{fontSize: 13, fontWeight: '400'}}>54,381,175</Text>
        </View>
        <TouchableOpacity
          style={styles.tradeBtn}
          onPress={() => {
            refRBSheet2.current.open();
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
            Trade
          </Text>
        </TouchableOpacity>
      </View>
      <RatingStoryPopup parentRef={refRBSheet1} />
      <TradingCheckoutFirst
        parentRef={refRBSheet2}
        buyRef={refRBSheet3}
        sellRef={refRBSheet1}
      />
      <TradingCheckoutOrder
        parentRef={refRBSheet3}
        item={{
          name: 'Blockchain Gaming',
          label: 'BCG',
          image: require('../../assets/images/bcg_icon.png'),
        }}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        item={{
          name: 'Blockchain Gaming',
          label: 'BCG',
          image: require('../../assets/images/bcg_icon.png'),
        }}
        completeRef={refRBSheet5}
      />
      <PurchaseComplete parentRef={refRBSheet5} bottomCaption="Back to Ideas" />
    </SafeAreaView>
  );
};

export default IdeaDetailScreen;

const styles = StyleSheet.create({
  pnlLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grayLabel: {
    color: '#83899D',
    fontFamily: 'HelveticaNeueCyr',
    fontSize: 12,
    lineHeight: 18,
  },
  pinkLabel: {
    color: '#DA3973',
    fontFamily: 'HelveticaNeueCyr',
    fontSize: 12,
    lineHeight: 18,
  },
  statsView: {
    paddingHorizontal: 16,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analystContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    width: wp(100) - 32,
    marginVertical: 20,
    alignItems: 'center',
  },
  percentLabel: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraphStyle: {
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  readMore: {
    fontSize: 13,
    color: '#5E9FDA',
    marginLeft: 16,
    marginTop: 10,
  },
  fixedBottomBtn: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    height: 100,
    width: wp(100),
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tradeBtn: {
    backgroundColor: '#EB663B',
    borderRadius: 30,
    height: 56,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenChartSlot: {
    color: '#67C431',
    width: 46,
    marginHorizontal: 2,
    fontSize: 10,
    textAlign: 'center',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  slotActive: {
    width: 46,
    marginHorizontal: 2,
    fontSize: 10,
    backgroundColor: '#67C431',
    color: '#fff',
    borderRadius: 4,
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  earningChart: {
    flexDirection: 'row',
    height: 200,
    marginRight: 16,
  },
  earningChartYaxis: {
    fontFamily: 'HelveticaNeueCyr',
    fontWeight: '400',
    fontSize: 12,
    alignSelf: 'center',
    marginVertical: 16,
  },
  actualEPSStyle: {
    width: 16,
    borderRadius: 30,
    backgroundColor: '#5AC53A',
    height: 16,
    alignSelf: 'center',
    position: 'relative',
  },
  greenBubble: {
    width: 12,
    height: 12,
    borderRadius: 30,
    marginLeft: 6,
    backgroundColor: 'rgba( 90,197,58, 1 )',
  },
});
