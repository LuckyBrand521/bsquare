import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {Paragraph} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {NavigationHeader} from '../../components/Headers';
import {AnalysisTag} from '../../components/AnalysisTag';
import {IdeaItemPanel} from '../../components/Gadgets';
import {StockNewsCard, StockCard} from '../../components/Card';
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

import SVGLineChart from '../../components/LineChart';
//apis for DB and thirdapi
import {getCryptoNews, getChartsFromCMC} from '../../utils/thirdapi';
import {ideaImages} from '../../utils/constants';
const getHourDiff = time => {
  const now = new Date();
  const r = Math.round(Math.abs(now.getTime() - time.getTime()) / 3600 / 1000);
  return r;
};

const IdeaDetailScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const product = props.route.params.item;
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [graphData, setGraphData] = useState([]);

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
        value: 10,
      },
      {label: 'Price', red: false, value: '$' + 450},
      {label: 'P/L', red: false, value: 12.45 + '%'},
    ]);
    //crypto product
    Promise.all([getChartsFromCMC(6535), getCryptoNews('Tesla')])
      .then(values => {
        setGraphData(values[0]);
        setNewsList(values[1].slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
        {graphData && (
          <SVGLineChart
            graphData={graphData}
            width={wp('100%')}
            height={220}
            coinName={product.symbol}
            coinSlug={product.ideaDetails.details.name}
            type="idea"
            productData={product}
          />
        )}
        <AnalysisTag items={analData} />
        <View>
          <PanelTitle color={theme.colors.text_primary} title="Overview" />
          <Paragraph
            style={{
              ...styles.paragraphStyle,
              color: theme.colors.text_primary,
            }}>
            {product.ideaDetails.details.overview}
          </Paragraph>
        </View>
        <View style={{marginTop: 16}}>
          <PanelTitle
            color={theme.colors.text_primary}
            title="Coins and Tokens"
          />
          <IdeaItemPanel onPress={() => {}} items={product.ideaDetails.items} />
        </View>

        <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
          <PanelTitle color={theme.colors.text_primary} title="News" />
          <TouchableOpacity>
            <Text style={investmentStyles.greenLabel}>Show more</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 20}}>
          {newsList.map((item, index) => {
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
          })}
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View
        style={{
          ...styles.fixedBottomBtn,
          backgroundColor: theme.colors.background_primary,
        }}>
        <View>
          <Text style={{fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>
            Today’s Volume
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: theme.colors.text_primary,
            }}>
            54,381,175
          </Text>
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
        type={'idea'}
        item={{
          name: product.ideaDetails.details.name,
          label: product.symbol,
          id: product.symbol,
          price: Number(product.ideaDetails.details.price),
          image: ideaImages[product.symbol],
          category: product.type,
        }}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        type={'idea'}
        item={{
          id: product.symbol,
          name: product.ideaDetails.details.name,
          label: product.symbol,
          price: Number(product.ideaDetails.details.price),
          image: ideaImages[product.symbol],
          category: product.type,
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
