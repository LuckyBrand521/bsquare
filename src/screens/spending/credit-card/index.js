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
  Button,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//custom components
import {
  ListItemWithArrow,
  ListItemWithOutArrow,
  ListItemWithPrice,
} from '../../../components/ListItem';
import {NavigationHeader, TrendViewHeader} from '../../../components/Headers';
//custom styles
import {investmentStyles} from '../../../styles/investment';

const {width, height} = Dimensions.get('window');

const CreateNewCardScreen = props => {
  // const theme = useContext(ThemeContext).theme;
  // const params = route.params ? route.params : {};
  useEffect(() => {
    console.log('sdf');
  }, []);
  return (
    // <SafeAreaView
    //   style={{
    //     ...investmentStyles.container,
    //     backgroundColor: theme.colors.background_primary,
    //   }}>
    //   {/* <NavigationHeader
    //     title="Issue a new card"
    //     onPress={() => {
    //       nav.goBack();
    //     }}
    //   /> */}
    <View>
      <Button
        onPress={() => props.navigation.navigate('CreateNewCardConfirmScreen')}
        title="Click"
      />
    </View>
    // </SafeAreaView>
  );
};

export default CreateNewCardScreen;
