import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import DropShadow from 'react-native-drop-shadow';
import {Card} from 'react-native-paper';
import {CircularProgressWithChild} from 'react-native-circular-progress-indicator';
import {SmallLine} from '../SectionTitle';
import {CustomProgressBar} from '../../components/Gadgets';
import {measures} from '../../styles/colors';
const cardImage = require('../../assets/images/visa_card.png');

const cvtNumtoCardNum = number => {
  let str = number.toString();
  let res = '';
  if (str.length !== 16) {
    return number;
  } else {
    for (var i = 0; i < str.length; i++) {
      res += str[i];
      if (i > 0 && (i + 1) % 4 == 0) {
        res += ' ';
      }
    }
    return res.slice(0, res.length - 1);
  }
};
export const CreditCard = props => {
  const theme = useContext(ThemeContext).theme;
  const colors = [
    theme.colors.green,
    theme.colors.background_secondary,
    theme.colors.red,
  ];
  return (
    <View style={styles(theme).cardContainer}>
      <View
        style={{
          ...styles(theme).cardImagePart,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : colors[props.type],
        }}
        resizeMode={'stretch'}
        source={cardImage}>
        <Text style={styles(theme).visaSign}>Visa</Text>
        <Text style={styles(theme).cardNumber}>
          {cvtNumtoCardNum(props.cardNumber)}
        </Text>
        <View style={styles(theme).cardInfo}>
          <Text style={styles(theme).cardHolder}>{props.cardHolder}</Text>
          <Text style={styles(theme).cardHolder}>{props.expireDate}</Text>
        </View>
      </View>
    </View>
  );
};

export const AddCardBtn = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      style={[styles(theme).plusBtn, props.style]}>
      <Icon name="plus" size={28} color={theme.colors.text_primary} />
    </TouchableOpacity>
  );
};

export const GoalListItemCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <DropShadow style={styles(theme).dropShadowStyle}>
      <TouchableOpacity onPress={props.onPress}>
        <Card style={{...styles(theme).card, width: props.width}}>
          <Image
            source={{uri: props.uri}}
            style={{
              width: props.imageWidth,
              height: props.imageHeight,
              borderRadius: 10,
              marginTop: 5,
            }}
          />
          <Card.Content style={{paddingLeft: 7}}>
            <View>
              <SmallLine
                bold
                paddingVertical={12}
                title={props.title}
                titleSize={measures.side}
                titleColor={theme.colors.text_primary}
                valueColor={theme.colors.text_primary}
                value={props.value}
              />
              <CustomProgressBar
                backgroundColor={theme.colors.background_third}
                val={props.percent / 100}
                color={theme.colors.green}
                textColor={theme.colors.text_secondary}
                text={`${props.percent}%`}
                barHeight={6}
                width={260}
              />
              <Text style={styles(theme).graylabel}>
                {props.dates} Days Left
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </DropShadow>
  );
};

export const GoalCircledItem = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <CircularProgressWithChild
      {...props}
      value={80}
      radius={125}
      activeStrokeColor={'#5AC53A'}
      inActiveStrokeColor={'#5AC53A'}>
      <Image
        source={{uri: props.image}}
        width={240}
        height={240}
        style={styles(theme).circledImage}
      />
    </CircularProgressWithChild>
  );
};

const styles = theme =>
  StyleSheet.create({
    cardContainer: {},
    cardImagePart: {
      width: 280,
      height: 170,
      borderRadius: 10,
    },
    cardInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      width: '100%',
      paddingHorizontal: 16,
      bottom: 18,
    },
    visaSign: {
      color: theme.colors.text_primary,
      fontWeight: 'bold',
      fontSize: 20,
      fontStyle: 'italic',
      marginLeft: 17,
      marginTop: 16,
    },
    cardNumber: {
      color: theme.colors.text_primary,
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 17,
      marginTop: 30,
    },
    cardHolder: {
      color: theme.colors.text_primary,
      fontSize: 13,
    },
    plusBtn: {
      backgroundColor: '#EBEFF1',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropShadowStyle: {
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
    card: {
      marginHorizontal: 5,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: theme.colors.background_secondary,
    },
    graylabel: {
      fontSize: 13,
      fontWeight: '400',
      color: '#83899D',
    },
    circledImage: {
      borderRadius: 100,
    },
  });
