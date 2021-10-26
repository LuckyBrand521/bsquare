import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {
  StockNewsCard,
  NewsCard,
  CryptoSimilarCard,
  StockCard,
} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {
  BrandColorLabel,
  CryptoPortfolioPanel,
  CryptoHistoryPanel,
  StockPortfolioPanel,
} from '../../components/Gadgets';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import {
  calcCryptosDayChange,
  updateCryptoNewsOnDB,
  getStockNewsFromDB,
  calcStockDayChange,
} from '../../utils/utils';
//test data
import {stockHistoryList, stockList} from '../../store/datalist';

const GrayLabel = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
  padding: 4px;
`;

function StockHomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [stockPortfolioList, setStockPortfolioList] = useState([]);
  const portfolio = useSelector(state => state.portfolios.stockPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  useEffect(() => {
    let unmounted = false;
    calcStockDayChange(userInfo.user_id, portfolio).then(data => {
      setStockPortfolioList(data.current_portfolio);
      getStockNewsFromDB('AAPL').then(res => {
        setNewsList(res);
        setLoading(false);
      });
      // getCryptoNewsFromDB('cryptocurrency').then(res => {
      //   setNewsList(res);
      //   if (!unmounted) {
      //     setLoading(false);
      //   }
      // });
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
        <Spinner visible={loading} textContent={'Loading...'} />
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
        <SectionTitle title="Stocks" fontSize={30} />
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
            <PanelTitle title="My Portfolio" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <StockPortfolioPanel onPress={goDetail} items={stockPortfolioList} />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoHistoryPanel items={stockHistoryList} />
        </View>
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle title="Related News" />
            {/* <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity> */}
          </View>
          <View style={{marginVertical: 20}}>
            {newsList.map((item, index) => {
              return (
                <StockNewsCard
                  title={item.data().article.title}
                  content={item.data().article.summary}
                  uri={item.data().article.media}
                  key={index}
                  newsHour={Math.floor(Math.random() * 24) + 1}
                  source={item.data().article.link}
                />
              );
            })}
          </View>
        </View>
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="More Stocks" />
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
}
export default StockHomeScreen;
