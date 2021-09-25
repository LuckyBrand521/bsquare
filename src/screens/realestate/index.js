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
import {BlackRoundButton} from '../../components/BubbleButton';
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {NewsCard, CryptoSimilarCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {
  EstatePropertyPanel,
  EstateHistoryPanel,
  EstateNewArrivalPanel,
} from '../../components/Card/cardpanels';
import {
  BrandColorLabel,
  CryptoPortfolioPanel,
  CryptoHistoryPanel,
  InvestmentStatusOveriew,
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
  cryptoPortfolioList,
  cryptoHistoryList,
  realestatePropertyList,
  realestateHistoryList,
  realestateArrivalList,
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

function RealEstateHomeScreen({navigation}) {
  const goDetail = useCallback(screenName => {
    navigation.navigate(screenName);
  }, []);
  const goProperties = useCallback(screenName => {
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
        <SectionTitle title="Real Estate" />
        <View>
          <Text style={{alignSelf: 'center'}} />
          <LottieView
            source={require('../../assets/animations/building.json')}
            autoPlay
            loop
            style={{height: 200, alignSelf: 'center'}}
          />
          <InvestmentStatusOveriew
            label1="Number of Investments"
            value1={3}
            label2="Total Value"
            value2={5000}
            label3="P/L"
            value3={12}
          />
        </View>
        <BlackRoundButton
          iconUrl={require('../../assets/icons/swipe.png')}
          title="See Details"
          customStyle={{alignSelf: 'center', marginVertical: 20}}
          onPress={() => {
            navigation.navigate('RealEstatePropertyScreen');
          }}
        />
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="My Properties" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <EstatePropertyPanel properties={realestatePropertyList} />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <EstateHistoryPanel histories={realestateHistoryList} />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="New Arrivals" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <EstateNewArrivalPanel arrivals={realestateArrivalList} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default RealEstateHomeScreen;