import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import {Paragraph} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Dash from 'react-native-dash';
//custom components
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {NavigationHeader} from '../../components/Headers';
import {AnalysisTag} from '../../components/AnalysisTag';
import {CryptoPortfolioPanel} from '../../components/Gadgets';
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

import SVGLineChart from '../../components/LineChart';
//apis for DB and thirdapi
import {
  getCryptoNewsForIdeas,
  getCryptoIdeaChartData,
} from '../../utils/thirdapi';

const IdeaDetailScreen = ({route, navigation}) => {
  const [product, setProduct] = useState(route.params.item);
  const [loading, setLoading] = useState(true);
  const [ideaPortfolioList, setIdeaPortfolioList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const portfolio = useSelector(state => state.portfolios.ideaPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);

  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
  const [analData, setAnalData] = useState([]);
  useEffect(() => {
    setAnalData([
      {
        label: 'Quantity',
        red: false,
        value: product.amount,
      },
      {label: 'Price', red: false, value: '$' + product.analysis.total_value},
      {label: 'P/L', red: false, value: product.analysis.daily_change + '%'},
    ]);
    getCryptoIdeaChartData(product.ideaDetails.items).then(data => {
      setGraphData(data);
      getCryptoNewsForIdeas([product]).then(resList => {
        setNewsList(resList);
        setLoading(false);
      });
    });
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
          navigation.navigate('IdeaHomeScreen');
        }}
      />
      <ScrollView>
        <SVGLineChart
          graphData={graphData}
          width={wp('100%')}
          height={220}
          coinName={product.symbol}
          coinSlug={product.ideaDetails.name}
        />

        <AnalysisTag items={analData} />
        <View style={{marginTop: 16}}>
          <PanelTitle title="Coins and Tokens" />
          {/* <CryptoPortfolioPanel
            onPress={() => {}}
            items={cryptoPortfolioList}
          /> */}
        </View>

        <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
          <PanelTitle title="News" />
          <TouchableOpacity>
            <Text style={investmentStyles.greenLabel}>Show more</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{marginVertical: 20}}>
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
        </View> */}
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
