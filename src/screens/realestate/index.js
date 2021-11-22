import React, {useState, useCallback, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
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

function RealEstateHomeScreen({navigation}) {
  const theme = useContext(ThemeContext).theme;
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
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title=""
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <SectionTitle color={theme.colors.text_primary} title="Real Estate" />
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
            <PanelTitle
              color={theme.colors.text_primary}
              title="My Properties"
            />
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
            <PanelTitle color={theme.colors.text_primary} title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <EstateHistoryPanel histories={realestateHistoryList} />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="New Arrivals"
            />
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
