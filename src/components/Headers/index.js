import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SectionTitle} from '../SectionTitle';

export const NavigationHeader = props => {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity style={styles.back} onPress={props.onPress}>
          <Icon name="angle-left" size={30} style={{color: '#000'}} />
        </TouchableOpacity>
      </View>
      <Text style={styles.time}>{props.title ? props.title : ''}</Text>
      <Icon name="bookmark-o" size={20} style={{color: '#67C431'}} />
    </View>
  );
};

export const TrendViewHeader = props => {
  return (
    <View style={styles.trendHeader}>
      <Text style={styles.mediumText}>{props.title}</Text>
      <Image source={props.source} style={{width: 24, height: 24}} />
    </View>
  );
};

export const HomeHeader = props => {
  return (
    <View style={styles.homeHeader}>
      <SectionTitle title="Home" />
      <Image source={props.imageSource} style={styles.profileImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  trendHeader: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  time: {
    fontSize: 18,
    fontWeight: '500',
  },
  back: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
    height: 40,
  },
  mediumText: {
    fontFamily: 'HelveticaNeueCyr',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 30,
    lineHeight: 30,
    color: '#2A2E3B',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 16,
    marginTop: 12,
  },
});
