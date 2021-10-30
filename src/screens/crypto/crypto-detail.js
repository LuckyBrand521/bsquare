import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import {Paragraph} from 'react-native-paper';
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

import {analList, cryptoPerformanceList} from '../../store/datalist';
import {getCryptoNews, getChartsFromCMC} from '../../utils/thirdapi';
import {
  calcCryptosDayChange,
  updateCryptoNewsOnDB,
  getCryptoNewsFromDB,
} from '../../utils/utils';

const CryptoDetailScreen = ({navigation}) => {
  const x = useSharedValue(0);
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [analData, setAnalData] = useState([]);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
  const [chartData, setChartData] = useState({});
  const [graphData, setGraphData] = useState([]);
  const portfolio = useSelector(state => state.portfolios.cryptoPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);

  // const touch = useRef(new Animated.ValueXY({x: -2, y: 0})).current;

  useEffect(() => {
    let unmounted = false;
    calcCryptosDayChange(userInfo.user_id, portfolio).then(data => {
      setAnalData([
        {
          label: '24H Change',
          red: data.daily_change <= 0 ? false : true,
          value: data.daily_change + '%',
        },
        {label: 'Total Value', red: false, value: '$' + data.total_value},
        {label: 'P/L', red: false, value: data.profit + '%'},
      ]);
      getChartsFromCMC(1).then(res => {
        setGraphData(res);
        getCryptoNewsFromDB('cryptocurrency').then(res => {
          setNewsList(res);
          if (!unmounted) {
            setLoading(false);
          }
        });
      });
    });
    return () => {
      unmounted = true;
    };
  }, []);

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
          // navigation.navigate('CryptoHomeScreen');
          navigation.goBack();
        }}
      />
      <ScrollView>
        <SVGLineChart
          graphData={graphData}
          data={chartData}
          width={wp('100%')}
          height={220}
          coinName="BTC"
          coinSlug="Bitcoin"
          type="crypto"
        />
        {/* <Cursor /> */}
        <AnalysisTag items={analData} />
        <CoinPerformanceView graphData={graphData} />

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
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10, marginBottom: 10}}>
            {newsList.map((item, index) => {
              return (
                <NewsCard
                  title={item.data().article.title}
                  content={item.data().article.summary}
                  date={item.data().article.published_date}
                  uri={item.data().article.media}
                  key={index}
                  width={246}
                  imageWidth={226}
                  imageHeight={158}
                  source={item.data().article.link}
                />
              );
            })}
          </ScrollView>
        </View>
        <AnalystRatings
          title="Analyst Ratings"
          values={{buy: 60, hold: 12, sell: 28}}
          analList={analList}
        />
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
      <TradingCheckoutOrder
        parentRef={refRBSheet3}
        item={{
          name: 'Bitcoin',
          label: 'BTC',
          image: require('../../assets/images/btc_icon.png'),
        }}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        item={{
          name: 'Bitcoin',
          label: 'BTC',
          image: require('../../assets/images/btc_icon.png'),
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
