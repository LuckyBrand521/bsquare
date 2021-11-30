import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//custom components
import {PanelTitle} from '../../components/SectionTitle';
import {
  RatingStoryPopup,
  TradingCheckoutFirst,
  TradingCheckoutOrder,
  TradingReceipt,
  PurchaseComplete,
} from '../../components/InvestCheckout';
import {SmallLine} from '../../components/SectionTitle';
import {NewsCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {AnalystRatings} from '../../components/Chart';
import {AnalysisTag} from '../../components/AnalysisTag';
import SVGLineChart from '../../components/LineChart';
import CoinPerformanceView from '../../components/CoinPerformanceView';

//custom styles
import {investmentStyles, cryptoStyles} from '../../styles/investment';

import {
  getCryptoNews,
  getChartsFromCMC,
  getCryptoQuoteFromCMC,
} from '../../utils/thirdapi';
import {getReportFromYahoo} from '../../utils/common';

const CryptoDetailScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const coinId = props.route.params.coinId;
  const coinSymbol = props.route.params.coinSymbol.toUpperCase();
  const coinAmount = props.route.params.coinAmount;
  const [currentInfo, setCurrentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [analData, setAnalData] = useState([]);
  const [analList, setAnalList] = useState([]);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
  const [graphData, setGraphData] = useState([]);

  // const touch = useRef(new Animated.ValueXY({x: -2, y: 0})).current;
  useEffect(() => {
    Promise.all([
      getCryptoQuoteFromCMC(coinId),
      getChartsFromCMC(coinId),
      getCryptoNews(coinSymbol),
      getReportFromYahoo(coinSymbol),
    ])
      .then(res => {
        setCurrentInfo(res[0]);
        setAnalData([
          {
            label: '24H Change',
            red: res[0].quote.USD.percent_change_24h <= 0 ? false : true,
            value: res[0].quote.USD.percent_change_24h.toFixed(2) + '%',
          },
          {
            label: 'Total Value',
            red: false,
            value: '$' + (coinAmount * res[0].quote.USD.price).toFixed(2),
          },
          {
            label: 'P/L',
            red: false,
            value: res[0].quote.USD.percent_change_1h.toFixed(2) + '%',
          },
        ]);
        setGraphData(res[1]);
        setNewsList(res[2].slice(0, 7));
        setAnalList(res[3] ? res[3] : []);

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <SafeAreaView
        style={{
          ...investmentStyles.container,
          backgroundColor: theme.colors.background_primary,
        }}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: theme.colors.text_primary}}
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
          // navigation.navigate('CryptoHomeScreen');
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <SVGLineChart
          graphData={graphData}
          width={wp('100%')}
          height={220}
          coinId={coinId}
          coinName={currentInfo.symbol}
          coinSlug={currentInfo.name}
          type="crypto"
        />
        {/* <Cursor /> */}
        <AnalysisTag items={analData} />
        <CoinPerformanceView graphData={graphData} />

        <Text />
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="Related News"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>All news</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10, marginBottom: 10}}>
            {newsList.map((item, index) => {
              if (item.media) {
                return (
                  <NewsCard
                    title={item.title}
                    content={item.summary}
                    date={item.published_date}
                    uri={item.media}
                    key={index}
                    width={246}
                    imageWidth={226}
                    imageHeight={158}
                    source={item.link}
                  />
                );
              }
            })}
          </ScrollView>
        </View>
        <AnalystRatings
          title="Analyst Ratings"
          values={{buy: 60, hold: 12, sell: 28}}
          analList={analList}
        />
        <View>
          <PanelTitle
            color={theme.colors.text_primary}
            title={'About ' + currentInfo.name}
          />
          <Text
            style={{
              ...cryptoStyles.paragraphStyle,
              color: theme.colors.text_primary,
            }}>
            {currentInfo.name +
              ", often described as a cryptocurrency, a virtual currency or a digital currency - is a type of money that is completely virtual. It's like an online version of cash. People can send Bitcoins (or part of one) to your digital wallet, and you can send Bitcoins to other people."}
          </Text>
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
              titleColor={theme.colors.text_secondary}
              valueColor={theme.colors.text_primary}
            />
            <SmallLine
              title="Headquarters"
              value="N/A"
              titleSize={13}
              valueSize={13}
              bottomBorder
              titleColor={theme.colors.text_secondary}
              valueColor={theme.colors.text_primary}
            />
            <SmallLine
              title="Founded"
              value="2008"
              titleSize={13}
              valueSize={13}
              bottomBorder
              titleColor={theme.colors.text_secondary}
              valueColor={theme.colors.text_primary}
            />
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View
        style={{
          ...cryptoStyles.fixedBottomBtn,
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
            {currentInfo.quote.USD.volume_24h.toFixed(0).toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={{...cryptoStyles.tradeBtn, backgroundColor: '#5AC53A'}}
          onPress={() => {
            refRBSheet2.current.open();
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.colors.text_primary,
            }}>
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
      <TradingCheckoutOrder
        parentRef={refRBSheet3}
        type={'crypto'}
        item={{
          id: currentInfo.id,
          name: currentInfo.name,
          label: currentInfo.symbol,
          price: Number(currentInfo.quote.USD.price),
          image: {
            uri: `https://cryptologos.cc/logos/${currentInfo.name.toLowerCase()}-${currentInfo.symbol.toLowerCase()}-logo.png`,
          },
        }}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        type={'crypto'}
        item={{
          name: currentInfo.name,
          label: currentInfo.symbol,
          price: Number(currentInfo.quote.USD.price),
          image: {
            uri: `https://cryptologos.cc/logos/${currentInfo.name.toLowerCase()}-${currentInfo.symbol.toLowerCase()}-logo.png`,
          },
        }}
        completeRef={refRBSheet5}
      />
      <PurchaseComplete
        parentRef={refRBSheet5}
        bottomCaption="Back to Crypto"
      />
    </SafeAreaView>
  );
};
export default CryptoDetailScreen;
