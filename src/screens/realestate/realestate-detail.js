import React, {useState, useCallback, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {NavigationHeader} from '../../components/Headers';
import {
  HighlightPanel,
  EstateDocumentPanel,
} from '../../components/Card/cardpanels';
import {
  RealEstateDetailCard,
  ReadMorePanel,
  RealEstateInfoCard,
  PropertyDetailCard,
} from '../../components/Card/detailcard';
import {ImageGallery} from '../../components/ImageGallery';
import {
  RatingStoryPopup,
  TradingCheckoutFirst,
  TradingCheckoutOrder,
  TradingReceipt,
  PurchaseComplete,
} from '../../components/InvestCheckout';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import {colors, measures} from '../../styles/colors.js';

//test data
import {
  realestateHistoryList,
  realestateHighlightList,
  realestateDocumentList,
} from '../../store/datalist';

const markers = [
  {latitude: 25.234381, longitude: 55.26157},
  {latitude: 51.513561, longitude: -0.137706},
  {latitude: 46.003677, longitude: 8.951052},
];
function RealEstateDetailScreen({navigation}) {
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
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
          <EstateDocumentPanel items={realestateDocumentList} />
        </View>
      </ScrollView>
      <View style={investmentStyles.fixedBottomBtn}>
        <View>
          <Text style={{fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>
            85% Funded
          </Text>
          <ProgressBar
            progress={0.85}
            color={colors.tn}
            style={{
              backgroundColor: '#EBEFF1',
              height: 4,
              width: 140,
            }}
          />
        </View>
        <TouchableOpacity
          style={{...investmentStyles.tradeBtn, backgroundColor: '#5AC53A'}}
          onPress={() => {
            refRBSheet2.current.open();
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
            Invest
          </Text>
        </TouchableOpacity>
      </View>
      <RatingStoryPopup parentRef={refRBSheet1} />
      <TradingCheckoutFirst
        parentRef={refRBSheet2}
        buyRef={refRBSheet3}
        sellRef={refRBSheet1}
      />
      <TradingCheckoutOrder
        parentRef={refRBSheet3}
        item={{
          name: 'London Apartment',
          label: 'LNDN AP',
          image: require('../../assets/icons/building_icon.png'),
        }}
        imageWidth={24}
        reviewRef={refRBSheet4}
      />
      <TradingReceipt
        parentRef={refRBSheet4}
        item={{
          name: 'London Apartment',
          label: 'LNDN AP',
          image: require('../../assets/icons/building_icon.png'),
        }}
        imageWidth={45}
        completeRef={refRBSheet5}
      />
      <PurchaseComplete
        parentRef={refRBSheet5}
        bottomCaption="Back to Real Estate"
      />
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
