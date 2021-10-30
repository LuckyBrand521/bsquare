import React, {useState, useCallback, useEffect} from 'react';
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
import LottieView from 'lottie-react-native';
import styled from 'styled-components';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {NewsCard, CryptoSimilarCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {
  BrandColorLabel,
  CryptoPortfolioPanel,
  CryptoHistoryPanel,
} from '../../components/Gadgets';
import {AnalysisTag} from '../../components/AnalysisTag';
import Toast from 'react-native-simple-toast';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
//test data
import {cryptoHistoryList} from '../../store/datalist';
import {
  calcCryptosDayChange,
  updateCryptoNewsOnDB,
  getCryptoNewsFromDB,
} from '../../utils/utils';
import {getCryptoNews} from '../../utils/thirdapi';
import {getSimilarCryptosFromDB} from '../../utils/firestoreapi';

function CryptoHomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [analData, setAnalData] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [cryptoPortfolioList, setCryptoPortfolioList] = useState([]);
  const [similarCryptos, setSimilarCryptos] = useState([]);
  const portfolio = useSelector(state => state.portfolios.cryptoPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  useEffect(() => {
    let unmounted = false;
    calcCryptosDayChange(userInfo.user_id, portfolio)
      .then(data => {
        setAnalData([
          {
            label: '24H Change',
            red: data.daily_change > 0 ? false : true,
            value: data.daily_change + '%',
          },
          {label: 'Total Value', red: false, value: '$' + data.total_value},
          {label: 'P/L', red: false, value: data.profit + '%'},
        ]);
        setCryptoPortfolioList(data.current_portfolio);
        getCryptoNewsFromDB('cryptocurrency')
          .then(res => {
            setNewsList(res);
            if (!unmounted) {
              setLoading(false);
            }
          })
          .catch(err => {
            Toast.show('Network error!', Toast.LONG);
            setLoading(false);
          });
      })
      .catch(err => {
        Toast.show('Network error!', Toast.LONG);
        setLoading(false);
      });
    getSimilarCryptosFromDB(portfolio).then(res => {
      setSimilarCryptos(res);
    });
    return () => {
      unmounted = true;
    };
  }, []);
  const goDetail = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={investmentStyles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={investmentStyles.container}>
      <NavigationHeader
        title=""
        onPress={() => {
          navigation.navigate('InvestmentHomeScreen');
        }}
      />
      <ScrollView>
        <SectionTitle title="Crypto" />
        <View>
          <Text style={{alignSelf: 'center'}} />
          <LottieView
            source={require('../../assets/animations/crypto/8-12coin.json')}
            autoPlay
            loop={false}
            style={{height: 200, alignSelf: 'center'}}
            speed={0.5}
          />
          <AnalysisTag items={analData} />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="My Portfolio" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoPortfolioPanel
            onPress={goDetail}
            items={cryptoPortfolioList}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoHistoryPanel items={cryptoHistoryList} />
        </View>
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
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Similar Cryptos" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10, marginBottom: 10}}>
            {similarCryptos.map((item, index) => {
              return (
                <CryptoSimilarCard
                  key={index}
                  coinImage={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
                  title={item.name}
                  increment={item.quote.USD.percent_change_24h.toFixed(2)}
                  time={24}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <PanelTitle title="Upcoming Earnings" />
          <Text />
          <View style={styles.upcomingEarning}>
            <Text style={{color: '#83899D'}}>ADA Hard Fork</Text>
            <Text>7 Days</Text>
          </View>
          <View
            style={{
              ...styles.upcomingEarning,
              borderBottomWidth: 1,
            }}>
            <Text style={{color: '#83899D'}}>ETH New Updates</Text>
            <Text>10 Days</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default CryptoHomeScreen;

const styles = StyleSheet.create({
  upcomingEarning: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#EBEFF1',
    paddingVertical: 12,
  },
});
