import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ThemeContext, CheckBox} from 'react-native-elements';
import {ProgressBar} from 'react-native-paper';

//custom components
import {NavigationHeader} from '../../../components/Headers';
import {SectionTitle, SmallLine} from '../../../components/SectionTitle';
import {
  AmountInput,
  MonthYearPicker,
  SimpleSlider,
  DropdownSelect,
} from '../../../components/Inputs';
import {
  ContinueBottomBtn,
  BorderedButton,
  FinishButton,
} from '../../../components/BubbleButton';
import {GoalWithRing} from '../../../components/Card/products';
import {
  ListItemWithImage,
  ListItemWithSwitch,
  ListItemWithPrice,
  ListItemWithPriceDate,
  ListItemThree,
  ListItemThree2,
} from '../../../components/ListItem';
//custom styles
import {investmentStyles} from '../../../styles/investment';

const data = [
  {
    id: 0,
    image: require('../../../assets/images/travel.png'),
    name: 'Vacation',
  },
  {id: 1, image: require('../../../assets/images/home.png'), name: 'Home'},
  {
    id: 2,
    image: require('../../../assets/images/education.png'),
    name: 'Education',
  },
  {id: 3, image: require('../../../assets/images/car.png'), name: 'Car'},
  {
    id: 4,
    image: require('../../../assets/images/wedding.png'),
    name: 'Wedding',
  },
  {
    id: 5,
    image: '',
    name: 'Other',
  },
];

