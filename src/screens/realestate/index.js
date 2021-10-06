import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components';
//custom components
import {BlackRoundButton} from '../../components/BubbleButton';
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {NavigationHeader} from '../../components/Headers';
import {
  EstatePropertyPanel,
  EstateHistoryPanel,
  EstateNewArrivalPanel,
} from '../../components/Card/cardpanels';
import {InvestmentStatusOveriew} from '../../components/Gadgets';
import {AnalysisTag} from '../../components/AnalysisTag';
//custom styles
import {investmentStyles} from '../../styles/investment';

//test data
import {
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
  const [analData, setAnalData] = useState([
    {label: 'Number of Investments', red: false, value: '3'},
    {label: 'Total Value', red: false, value: '$5,000'},
    {label: 'P/L', red: false, value: '+12%'},
  ]);
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
          <AnalysisTag items={analData} />
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
          <EstatePropertyPanel
            properties={realestatePropertyList}
            onPress={() => {
              navigation.navigate('RealEstateDetailScreen');
            }}
          />
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
