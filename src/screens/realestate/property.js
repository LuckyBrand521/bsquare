import React, {useState, useCallback, useContext} from 'react';
import {Text, View, SafeAreaView, Dimensions, ScrollView} from 'react-native';
import {ThemeContext} from 'react-native-elements';
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
//test data
import {realestatePropertyList} from '../../store/datalist';

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
const RealEstatePropertyScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [analData, setAnalData] = useState([
    {label: 'Number of Investments', red: false, value: '3'},
    {label: 'Total Value', red: false, value: '$5,000'},
    {label: 'P/L', red: false, value: '+12%'},
  ]);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title=""
        onPress={() => {
          props.navigation.geBack();
        }}
      />
      <ScrollView>
        <SectionTitle
          color={theme.colors.text_primary}
          title="Real Estate"
          fontSize={30}
        />
        <GreenMap initialRegion={initialRegion} markers={markers} />

        <View style={{backgroundColor: theme.colors.background_primary}}>
          <Text style={{alignSelf: 'center'}} />

          <AnalysisTag items={analData} />
        </View>

        <View style={{marginTop: 32}}>
          <PanelTitle
            color={theme.colors.text_primary}
            title="List Of Properties"
          />
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
                    props.navigation.navigate('RealEstateDetailScreen');
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RealEstatePropertyScreen;
