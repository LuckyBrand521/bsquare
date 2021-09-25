import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import DropShadow from 'react-native-drop-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles.js';
import {BrandColorLabel} from '../Gadgets';
import {SmallLine} from '../SectionTitle';
import {colors, measures} from '../../styles/colors.js';
import {HighlightVertical} from './products';
import {
  RealEstatePropertyCard,
  RealEstateHistoryCard,
  RealEstateNewCard,
} from './index';

export const EstatePropertyPanel = props => {
  return (
    <ScrollView horizontal={true} style={{paddingBottom: 10, marginBottom: 10}}>
      {props.properties.map((item, index) => {
        return (
          <RealEstatePropertyCard
            uri={item.image}
            key={index}
            width={246}
            imageWidth={226}
            imageHeight={142}
            title={item.title}
            amount={`$${item.amount}`}
            tokenNumber={`${item.tokenNumber}%`}
            estValue={`$${item.estValue}`}
            boughtDate={item.boughtDate}
            plValue={`${item.plValue}%`}
            rioValue={`${item.rioValue}%`}
          />
        );
      })}
    </ScrollView>
  );
};

export const EstateHistoryPanel = props => {
  return (
    <ScrollView horizontal={true} style={{paddingBottom: 10, marginBottom: 10}}>
      {props.histories.map((item, index) => {
        return (
          <RealEstateHistoryCard
            uri={item.image}
            key={index}
            width={246}
            imageWidth={226}
            imageHeight={142}
            title={item.title}
            boughtValue={`$${item.boughtValue}`}
            soldValue={`$${item.soldValue}`}
            boughtDate={item.boughtDate}
            plValue={`${item.plValue}%`}
          />
        );
      })}
    </ScrollView>
  );
};

export const EstateNewArrivalPanel = props => {
  return (
    <ScrollView horizontal={true} style={{paddingBottom: 10, marginBottom: 10}}>
      {props.arrivals.map((item, index) => {
        return (
          <RealEstateNewCard
            uri={item.image}
            key={index}
            width={246}
            imageWidth={226}
            imageHeight={142}
            title={item.title}
            value={`$${item.value}`}
          />
        );
      })}
    </ScrollView>
  );
};

export const EstateDocumentPanel = props => {
  return (
    <ScrollView horizontal={true} style={{paddingBottom: 10, marginBottom: 10}}>
      {props.arrivals.map((item, index) => {
        return (
          <RealEstateNewCard
            uri={item.image}
            key={index}
            width={246}
            imageWidth={226}
            imageHeight={142}
            title={item.title}
            value={`$${item.value}`}
          />
        );
      })}
    </ScrollView>
  );
};

export const HighlightPanel = props => {
  return (
    <View style={mystyles.panel}>
      {props.highlights.map((item, index) => {
        return (
          <HighlightVertical image={item.image} key={index} name={item.name} />
        );
      })}
    </View>
  );
};

const mystyles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    marginHorizontal: measures.side,
    marginVertical: measures.side,
  },
});
