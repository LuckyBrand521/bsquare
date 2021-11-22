import React, {useContext} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//custom components
import {
  ListItemWithArrow,
  ListItemWithSwitch,
} from '../../../components/ListItem';
import {NavigationHeader} from '../../../components/Headers';
//custom styles
import {investmentStyles} from '../../../styles/investment';

export const ReportChoiseScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Report"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{marginTop: 24}} />
      <ListItemWithArrow content="My Card Is Lost" />
      <ListItemWithArrow content="My Card Is Stolen" />
      <ListItemWithArrow content="I Need To Talk To Someone" />
      <ListItemWithArrow content="Report Suspicious Transactions" />
      <View style={styles(theme).container}>
        <ListItemWithSwitch isOn={true} content="Freeze My Card" />
      </View>
    </SafeAreaView>
  );
};

const markers = [
  {latitude: 25.234381, longitude: 55.26157},
  {latitude: 51.513561, longitude: -0.137706},
  {latitude: 46.003677, longitude: 8.951052},
  {latitude: 26.034381, longitude: 55.16157},
];
export const FindATMScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Find An ATM"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{marginTop: 24}} />
      <MapView
        // style={{height: 240, width: '100%'}}
        style={styles(theme).map}
        mapType="terrain"
        initialRegion={{
          latitude: 25.0657,
          longitude: 55.17128,
          latitudeDelta: 0.0389,
          longitudeDelta: 0.0198,
        }}>
        <Marker
          coordinate={{
            latitude: markers[0].latitude,
            longitude: markers[0].longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: markers[3].latitude,
            longitude: markers[3].longitude,
          }}
        />
      </MapView>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      marginTop: 24,
      marginHorizontal: 16,
    },
    map: {
      height: hp('100%'),
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
