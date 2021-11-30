import * as React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {measures} from '../../styles/colors.js';
import {HighlightVertical} from './products';
import {
  RealEstatePropertyCard,
  RealEstateHistoryCard,
  RealEstateNewCard,
  RealEstateDocumentCard,
  HomeIdeaNewCard,
} from './index';

export const EstatePropertyPanel = props => {
  const theme = React.useContext(ThemeContext).theme;
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: 10, marginBottom: 10}}>
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
            onPress={props.onPress}
          />
        );
      })}
    </ScrollView>
  );
};

export const EstateHistoryPanel = props => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: 10, marginBottom: 10}}>
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
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: 10, marginBottom: 10}}>
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
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: 10, marginBottom: 10}}>
      {props.items.map((item, index) => {
        return <RealEstateDocumentCard name={item.name} key={index} />;
      })}
    </ScrollView>
  );
};

export const HomeNewArrivalPanel = props => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingBottom: 10, marginBottom: 10}}>
      {props.arrivals.map((item, index) => {
        return (
          <HomeIdeaNewCard
            uri={item.image}
            key={index}
            width={140}
            imageWidth={120}
            imageHeight={120}
            name={item.title}
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
