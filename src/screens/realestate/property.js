import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';
//custom components
import {GreenMap} from '../../components/Map';
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {RealEstatePropertyCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';

import {AnalysisTag} from '../../components/AnalysisTag';

//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
const RATIO = width / height;
//test data
import {realestatePropertyList} from '../../store/datalist';

const GrayLabel = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
  padding: 4px;
`;

const initialRegion = {
  latitude: 25.276987,
  longitude: 55.296249,
  latitudeDelta: 100,
  longitudeDelta: 50,
};
const markers = [
  {latitude: 51.063202, longitude: -1.308},
  {latitude: 25.234381, longitude: 55.26157},
  {latitude: 46.003677, longitude: 8.951052},
];
function RealEstatePropertyScreen({navigation}) {
  const [analData, setAnalData] = useState([
    {label: 'Number of Investments', red: false, value: '3'},
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
          navigation.navigate('RealEstateHomeScreen');
        }}
      />
      <ScrollView>
        <SectionTitle title="Real Estate" fontSize={30} />
        <GreenMap initialRegion={initialRegion} markers={markers} />

        <View style={{backgroundColor: 'white'}}>
          <Text style={{alignSelf: 'center'}} />

          <AnalysisTag items={analData} />
        </View>

        <View style={{marginTop: 32}}>
          <PanelTitle title="List Of Properties" />
          <View style={{marginTop: 16}}>
            {realestatePropertyList.map((item, index) => {
              return (
                <RealEstatePropertyCard
                  uri={item.image}
                  key={index}
                  imageWidth={wp('100%') - 32}
                  imageHeight={165}
                  title={item.title}
                  amount={`$${item.amount}`}
                  tokenNumber={`${item.tokenNumber}%`}
                  estValue={`$${item.estValue}`}
                  boughtDate={item.boughtDate}
                  plValue={`${item.plValue}%`}
                  rioValue={`${item.rioValue}%`}
                  onPress={() => {
                    navigation.navigate('RealEstateDetailScreen');
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default RealEstatePropertyScreen;
