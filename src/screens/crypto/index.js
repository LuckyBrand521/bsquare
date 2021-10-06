import React, {useState, useCallback, useEffect} from 'react';
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

function CryptoHomeScreen({navigation}) {
  const [analData, setAnalData] = useState([
    {label: '24H Change', red: true, value: '-1.2%'},
    {label: 'Total Value', red: false, value: '$5,000'},
    {label: 'P/L', red: false, value: '+12%'},
  ]);
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
        <SectionTitle title="Crypto" />
        <View>
          <Text style={{alignSelf: 'center'}} />
          <LottieView
            source={require('../../assets/animations/crypto/increase 3 coin full.json')}
            autoPlay
            // loop={true}
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
            <PanelTitle title="Similar Cryptos" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10, marginBottom: 10}}>
            <CryptoSimilarCard
              coinImage={require('../../assets/images/btc_icon.png')}
              title="Bitcoin"
              increment={40}
              time={24}
            />
            <CryptoSimilarCard
              coinImage={require('../../assets/images/hist-e.png')}
              title="Bitcoin"
              increment={40}
              time={24}
            />
            <CryptoSimilarCard
              coinImage={require('../../assets/images/eth_icon.png')}
              title="Etherium"
              increment={40}
              time={24}
            />
            <CryptoSimilarCard
              coinImage={require('../../assets/images/ada_icon.png')}
              title="Ada"
              increment={40}
              time={24}
            />
            <CryptoSimilarCard
              coinImage={require('../../assets/images/btc_icon.png')}
              title="Bitcoin"
              increment={40}
              time={24}
            />
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
