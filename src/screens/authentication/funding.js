import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';

//custom components
import {BorderedButton} from '../../components/BubbleButton';

//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const FundingMethodSelectScreen = props => {
  const theme = useContext(ThemeContext).theme;

  const terms = ['Wire Transfer', 'Crypto Wallet', 'Credit Card', 'Paypal'];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <Text style={styles(theme).topSpace} />
      <View style={styles(theme).containerType2}>
        <Text style={{...styles(theme).headingText, textAlign: 'center'}}>
          Funding Method
        </Text>
        {terms.map((val, index) => {
          return (
            <BorderedButton
              key={index}
              captionColor={theme.colors.text_primary}
              borderColor={theme.colors.background_third}
              caption={val}
              marginTop={16}
              onPress={() => {
                props.navigation.navigate('TabNavigation');
              }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
export const FundingCardScreen = props => {
  const theme = useContext(ThemeContext).theme;
};

const styles = theme =>
  StyleSheet.create({
    containerType2: {
      marginHorizontal: 16,
      marginTop: hp('3%'),
    },
    headingText: {
      color: theme.colors.text_primary,
      fontSize: 22,
      marginBottom: 32,
      fontWeight: 'bold',
    },
    topSpace: {
      height: hp(7),
    },
  });
