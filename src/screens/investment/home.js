import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';

//custom components
import {
  SectionTitle,
  MoneyTitle,
  PanelTitle,
} from '../../components/SectionTitle';
import {BubbleButton, BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {NewsCard, EarningCard} from '../../components/Card';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
//test data
import {newsList, earningList} from '../../store/datalist';

function InvestmentHomeScreen({navigation}) {
  const [totalAmount, setTotalAmount] = useState('11.520');
  const goStock = screenName => {
    navigation.navigate(screenName);
  };
  return (
    <SafeAreaView style={investmentStyles.container}>
      <ScrollView>
        <SectionTitle title="Investments" />
        <Text />
        <MoneyTitle title={totalAmount} />
        <View>
          <View style={investmentStyles.bubbleChart}>
            <ProfitLabel
              customStyle={{paddingLeft: 16}}
              greenLabel="+ $3.445"
              blackLabel="Total profit"
            />
            <ProfitLabel
              customStyle={{paddingLeft: 16}}
              greenLabel="+ $5.34"
              blackLabel="Today"
            />
            <BubbleButton
              title="Ideas"
              quantity={5030}
              backgroundColor="rgba(103, 196, 49, 0.15)"
              onPress={() => {
                goStock('StockDetailScreen');
              }}
              radius={80}
              position={{x: 45, y: 40}}
            />
            <BubbleButton
              title="Real estate"
              quantity={2535}
              backgroundColor="rgba(235, 102, 59, 0.15)"
              onPress={() => {
                goStock('RealEstateHomeScreen');
              }}
              radius={65}
              position={{x: 190, y: -25}}
            />
            <BubbleButton
              title="Crypto"
              quantity={1985}
              backgroundColor="rgba(103, 196, 49, 0.15)"
              onPress={() => {
                goStock('CryptoHomeScreen');
              }}
              radius={70}
              position={{x: 200, y: 110}}
            />
            <BubbleButton
              title="Stocks"
              quantity={1140}
              backgroundColor="rgba(235, 102, 59, 0.15)"
              onPress={() => {
                goStock('StockDetailScreen');
              }}
              radius={46}
              position={{x: 120, y: 200}}
            />
          </View>
          <BlackRoundButton
            iconUrl={require('../../assets/icons/analysis_icon.png')}
            title="Portfolio analytics"
            customStyle={{alignSelf: 'center', marginVertical: 20}}
          />
          <View>
            <View style={investmentStyles.panelHeader}>
              <PanelTitle title="News" />
              <TouchableOpacity>
                <Text style={investmentStyles.greenLabel}>All news</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{paddingBottom: 10, marginBottom: 10}}>
              {newsList.map((item, index) => {
                return (
                  <NewsCard
                    title={item.title}
                    content={item.content}
                    date={item.date}
                    uri={item.image}
                    key={index}
                    width={246}
                    imageWidth={226}
                    imageHeight={158}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View>
            <View style={investmentStyles.panelHeader}>
              <PanelTitle title="Upcoming Earnings" />
              <TouchableOpacity>
                <Text style={investmentStyles.greenLabel}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={{paddingBottom: 20}}>
              {earningList.map((item, index) => {
                return (
                  <EarningCard
                    title={item.title}
                    pastVal={item.pastVal}
                    expectVal={item.expectVal}
                    leftDays={item.leftDays}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InvestmentHomeScreen;
