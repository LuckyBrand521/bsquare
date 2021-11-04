import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

//custom components
import {
  SectionTitle,
  PanelTitle,
  SmallLine,
  TwoColSmallLine,
} from '../../components/SectionTitle';
import {ThemeContext} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {FunctionalButton} from '../../components/BubbleButton';
import {
  CreditCard,
  AddCardBtn,
  GoalListItemCard,
} from '../../components/Card/creditcard';
import {CardFeatureLinks} from '../../components/CardFeatureLinks';
import {ListItemWithArrow, ListItemWithPrice} from '../../components/ListItem';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');

export const BorrowingHomeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <ScrollView>
        <SectionTitle
          title="Borrowing"
          color={theme.colors.text_primary}
          fontSize={34}
        />
        <View style={styles(theme).container}>
          <SectionTitle
            title="Ongoing Loans"
            color={theme.colors.text_secondary}
            fontSize={22}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      paddingHorizontal: 16,
      paddingVertical: 24,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.green,
    },
  });
