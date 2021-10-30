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
  MoneyTitle,
  PanelTitle,
} from '../../components/SectionTitle';
import {ThemeContext} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {BubbleButton, BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {NewsCard, EarningCard} from '../../components/Card';
import {CreditCard, AddCardBtn} from '../../components/Card/creditcard';
import {CardFeatureLinks} from '../../components/CardFeatureLinks';
import {
  ListItemWithArrow,
  ListItemWithOutArrow,
  ListItemWithPrice,
} from '../../components/ListItem';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
//test data
import {newsList, earningList} from '../../store/datalist';

function SpendingHomeScreen({navigation}) {
  const theme = useContext(ThemeContext).theme;
  const [activites, setActivities] = useState([
    {name: 'Apple Store', amount: 500, date: 1635534281},
    {name: 'Amazon', amount: 365, date: 1635534281},
    {name: 'Starbucks', amount: 6, date: 1635534281},
  ]);
  const goStock = screenName => {
    navigation.navigate(screenName);
  };
  const userInfo = useSelector(state => state.portfolios.userInfo);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <ScrollView>
        <SectionTitle title="Cash" color="#F5F7F8" fontSize={30} />
        <View style={styles(theme).flexRow}>
          <Text style={styles(theme).text}>Purchase Power</Text>
          <Text style={[styles(theme).text, styles(theme).balanceLabel]}>
            ${userInfo.card_info.balance}
          </Text>
        </View>
        <View style={styles(theme).cardView}>
          <AddCardBtn onPress={() => {}} style={styles(theme).addBtn} />
          <CreditCard
            cardNumber={userInfo.card_info.number}
            cardHolder={userInfo.name}
            expireDate={userInfo.card_info.expiration_date}
          />
        </View>
        <CardFeatureLinks />
        <View>
          <ListItemWithArrow content="Activate Card" />
          <ListItemWithArrow content="Set a PIN Number" />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              title="Recent Activities"
              color={theme.colors.text_primary}
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
          </View>
          {activites.map((item, index) => {
            return (
              <ListItemWithPrice
                key={index}
                content={item.name}
                time={item.date}
                price={item.amount}
              />
            );
          })}
        </View>
        <View>
          <LottieView
            source={require('../../assets/animations/piggy2.json')}
            autoPlay
            loop={false}
            style={{
              height: 200,
              alignSelf: 'center',
              backgroundColor: 'transparent',
            }}
            speed={1}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              title="Interest Earned"
              color={theme.colors.text_primary}
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SpendingHomeScreen;

const styles = theme =>
  StyleSheet.create({
    text: {
      color: theme.colors.text_primary,
      fontSize: 16,
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      alignItems: 'center',
    },
    balanceLabel: {
      fontWeight: 'bold',
      fontSize: 22,
    },
    cardView: {
      // marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 202,
      padding: 16,
    },
    addBtn: {
      width: 72,
      backgroundColor: theme.colors.background_secondary,
    },
  });
