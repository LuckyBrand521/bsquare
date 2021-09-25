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
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
import {Paragraph} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import Dash from 'react-native-dash';
//custom components
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {SmallLine} from '../../components/SectionTitle';
import {StockNewsCard, AnalCard, StockCard} from '../../components/Card';
import {NavigationHeader, TrendViewHeader} from '../../components/Headers';
import {CustomProgressBar} from '../../components/Gadgets';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {newsList, analList, stockList} from '../../store/datalist';
const {width, height} = Dimensions.get('window');

const genChartData = count => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(((Math.random() * 0.1 + 0.8) * 150).toFixed(2));
  }
  return data;
};

const StockDetailScreen = ({navigation}) => {
  const priceEl = useRef();
  const [stockName, setStockName] = useState('AAPL');
  const [chartData, setChartData] = useState(genChartData(48));
  const [chartSlotIndex, setChartSlotIndex] = useState(1);
  const [stockPrice, setStockPrice] = useState(chartData[chartData.length - 1]);

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

  const touch = useRef(new Animated.ValueXY({x: -2, y: 0})).current;
  // const price = useRef(
  //   new Text.setValue({value: chartData[chartData.length - 1]}),
  // ).current;
  return (
    <SafeAreaView style={investmentStyles.container}>
      <NavigationHeader
        title="Apple Stock"
        onPress={() => {
          navigation.navigate('InvestmentHomeScreen');
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
          title="Apple"
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
              stockPrice
                ? stockPrice
                : priceEl?.current?.text
                ? priceEl.current.text
                : ''
            }
          />
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
                x: event.nativeEvent.locationX,
                // y: event.nativeEvent.locationY,
                y: chartData[xIndex],
              });
              // priceEl.current.setValue({title: chartData[xIndex]});
              // priceEl.current.children[0] = chartData[xIndex];
              // price.setValue({value: chartData[xIndex]});
              // console.log(price);
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
        <PanelTitle title="In Portfolio" />
        <View style={investmentStyles.portfolioInfoContainer}>
          <SmallLine
            title="10 shares"
            value="1482.52"
            titleSize={16}
            valueSize={16}
            // bottomBorder
          />
          <View style={styles.pnlLine}>
            <Text style={styles.grayLabel}>
              $210.17{' '}
              <Icon name="arrow-right" size={12} style={{color: '#83899D'}} />{' '}
              $148.15
            </Text>
            <Text style={styles.pinkLabel}>
              $619.2 <Icon name="arrow-down-right" size={12} color="#DA3973" />
            </Text>
          </View>
          <BlackRoundButton
            customStyle={{alignSelf: 'center', marginVertical: 20}}
            title="Operations History"
            iconUrl={require('../../assets/icons/watch_icon.png')}
          />
        </View>
        <PanelTitle title="Stats" />
        <View style={styles.statsView}>
          <View style={styles.flexRow}>
            <SmallLine
              title="Open"
              value="147.92"
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
            <SmallLine
              title="Volumn"
              value="10.9B"
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
          </View>
          <View style={styles.flexRow}>
            <SmallLine
              title="High"
              value="149.02"
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
            <SmallLine
              title="Avg.Vol"
              value="240.5B"
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
          </View>
          <View style={styles.flexRow}>
            <SmallLine
              title="Low"
              value="148.109"
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
            <SmallLine
              title="Mrk Cap"
              value="2.4T"
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
          </View>
          <View style={styles.flexRow}>
            <SmallLine
              title="52wk High"
              value="509.9"
              titleSize={13}
              valueSize={13}
              width="40%"
            />
            <SmallLine
              title="P/E"
              value="29.06"
              titleSize={13}
              valueSize={13}
              width="40%"
            />
          </View>
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

        <PanelTitle title="43 Analyst Ratings" />
        <View>
          <View style={styles.analystContainer}>
            <View style={{width: '20%', justifyContent: 'center'}}>
              <Pie
                radius={36}
                innerRadius={32}
                sections={[
                  {
                    percentage: 74,
                    color: '#5AC53A',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.percentLabel}>
                <Text style={{color: '#5AC53A', fontSize: 24}}>
                  74<Text style={{color: '#5AC53A', fontSize: 13}}>%</Text>
                </Text>
                <Text style={{color: '#5AC53A', fontSize: 13}}>BUY</Text>
              </View>
            </View>
            <View style={{width: '75%'}}>
              <CustomProgressBar
                val={0.74}
                color="#5AC53A"
                text="74% Buy"
                width={180}
              />
              <CustomProgressBar
                val={0.21}
                color="#2A2E3B"
                text="21% Hold"
                width={180}
              />
              <CustomProgressBar
                val={0.05}
                color="#E45A28"
                text="5% Sell"
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
                />
              );
            })}
          </ScrollView>
        </View>
        <PanelTitle title="Earnings" />
        <View style={styles.earningChart}>
          <View style={{flex: 1}}>
            <Text style={styles.earningChartYaxis}>1.78</Text>
            <Text style={styles.earningChartYaxis}>1.39</Text>
            <Text style={styles.earningChartYaxis}>0.99</Text>
            <Text style={styles.earningChartYaxis}>0.60</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{height: 180}}>
              <Text style={{...styles.actualEPSStyle, top: 150}} />
              <Text
                style={{
                  ...styles.actualEPSStyle,
                  top: 140,
                  backgroundColor: 'rgba( 90,197,58, 0.4 )',
                }}
              />
            </View>
            <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
              Q4
            </Text>
            <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
              FY20
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{height: 180}}>
              <Text style={{...styles.actualEPSStyle, top: 40}} />
              <Text
                style={{
                  ...styles.actualEPSStyle,
                  top: 60,
                  backgroundColor: 'rgba( 90,197,58, 0.4 )',
                }}
              />
            </View>
            <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
              Q1
            </Text>
            <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
              FY21
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{height: 180}}>
              <Text style={{...styles.actualEPSStyle, top: 60}} />
              <Text
                style={{
                  ...styles.actualEPSStyle,
                  top: 90,
                  backgroundColor: 'rgba( 90,197,58, 0.4 )',
                }}
              />
            </View>
            <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
              Q2
            </Text>
            <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
              FY21
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{height: 180}}>
              <Text style={{...styles.actualEPSStyle, top: 70}} />
              <Text
                style={{
                  ...styles.actualEPSStyle,
                  top: 80,
                  backgroundColor: 'rgba( 90,197,58, 0.4 )',
                }}
              />
            </View>
            <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
              Q3
            </Text>
            <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
              FY21
            </Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{height: 180}} />
            <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
              Q4
            </Text>
            <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
              FY21
            </Text>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 16}}>
          <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
            <Text>Expected EPS </Text>
            <Text style={styles.greenBubble} />
          </View>
          <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: 'rgba( 90,197,58, 1 )'}}>
              Actual EPS{' '}
            </Text>
            <Text
              style={{
                ...styles.greenBubble,
                backgroundColor: 'rgba( 90,197,58, 0.4)',
              }}
            />
          </View>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 16}}>
          <View style={{flex: 3, textAlign: 'left'}}>
            <Text>-</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 16}}>Expected On 28/10,</Text>
            <Text style={{fontSize: 16}}>After-Hours</Text>
          </View>
        </View>
        <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
          <PanelTitle title="People Also Bought" />
          <TouchableOpacity>
            <Text style={investmentStyles.greenLabel}>See all</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Paragraph style={styles.paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            pharetra porta commodo, maecenas quam. Pretium gravida mattis
            laoreet dolor eget commodo.
          </Paragraph>
          <ScrollView
            horizontal={true}
            style={{paddingBottom: 10, marginVertical: 20}}>
            {stockList.map((item, index) => {
              return (
                <StockCard
                  title={item.title}
                  name={item.name}
                  val={item.val}
                  uri={item.image}
                  key={index}
                  width={246}
                  imageWidth={45}
                  imageHeight={45}
                />
              );
            })}
          </ScrollView>
        </View>
        <PanelTitle title="About The Company" />
        <View>
          <Paragraph style={styles.paragraphStyle}>
            Apple Inc. is an American multinational technology company that
            specializes in consumer electronics, computer software, and online
            services. Apple is the world's largest technology company by revenue
            and, since January 2021, the world's most valuable company.
          </Paragraph>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 12,
              borderTopWidth: 1,
              borderColor: '#EBEFF1',
            }}>
            <SmallLine
              title="CEO"
              value="Timothy Donald Cook"
              titleSize={13}
              valueSize={13}
              bottomBorder
            />
            <SmallLine
              title="Headquarters"
              value="Cupertino, California"
              titleSize={13}
              valueSize={13}
              bottomBorder
            />
            <View style={styles.flexRow}>
              <SmallLine
                title="Founded"
                value="1976"
                titleSize={13}
                valueSize={13}
                width="45%"
                bottomBorder
              />
              <SmallLine
                title="Employees"
                value="147 000"
                titleSize={13}
                valueSize={13}
                width="45%"
                bottomBorder
              />
            </View>
          </View>
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
        <TouchableOpacity style={styles.tradeBtn}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
            Trade
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StockDetailScreen;

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
