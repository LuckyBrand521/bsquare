import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

//custom components
import {
  SectionTitle,
  MoneyTitle,
  PanelTitle,
} from '../../components/SectionTitle';
import {ThemeContext} from 'react-native-elements';
import {BubbleButton, BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {NewsCard, EarningCard} from '../../components/Card';
//custom styles
import {investmentStyles} from '../../styles/investment';

//test data
import {newsList, earningList} from '../../store/datalist';

const InvestmentHomeScreen = props => {
  const [totalAmount, setTotalAmount] = useState('11.520');
  const theme = useContext(ThemeContext).theme;
  const goStock = screenName => {
    props.navigation.navigate(screenName);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <ScrollView>
        <SectionTitle title="Investments" color={theme.colors.text_primary} />
        <Text />
        <MoneyTitle title={totalAmount} color={theme.colors.text_primary} />
        <View>
          <View style={investmentStyles.bubbleChart}>
            <ProfitLabel
              customStyle={{paddingLeft: 16}}
              greenLabel="+ $3.445"
              blackLabel="Total profit"
              labelColor={theme.colors.text_primary}
            />
            <ProfitLabel
              customStyle={{paddingLeft: 16}}
              greenLabel="+ $5.34"
              blackLabel="Today"
              labelColor={theme.colors.text_primary}
            />
            <BubbleButton
              title="Ideas"
              quantity={5030}
              backgroundColor={theme.colors.brand_green}
              onPress={() => {
                goStock('IdeaHomeScreen');
              }}
              radius={80}
              position={{x: 45, y: 40}}
            />
            <BubbleButton
              title="Real estate"
              quantity={2535}
              backgroundColor={theme.colors.red}
              onPress={() => {
                goStock('RealEstateHomeScreen');
              }}
              radius={65}
              position={{x: 190, y: -25}}
            />
            <BubbleButton
              title="Crypto"
              quantity={1985}
              backgroundColor={theme.colors.background_third}
              onPress={() => {
                goStock('CryptoHomeScreen');
              }}
              radius={70}
              position={{x: 200, y: 110}}
            />
            <BubbleButton
              title="Stocks"
              quantity={1140}
              backgroundColor={theme.colors.background_tertiary}
              onPress={() => {
                goStock('StockHomeScreen');
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
              <PanelTitle title="News" color={theme.colors.text_primary} />
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
                    title={item.title}
                    content={item.content}
                    date={item.date}
                    uri={item.image}
                    key={index}
                    width={246}
                    imageWidth={226}
                    imageHeight={158}
                    source={item.source}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View>
            <View style={investmentStyles.panelHeader}>
              <PanelTitle
                color={theme.colors.text_primary}
                title="Upcoming Earnings"
              />
              <TouchableOpacity>
                <Text style={investmentStyles.greenLabel}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{paddingBottom: 20}}>
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
};

export default InvestmentHomeScreen;
