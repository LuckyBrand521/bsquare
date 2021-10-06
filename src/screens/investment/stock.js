import React, {useState, useCallback} from 'react';
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
//test data
import {
  newsList,
  stockPortfolioList,
  stockHistoryList,
  stockList,
} from '../../store/datalist';

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
  const goDetail = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);
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
