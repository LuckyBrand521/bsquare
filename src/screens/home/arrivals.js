import React, {useContext} from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//custom components
import {NavigationHeader} from '../../components/Headers';
import {HomeIdeaNewCard} from '../../components/Card';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {getIdeaItems} from '../../utils/firestoreapi';

const ArrivalScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const goIdeaDetail = (type, id) => {
    getIdeaItems(id, type).then(res => {
      let temp = {};
      temp.amount = 1;
      temp.symbol = id;
      temp.type = type;
      temp.ideaDetails = res;
      props.navigation.navigate('Investment', {
        screen: 'IdeaDetailScreen',
        params: {
          item: temp,
        },
      });
    });
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="New arrivals"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={{
            marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <HomeIdeaNewCard
            image={require('../../assets/images/london_apr.png')}
            width={'100%'}
            imageWidth={wp('95%')}
            imageHeight={180}
            name={'London Apr'}
            symbol={'LNDN'}
            price={'$3000'}
            state={'▲$35.6(12.5%)'}
            onPress={() => {
              props.navigation.navigate('Investment', {
                screen: 'RealEstateDetailScreen',
              });
            }}
          />
          <HomeIdeaNewCard
            image={require('../../assets/images/NEWB.jpeg')}
            width={'100%'}
            imageWidth={wp('95%')}
            imageHeight={180}
            name={'New Banking'}
            symbol={'NEWB'}
            price={'$15'}
            state={'▲$1.8(17.5%)'}
            onPress={() => {
              goIdeaDetail('crypto', 'NEWB');
            }}
          />
          <HomeIdeaNewCard
            image={require('../../assets/images/bali.png')}
            width={'100%'}
            imageWidth={wp('95%')}
            imageHeight={180}
            name={'Bali Villa'}
            symbol={'BAL'}
            price={'$4500'}
            state={'▲$71.7(18.2%)'}
            onPress={() => {
              props.navigation.navigate('InvestmentStack', {
                screen: 'RealEstateDetailScreen',
              });
            }}
          />
          <HomeIdeaNewCard
            image={require('../../assets/images/MTV.jpeg')}
            width={'100%'}
            imageWidth={wp('95%')}
            imageHeight={180}
            name={'Metaverse'}
            symbol={'MTV'}
            price={'$50'}
            state={'▲$25.6(12.5%)'}
            onPress={() => {
              goIdeaDetail('crypto', 'MTV');
            }}
          />
          <HomeIdeaNewCard
            image={require('../../assets/images/GES.jpeg')}
            width={'100%'}
            imageWidth={wp('95%')}
            imageHeight={180}
            name={'Green & E-sports'}
            symbol={'GES'}
            price={'$50'}
            state={'▲$25.6(12.5%)'}
            onPress={() => {
              goIdeaDetail('stock', 'GES');
            }}
          />
          <HomeIdeaNewCard
            image={require('../../assets/images/MGZE.jpeg')}
            width={'100%'}
            imageWidth={wp('95%')}
            imageHeight={180}
            name={'Millenniums & GenZ Entertainment'}
            symbol={'MGZE'}
            price={'$50'}
            state={'▲$25.6(12.5%)'}
            onPress={() => {
              goIdeaDetail('stock', 'MGZE');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArrivalScreen;
