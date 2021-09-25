import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
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
import {HighlightPanel} from '../../components/Card/cardpanels';
import {
  RealEstateDetailCard,
  ReadMorePanel,
  RealEstateInfoCard,
  PropertyDetailCard,
} from '../../components/Card/detailcard';
import {
  BrandColorLabel,
  CryptoPortfolioPanel,
  CryptoHistoryPanel,
  InvestmentStatusOveriew,
} from '../../components/Gadgets';
import {ImageGallery} from '../../components/ImageGallery';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import {colors, measures} from '../../styles/colors.js';

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
  realestateHighlightList,
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
const markers = [
  {latitude: 25.234381, longitude: 55.26157},
  {latitude: 51.513561, longitude: -0.137706},
  {latitude: 46.003677, longitude: 8.951052},
];
function RealEstateDetailScreen({navigation}) {
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
          navigation.navigate('RealEstatePropertyScreen');
        }}
      />
      <ScrollView>
        <SectionTitle title="London Apartment" fontSize={30} />
        <ImageGallery items={realestateHistoryList} />
        <RealEstateDetailCard
          percent={0.73}
          amount={'$3,000'}
          boughtDate="7 July 21"
          tokenNumber={'5%'}
          estValue={'$3,200'}
          plValue={8}
          rioValue={7}
        />
        <ReadMorePanel
          title="Info"
          targetLines={5}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit morbi eu luctus arcu fringilla diam risus. Lobortis odio suspendisse nunc netus elit felis viverra sagittis. Et massa sit habitasse quis lectus integer. Cursus viverra est, nisl, viverra turpis cursus. Nulla faucibus in sit vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit morbi eu luctus arcu fringilla diam risus. Lobortis odio suspendisse nunc netus elit felis viverra sagittis. Et massa sit habitasse quis lectus integer. Cursus viverra est, nisl, viverra turpis cursus. Nulla faucibus in sit vitae."
        />
        <RealEstateInfoCard
          maxAmount={'$20,000,000'}
          minAmount={'$3,000'}
          period={'5 years'}
          roi={'7%'}
          startDate={'1 July 21'}
          endDate={'31 Dec 21'}
        />
        <View>
          <PanelTitle title="Location" />
          <Text />
          <MapView
            // style={{height: 240, width: '100%'}}
            style={styles.map}
            mapType="terrain"
            initialRegion={{
              latitude: 51.513561,
              longitude: -0.137706,
              latitudeDelta: 0.0389,
              longitudeDelta: 0.0198,
            }}>
            <Marker
              coordinate={{
                latitude: markers[1].latitude,
                longitude: markers[1].longitude,
              }}
            />
          </MapView>
        </View>
        <View style={[styles.whiteBackground, {paddingTop: measures.side}]}>
          <PanelTitle title="Highlights" fontSize={16} />
          <HighlightPanel highlights={realestateHighlightList} />
        </View>
        <View>
          <PanelTitle title="Property Details" />
          <PropertyDetailCard
            floors={7}
            apartments={20}
            occupation={'80%'}
            total={'$30M'}
          />
        </View>
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Property Documents" />
            {/* <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default RealEstateDetailScreen;
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
  whiteBackground: {
    backgroundColor: colors.white,
  },
});
