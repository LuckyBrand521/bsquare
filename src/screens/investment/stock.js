import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {StockNewsCard, StockCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {
  CryptoHistoryPanel,
  StockPortfolioPanel,
} from '../../components/Gadgets';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {calcStockDayChange} from '../../utils/utils';
//test data
import {stockHistoryList, stockList} from '../../store/datalist';
import {getCryptoNews} from '../../utils/thirdapi';

const getHourDiff = time => {
  const now = new Date();
  const r = Math.round(Math.abs(now.getTime() - time.getTime()) / 3600 / 1000);
  return r;
};

const StockHomeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [stockPortfolioList, setStockPortfolioList] = useState([]);
  const portfolio = useSelector(state => state.portfolios.stockPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  useEffect(() => {
    if (portfolio.length > 0) {
      Promise.all([
        calcStockDayChange(userInfo.user_id, portfolio),
        getCryptoNews(portfolio[0].stock_id),
      ])
        .then(values => {
          setStockPortfolioList(values[0].current_portfolio);
          setNewsList(values[1].slice(0, 7));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      getCryptoNews('Stock')
        .then(res => {
          setNewsList(values[1].slice(0, 7));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const goDetail = useCallback(screenName => {
    props.navigation.navigate(screenName);
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
          props.navigation.navigate('InvestmentHomeScreen');
        }}
      />
      <ScrollView>
        <SectionTitle
          title="Stocks"
          color={theme.colors.text_primary}
          fontSize={30}
        />
        <View>
          <Text style={{alignSelf: 'center'}} />
          <LottieView
            source={require('../../assets/animations/stock.json')}
            autoPlay
            loop
            style={{height: 240, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="My Portfolio"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <StockPortfolioPanel
            navigation={props.navigation}
            onPress={goDetail}
            items={stockPortfolioList}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle color={theme.colors.text_primary} title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoHistoryPanel items={stockHistoryList} />
        </View>
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="Related News"
            />
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
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle color={theme.colors.text_primary} title="More Stocks" />
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default StockHomeScreen;
