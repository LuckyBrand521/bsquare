import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
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
import {ThemeContext} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {NewsCard, CryptoSimilarCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {
  CryptoPortfolioPanel,
  CryptoHistoryPanel,
} from '../../components/Gadgets';
import {AnalysisTag} from '../../components/AnalysisTag';
import Toast from 'react-native-simple-toast';
//custom styles
import {investmentStyles} from '../../styles/investment';

//test data
import {cryptoHistoryList} from '../../store/datalist';
import {calcCryptosDayChange} from '../../utils/utils';
import {getCryptoNews} from '../../utils/thirdapi';
import {getSimilarCryptosFromDB} from '../../utils/firestoreapi';

function CryptoHomeScreen({navigation}) {
  const theme = useContext(ThemeContext).theme;
  const [loading, setLoading] = useState(true);
  const [analData, setAnalData] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [cryptoPortfolioList, setCryptoPortfolioList] = useState([]);
  const [similarCryptos, setSimilarCryptos] = useState([]);
  const portfolio = useSelector(state => state.portfolios.cryptoPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  useEffect(() => {
    if (portfolio.length > 0) {
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
          getCryptoNews('cryptocurrency')
            .then(res => {
              setNewsList(res);
              setLoading(false);
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
    } else {
      getCryptoNews('cryptocurrency')
        .then(res => {
          setNewsList(res.slice(0, 7));
          setLoading(false);
        })
        .catch(err => {
          Toast.show('Network error!', Toast.LONG);
          setLoading(false);
        });
    }
  }, []);
  const goDetail = useCallback(screenName => {
    navigation.navigate(screenName);
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
          navigation.navigate('InvestmentHomeScreen');
        }}
      />
      <ScrollView>
        <SectionTitle title="Crypto" color={theme.colors.text_primary} />
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
            <PanelTitle
              title="My Portfolio"
              color={theme.colors.text_primary}
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          {portfolio.length > 0 && (
            <CryptoPortfolioPanel
              navigation={navigation}
              onPress={goDetail}
              items={cryptoPortfolioList}
            />
          )}
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle color={theme.colors.text_primary} title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoHistoryPanel items={cryptoHistoryList} />
        </View>
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
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="Similar Cryptos"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          {portfolio.length > 0 && (
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
          )}
        </View>
        <View>
          <PanelTitle
            color={theme.colors.text_primary}
            title="Upcoming Earnings"
          />
          <Text />
          <View style={styles.upcomingEarning}>
            <Text style={{color: theme.colors.text_secondary}}>
              ADA Hard Fork
            </Text>
            <Text style={{color: theme.colors.text_primary}}>7 Days</Text>
          </View>
          <View
            style={{
              ...styles.upcomingEarning,
              borderBottomWidth: 1,
            }}>
            <Text style={{color: theme.colors.text_secondary}}>
              ETH New Updates
            </Text>
            <Text style={{color: theme.colors.text_primary}}>10 Days</Text>
          </View>
        </View>
        <Text />
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
