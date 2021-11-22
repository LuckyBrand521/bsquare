import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

//custom components
import {PanelTitle} from '../../components/SectionTitle';
import {BlackRoundButton} from '../../components/BubbleButton';
import {SmallLine} from '../../components/SectionTitle';
import {StockNewsCard, AnalCard, StockCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {AnalysisTag} from '../../components/AnalysisTag';
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
import {stockList} from '../../store/datalist';
import {getCryptoNews} from '../../utils/thirdapi';
import {
  getDataFromFS,
  getDetailFromYahoo,
  getReportFromYahoo,
  getStockNewsFromNasdaq,
} from '../../utils/common';
const {width, height} = Dimensions.get('window');
import {StockPerformanceView} from '../../components/CoinPerformanceView';

const genChartData = count => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(((Math.random() * 0.1 + 0.8) * 150).toFixed(2));
  }
  return data;
};

const StockDetailScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const stockId = props.route.params.stockId;
  const stockAmount = props.route.params.stockAmount;
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [analData, setAnalData] = useState([]);
  const [detail, setDetail] = useState({});
  const [stats, setStats] = useState({});
  const [newsList, setNewsList] = useState([]);
  const [analList, setAnalList] = useState([]);
  const [analystData, setAnalystData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();

  useEffect(() => {
    Promise.all([
      getDataFromFS(stockId),
      getDetailFromYahoo(stockId),
      getReportFromYahoo(stockId),
      getCryptoNews(stockId),
    ])
      .then(res => {
        const gData = [
          {
            chartValues: res[0].chartData['1d'].close,
            first_time: res[0].chartData['1d'].startTime,
            interval: res[0].chartData['5d'].interval,
          },
          {
            chartValues: res[0].chartData['5d'].close,
            first_time: res[0].chartData['5d'].startTime,
            interval: res[0].chartData['5d'].interval,
          },
          {
            chartValues: res[0].chartData['1mo'].close,
            first_time: res[0].chartData['1mo'].startTime,
            interval: res[0].chartData['1mo'].interval,
          },
          {
            chartValues: res[0].chartData['6mo'].close,
            first_time: res[0].chartData['6mo'].startTime,
            interval: res[0].chartData['6mo'].interval,
          },
          {
            chartValues: res[0].chartData['1y'].close,
            first_time: res[0].chartData['1y'].startTime,
            interval: res[0].chartData['1y'].interval,
          },
          {
            chartValues: res[0].chartData.max.close,
            first_time: res[0].chartData.max.startTime,
            interval: res[0].chartData.max.interval,
          },
        ];
        setGraphData(gData);
        setCompanyInfo(res[0].companyInfo);
        setDetail({
          currentPrice: res[0].regularMarketPrice.raw,
          regularMarketOpen: res[0].regularMarketOpen,
          regularMarketVolume: res[0].regularMarketVolume,
          regularMarketDayHigh: res[0].regularMarketDayHigh,
          regularMarketPreviousClose: res[0].regularMarketPreviousClose,
          sharesOutstanding: res[0].sharesOutstanding,
          marketCap: res[0].marketCap,
          fiftyTwoWeekHigh: res[0].fiftyTwoWeekHigh,
          profitMargins: res[1].financialData.profitMargins,
        });
        setAnalData([
          {
            label: '24H Change',
            red: res[0].regularMarketChange.raw <= 0 ? true : false,
            value: res[0].regularMarketChangePercent.raw.toFixed(2) + '%',
          },
          {
            label: 'Total Value',
            red: false,
            value:
              '$' + (stockAmount * res[0].regularMarketPrice.raw).toFixed(2),
          },
          {
            label: 'P/L',
            red: res[0].fiftyTwoWeekHighChangePercent.raw <= 0 ? true : false,
            value: res[0].fiftyTwoWeekHighChangePercent.raw.toFixed(2) + '%',
          },
        ]);
        setStats(res[1]);
        setNewsList(res[3].slice(0, 7));
        setAnalystData({
          buy:
            res[1].recommendationTrend.trend[0].strongBuy +
            res[1].recommendationTrend.trend[0].buy,
          hold: res[1].recommendationTrend.trend[0].hold,
          sell:
            res[1].recommendationTrend.trend[0].sell +
            res[1].recommendationTrend.trend[0].strongSell,
        });
        setAnalList(res[2]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
    // getStockChartsFromRPD('AAPL').then(res => {
    //   setGraphData(res);
    //   setLoading(false);
    //   // getStockNewsFromDB('AAPL').then(res => {
    //   //   setNewsList(res);
    //   //   if (!unmounted) {
    //   //     setLoading(false);
    //   //   }
    // });
  }, []);

  const touch = useRef(new Animated.ValueXY({x: -60, y: 0})).current;
  // const price = useRef(
  //   new Text.setValue({value: chartData[chartData.length - 1]}),
  // ).current;
  if (loading) {
    return (
      <SafeAreaView
        style={{
          ...investmentStyles.container,
          backgroundColor: theme.colors.background_primary,
        }}>
        <Spinner
          visible={loading}
          textStyle={{color: theme.colors.text_primary}}
          textContent={'Loading...'}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title=""
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <SVGLineChart
          graphData={graphData}
          width={wp('100%')}
          height={220}
          coinId={stockId}
          coinName={stockId}
          coinSlug={companyInfo.company}
          type="stock"
          stockDetail={detail}
        />
        <AnalysisTag items={analData} />
        <StockPerformanceView graphData={graphData} />
        <PanelTitle color={theme.colors.text_primary} title="In Portfolio" />
        <View
          style={{
            ...investmentStyles.portfolioInfoContainer,
            backgroundColor: theme.colors.background_secondary,
          }}>
          <SmallLine
            title={`${stockAmount} shares`}
            value={(stockAmount * detail.currentPrice).toFixed(2)}
            titleSize={16}
            valueSize={16}
            titleColor={theme.colors.text_primary}
            valueColor={theme.colors.green}
            // bottomBorder
          />
          <BlackRoundButton
            customStyle={{
              alignSelf: 'center',
              marginVertical: 20,
              backgroundColor: theme.colors.background_primary,
            }}
            title="Operations History"
            iconUrl={require('../../assets/icons/watch_icon.png')}
          />
        </View>
        <View style={styles.statsView}>
          <PanelTitle
            title="Stats"
            color={theme.colors.text_primary}
            marginLeft={1}
          />
          <View style={styles.flexRow}>
            <SmallLine
              title="Open"
              value={detail.regularMarketOpen.fmt}
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
            <SmallLine
              title="Volumn"
              value={detail.regularMarketVolume.fmt}
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
          </View>
          <View style={styles.flexRow}>
            <SmallLine
              title="High"
              value={detail.regularMarketDayHigh.fmt}
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
            <SmallLine
              title="Avg.Vol"
              value={detail.sharesOutstanding.fmt}
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
          </View>
          <View style={styles.flexRow}>
            <SmallLine
              title="Low"
              value={detail.regularMarketPreviousClose.fmt}
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
            <SmallLine
              title="Mrk Cap"
              value={detail.marketCap.fmt}
              titleSize={13}
              valueSize={13}
              bottomBorder
              width="40%"
            />
          </View>
          <View style={styles.flexRow}>
            <SmallLine
              title="52wk High"
              value={detail.fiftyTwoWeekHigh.fmt}
              titleSize={13}
              valueSize={13}
              width="40%"
            />
            <SmallLine
              title="P/E"
              value={detail.profitMargins.fmt}
              titleSize={13}
              valueSize={13}
              width="40%"
            />
          </View>
        </View>
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle color={theme.colors.text_primary} title="News" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 20}}>
            {newsList.map((item, index) => {
              if (item.media) {
                return (
                  <StockNewsCard
                    title={item.title.slice(0, 18) + '...'}
                    content={item.summary}
                    uri={item.media}
                    key={index}
                    newsHour={getHourDiff(new Date(item.published_date))}
                    source={item.link}
                  />
                );
              }
            })}
          </View>
        </View>
        <AnalystRatings
          title="Analyst Ratings"
          values={analystData}
          analList={analList}
        />
        <View>
          <PanelTitle color={theme.colors.text_primary} title="Earnings" />
          <SmallBubbleChart yAxis={[0.6, 0.99, 1.39, 1.78]} />
        </View>

        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 16}}>
          <View style={{flex: 3, textAlign: 'left'}}>
            <Text style={{fontSize: 18, color: theme.colors.text_primary}}>
              -
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 13, color: theme.colors.text_primary}}>
              Expected On 6/12/21
            </Text>
            <Text style={{fontSize: 13, color: theme.colors.text_primary}}>
              After-Hours
            </Text>
          </View>
        </View>
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="People Also Bought"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>

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
          <AboutPanel
            color={theme.colors.text_primary}
            title="About The Company"
            info={companyInfo}
          />
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View
        style={{
          ...styles.fixedBottomBtn,
          backgroundColor: theme.colors.background_primary,
        }}>
        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              marginBottom: 6,
              color: theme.colors.text_primary,
            }}>
            Today’s Volume
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: theme.colors.text_primary,
            }}>
            {detail.regularMarketVolume.fmt}
          </Text>
        </View>
        <TouchableOpacity
          style={{...styles.tradeBtn, backgroundColor: theme.colors.green}}
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
        volume={detail.regularMarketVolume.fmt}
      />
      <TradingCheckoutOrder
        parentRef={refRBSheet3}
        type={'stock'}
        item={{
          id: stockId,
          name: companyInfo.company,
          label: stockId,
          price: Number(detail.currentPrice),
        }}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        type={'stock'}
        item={{
          id: stockId,
          name: companyInfo.company,
          label: stockId,
          price: Number(detail.currentPrice),
        }}
        completeRef={refRBSheet5}
      />
      <PurchaseComplete parentRef={refRBSheet5} bottomCaption="Back to Stock" />
    </SafeAreaView>
  );
};

export default StockDetailScreen;
const getHourDiff = time => {
  const now = new Date();
  const r = Math.round(Math.abs(now.getTime() - time.getTime()) / 3600 / 1000);
  return r;
};
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
    backgroundColor: 'transparent',
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
