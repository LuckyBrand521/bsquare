import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SectionTitle} from '../SectionTitle';
import {ThemeContext} from 'react-native-elements';

export const NavigationHeader = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).back}>
        <TouchableOpacity style={styles(theme).back} onPress={props.onPress}>
          <Icon
            name="angle-left"
            size={30}
            style={{color: theme.colors.text_primary}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles(theme).time}>{props.title ? props.title : ''}</Text>
      <Icon
        name="bookmark-o"
        size={20}
        style={{color: '#67C431', marginLeft: 24}}
      />
    </View>
  );
};

export const NavigationProgressHeader = props => {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles(theme.theme).container}>
      <View style={styles(theme.theme).back}>
        <TouchableOpacity
          style={styles(theme.theme).back}
          onPress={props.onPress}>
          <Icon
            name="angle-left"
            size={30}
            style={{color: theme.theme.colors.text_primary}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles(theme.theme).barContainer}>
        <View
          style={{
            ...styles(theme.theme).greenBar,
            width: `${(props.value * 100) / props.total}%`,
          }}
        />
      </View>
      <Text
        style={{
          color: theme.theme.colors.green,
          fontSize: 16,
        }}>{`${props.value}/${props.total}`}</Text>
    </View>
  );
};

export const TrendViewHeader = props => {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles(theme.theme).trendHeader}>
      <Text style={styles(theme.theme).mediumText}>{props.title}</Text>
      <Image source={props.source} style={{width: 24, height: 24}} />
    </View>
  );
};

export const HomeHeader = props => {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles(theme.theme).homeHeader}>
      <SectionTitle color={theme.theme.colors.text_primary} title="Home" />
      <Image
        source={props.imageSource}
        style={styles(theme.theme).profileImage}
      />
    </View>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      height: hp(7),
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background_primary,
    },
    barContainer: {
      borderRadius: 2,
      backgroundColor: theme.colors.background_secondary,
      height: 2,
      width: 240,
    },
    greenBar: {
      borderRadius: 2,
      backgroundColor: theme.colors.green,
      height: 2,
    },
    trendHeader: {
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background_primary,
    },
    time: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.colors.text_primary,
      marginLeft: -10,
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
      color: theme.colors.text_primary,
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