export const GoalDetailScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const goal = {
    title: 'Travel to Bali',
    type: 0,
    amount: 4000,
    deadline: 1635897617579,
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title={data[goal.type].name}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title={goal.title}
        color={theme.colors.text_primary}
        fontSize={24}
      />
      <View style={styles(theme).goalImageContainer}>
        <GoalWithRing radius={100} image={data[goal.type].image} value={0} />
      </View>
      <Text style={styles(theme).textNormal}>
        Take ${(goal.amount / new Date(goal.deadline).getMonth()).toFixed(0)}{' '}
        each months on the {new Date().getDate()}th
      </Text>
      <View style={styles(theme).stateListView}>
        <GrayLabel theme={theme} label={'10% achieved'} />
        <ProgressBar
          progress={0.1}
          color={theme.colors.green}
          style={styles(theme).progressbarStyle}
        />
        <GrayLabel theme={theme} label={'180 days left'} />
        <ProgressBar
          progress={0.2}
          color={theme.colors.green}
          style={styles(theme).progressbarStyle}
        />
        <GrayLabel theme={theme} label={'$400 out of $4000'} />
        <ProgressBar
          progress={0.2}
          color={theme.colors.green}
          style={styles(theme).progressbarStyle}
        />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Give it a boost"
          onPress={() => {
            props.navigation.navigate('BoostGoalInvestScreen', {
              goal: goal,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BoostGoalInvestScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  const goInvest = coinId => {
    props.navigation.navigate('BoostSubscribeScreen', {
      goal: lastgoal,
      coinId: coinId,
    });
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Give it a boost"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Invest in stable coins"
        color={theme.colors.text_primary}
        fontSize={24}
      />
      <View style={{marginHorizontal: 16}}>
        <View style={{marginVertical: 20}}>
          <Text style={styles(theme).greenText}>Principal guaranteed</Text>
          <Text style={styles(theme).label}>
            Stablecoins offer predictable return for crypto{'\n'}temporarily
            locked up.
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <ListItemThree2 value={['Coin', 'Duration', 'Est.APY']} />
          <ListItemThree
            onPress={() => {
              goInvest('USDT');
            }}
            bordered
            value={['USDT', 'Flexible', '1.20%']}
          />
          <ListItemThree
            onPress={() => {
              goInvest('BUSD');
            }}
            bordered
            value={['BUSD', 'Flexible', '1.20%']}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={styles(theme).label}>Disclaimer</Text>
          <Text style={styles(theme).normal}>
            For the most part, stablecoins are much safer than other
            cryptocurrencies. You normally don't need to worry about the price
            plummeting. ... If you buy a stablecoin pegged to the dollar, you're
            banking on the value of the dollar. One final risk is whether the
            central authority has the collateral it claims
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const BoostSubscribeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title={props.route.params.coinId}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Subscription amount"
        color={theme.colors.text_primary}
        fontSize={24}
      />
      <View style={styles(theme).container}>
        <Text style={styles(theme).prepayAmountlabel}>1000</Text>
        <Text style={styles(theme).smlabel}>Expected return $12</Text>
        <Text style={styles(theme).label}>Value Date</Text>
        <Text style={styles(theme).textNormal}>28.7.2021 4:00 AM</Text>
        <Text style={styles(theme).label}>Flexable intrest per month</Text>
        <Text style={styles(theme).textNormal}>0.03288 USDT</Text>
        <Text style={styles(theme).label}>Max subscribtion</Text>
        <Text style={styles(theme).textNormal}>150M USDT</Text>
        <Text style={styles(theme).label}>7 day APY</Text>
        <Text style={styles(theme).textNormal}>USDT 1.20%</Text>
        <Text style={styles(theme).label}>Fees</Text>
        <Text style={styles(theme).textNormal}>0.00002 USDT</Text>
      </View>
      <View style={{...styles(theme).continueBtn, bottom: 0}}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="One time"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BoostMethodScreen', {
              goal: {
                ...lastgoal,
                boostAuto: 0,
                boostCoin: props.route.params.coinId,
              },
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Automate"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BoostMethodScreen', {
              goal: {
                ...lastgoal,
                boostAuto: 1,
                boostCoin: props.route.params.coinId,
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BoostMethodScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title={lastgoal.boostAuto ? 'Automate' : 'One time'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{...styles(theme).container, marginTop: 100}}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Every day"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BoostReceiptScreen', {
              goal: {
                ...lastgoal,
                interval: 0,
              },
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Every month"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BoostReceiptScreen', {
              goal: {
                ...lastgoal,
                interval: 1,
              },
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Every year"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BoostReceiptScreen', {
              goal: {
                ...lastgoal,
                interval: 2,
              },
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Customize"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BoostReceiptScreen', {
              goal: {
                ...lastgoal,
                interval: 3,
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BoostReceiptScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Boost"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Receipt"
        color={theme.colors.text_primary}
        fontSize={24}
      />
      <View style={styles(theme).container}>
        <SmallLine
          bottomBorder
          valueSize={16}
          titleSize={16}
          borderColor={theme.colors.text_secondary}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Amount"
          value="$1000"
        />
        <SmallLine
          bottomBorder
          valueSize={16}
          titleSize={16}
          borderColor={theme.colors.text_secondary}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="APY"
          value="1.2%"
        />
        <SmallLine
          bottomBorder
          valueSize={16}
          titleSize={16}
          borderColor={theme.colors.text_secondary}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Date"
          value="27/7/2021"
        />
        <SmallLine
          bottomBorder
          valueSize={16}
          titleSize={16}
          borderColor={theme.colors.text_secondary}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Fees"
          value="0.000002 USDT"
        />
        <View
          style={{
            marginVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...styles(theme).normal, fontSize: 22}}>
            Total Cost
          </Text>
          <Text style={{...styles(theme).greenText, fontSize: 22}}>
            $1,000.2
          </Text>
        </View>
      </View>
      <FinishButton
        caption="Let's do it"
        captionStyle={styles(theme).finishStyle}
        onPress={() => {
          props.navigation.navigate('BoostCompleteScreen', {goal: lastgoal});
        }}
      />
    </SafeAreaView>
  );
};

export const BoostCompleteScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title={data[lastgoal.type].name}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <SectionTitle
          title={lastgoal.title}
          color={theme.colors.text_primary}
          fontSize={24}
        />
        <View style={styles(theme).goalImageContainer}>
          <GoalWithRing
            radius={100}
            image={data[lastgoal.type].image}
            value={0}
          />
        </View>
        <Text style={{...styles(theme).textNormal, marginLeft: 16}}>
          Take $
          {(lastgoal.amount / new Date(lastgoal.deadline).getMonth()).toFixed(
            0,
          )}{' '}
          each months on the {new Date().getDate()}th
        </Text>
        <View style={styles(theme).stateListView}>
          <GrayLabel theme={theme} label={'10% achieved'} />
          <ProgressBar
            progress={0.1}
            color={theme.colors.green}
            style={styles(theme).progressbarStyle}
          />
          <GrayLabel theme={theme} label={'180 days left'} />
          <ProgressBar
            progress={0.2}
            color={theme.colors.green}
            style={styles(theme).progressbarStyle}
          />
          <GrayLabel theme={theme} label={'$400 out of $4000'} />
          <ProgressBar
            progress={0.2}
            color={theme.colors.green}
            style={styles(theme).progressbarStyle}
          />
        </View>
        <SectionTitle
          title={'Boost'}
          color={theme.colors.text_primary}
          fontSize={24}
        />
        <View style={styles(theme).container}>
          <View style={styles(theme).tm}>
            <Text style={styles(theme).smlabel}>27/7/21</Text>
            <Text style={styles(theme).smlabel}>3/8/21</Text>
          </View>
          <ProgressBar
            progress={0}
            color={theme.colors.green}
            style={styles(theme).progressbarStyle}
          />
          <View style={styles(theme).tm}>
            <Text style={{...styles(theme).smlabel, marginVertical: 0}}>
              $1000
            </Text>
            <Text style={{...styles(theme).smlabel, marginVertical: 0}}>
              $1012
            </Text>
          </View>
          <Text style={styles(theme).label}>Time will be reduced by</Text>
          <Text style={styles(theme).textNormal}>2 Days</Text>
          <Text style={styles(theme).label}>APY</Text>
          <Text style={styles(theme).textNormal}>1.2%</Text>
          <Text style={styles(theme).label}>APY in USDT</Text>
          <Text style={styles(theme).textNormal}>12 USDT</Text>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Go to Spending"
          onPress={() => {
            props.navigation.navigate('SpendingHomeScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const GrayLabel = props => {
  return <Text style={styles(props.theme).grayLabel}>{props.label}</Text>;
};

const styles = theme =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: 24,
    },
    tm: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    goalImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 32,
    },
    stateListView: {
      marginHorizontal: 16,
      marginVertical: 16,
    },
    grayLabel: {
      color: theme.colors.text_secondary,
      alignSelf: 'flex-end',
      fontSize: 13,
      fontWeight: '400',
    },
    textNormal: {
      color: theme.colors.text_primary,
      fontSize: 16,
    },
    progressbarStyle: {
      backgroundColor: theme.colors.background_secondary,
      height: 6,
      width: '100%',
      borderRadius: 2,
      marginTop: 6,
      marginBottom: 18,
    },
    continueBtn: {
      alignItems: 'center',
      paddingHorizontal: 16,
      position: 'absolute',
      bottom: -30,
      width: '100%',
    },
    greenText: {
      color: theme.colors.green,
      marginVertical: 10,
    },
    label: {
      color: theme.colors.text_secondary,
      fontSize: 16,
      fontWeight: '400',
      marginVertical: 10,
    },
    normal: {
      color: theme.colors.text_primary,
      fontWeight: '400',
      fontSize: 16,
    },
    prepayAmountlabel: {
      color: theme.colors.text_primary,
      fontSize: 22,
      borderRadius: 10,
      width: 200,
      backgroundColor: theme.colors.background_secondary,
      padding: 12,
      marginTop: 10,
    },
    smlabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      fontWeight: '400',
      marginVertical: 10,
    },
    finishStyle: {
      color: theme.colors.text_primary,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
