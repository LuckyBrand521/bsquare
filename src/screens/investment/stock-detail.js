import React, {useState, useEffect, useRef} from 'react';
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
import {Paragraph} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import Spinner from 'react-native-loading-spinner-overlay';

//custom components
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {SmallLine} from '../../components/SectionTitle';
import {StockNewsCard, AnalCard, StockCard} from '../../components/Card';
import {NavigationHeader, TrendViewHeader} from '../../components/Headers';
import {CustomProgressBar} from '../../components/Gadgets';
import {SmallBubbleChart, AnalystRatings} from '../../components/Chart';
import {AboutPanel} from '../../components/TagPanel';
import SVGLineChart from '../../components/LineChart';
import {
  RatingStoryPopup,
  TradingCheckoutFirst,
  TradingCheckoutOrder,
  TradingReceipt,
  PurchaseComplete,
} from '../../components/InvestCheckout';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {newsList, analList, stockList} from '../../store/datalist';
import {getStockChartsFromRPD} from '../../utils/thirdapi';
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
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
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
  useEffect(() => {
    getStockChartsFromRPD('AAPL').then(res => {
      setGraphData(res);
      setLoading(false);
      // getStockNewsFromDB('AAPL').then(res => {
      //   setNewsList(res);
      //   if (!unmounted) {
      //     setLoading(false);
      //   }
    });
  }, []);

  const touch = useRef(new Animated.ValueXY({x: -60, y: 0})).current;
  // const price = useRef(
  //   new Text.setValue({value: chartData[chartData.length - 1]}),
  // ).current;
  if (loading) {
    return (
      <SafeAreaView style={investmentStyles.container}>
        <Spinner visible={loading} textContent={'Loading...'} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={investmentStyles.container}>
      <NavigationHeader
        title=""
        onPress={() => {
          navigation.navigate('StockHomeScreen');
        }}
      />
      <ScrollView>
        <SVGLineChart
          graphData={graphData}
          data={chartData}
          width={wp('100%')}
          height={220}
          coinName="AAPL"
          coinSlug="Apple"
          type="stock"
        />
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
        <View style={styles.statsView}>
          <PanelTitle title="Stats" />
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
        <View>
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
        </View>
        <AnalystRatings
          title="43 Analyst Ratings"
          values={{buy: 74, hold: 21, sell: 5}}
          analList={analList}
        />
        <View>
          <PanelTitle title="Earnings" />
          <SmallBubbleChart yAxis={[0.6, 0.99, 1.39, 1.78]} />
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
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle title="People Also Bought" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <Paragraph style={styles.paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            pharetra porta commodo, maecenas quam. Pretium gravida mattis
            laoreet dolor eget commodo.
          </Paragraph>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
        <View>
          <AboutPanel title="About The Company" />
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
          name: 'Apple Stock',
          label: 'AAPL',
          image: require('../../assets/images/apple_stock.png'),
        }}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        item={{
          name: 'Apple Stock',
          label: 'AAPL',
          image: require('../../assets/images/apple_stock.png'),
        }}
        completeRef={refRBSheet5}
      />
      <PurchaseComplete parentRef={refRBSheet5} bottomCaption="Back to Stock" />
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

  paragraphStyle: {
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 16,
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
