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
import MapView, {Marker, Geojson} from 'react-native-maps';
import styled from 'styled-components';
//custom components
import {BlackRoundButton} from '../../components/BubbleButton';
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {
  NewsCard,
  CryptoSimilarCard,
  RealEstatePropertyCard,
} from '../../components/Card';
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
const markers = [
  {latitude: 51.063202, longitude: -1.308},
  {latitude: 25.234381, longitude: 55.26157},
  {latitude: 46.003677, longitude: 8.951052},
];
function RealEstatePropertyScreen({navigation}) {
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
        <View>
          <MapView
            // style={{height: 240, width: '100%'}}
            style={styles.map}
            mapType="satellite"
            initialRegion={{
              latitude: 25.276987,
              longitude: 55.296249,
              latitudeDelta: 100,
              longitudeDelta: 50,
            }}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              />
            ))}
          </MapView>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={{alignSelf: 'center'}} />

          <InvestmentStatusOveriew
            label1="Number of Investments"
            value1={3}
            label2="Total Value"
            value2={5000}
            label3="P/L"
            value3={12}
          />
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    height: 250,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: -30,
  },
});
