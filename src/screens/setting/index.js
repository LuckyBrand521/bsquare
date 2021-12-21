import React, {useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

//custom components
import {NavigationHeader} from '../../components/Headers';
import {SectionTitle} from '../../components/SectionTitle';
import {BorderedButton, ContinueBottomBtn} from '../../components/BubbleButton';
import {AmountInput} from '../../components/Inputs';
import {
  ListItemWithImage,
  ListItemWithGreenArrow,
} from '../../components/ListItem';
import {WealthChart} from '../../components/Chart';
import {SingleAccordionPanel} from '../../components/TagPanel';
//redux Actions
import {updateUserBalance} from '../../redux/slices/portfolioSlice';
//api
import {updateUserInfo} from '../../utils/firestoreapi';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//test data

const ProfileHomeScreen = props => {
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const theme = useContext(ThemeContext).theme;
  const values = [
    {value: 5, color: '#6CE4FE'},
    {value: 10, color: '#58AFFF'},
    {value: 25, color: '#E45A28'},
    {value: 25, color: '#67C431'},
    {value: 35, color: '#959FA4'},
  ];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <ScrollView>
        <View style={styles(theme).header}>
          <View>
            <SectionTitle
              title="Hey there"
              color={theme.colors.text_primary}
              fontSize={16}
            />
            <SectionTitle
              title="Mohammed"
              color={theme.colors.text_primary}
              fontSize={30}
            />
          </View>
          <Image
            source={require('../../assets/images/avatar1.png')}
            style={styles(theme).profileImage}
          />
        </View>
        <View style={styles(theme).chartContainer}>
          <WealthChart
            radius={wp('25%')}
            values={values}
            backgroundColor={theme.colors.background_primary}
            label="Total Wealth"
            amount={userInfo.account_balance}
            labelColor={theme.colors.text_secondary}
            amountColor={theme.colors.text_primary}
          />
        </View>
        <View style={styles(theme).listContainer}>
          <SingleAccordionPanel
            label="Details"
            items={[
              {title: 'Stocks', value: '$1,000', color: theme.colors.green},
              {
                title: 'Crypto',
                value: '$2,000',
                color: theme.colors.brand_teal,
              },
              {title: 'Ideas', value: '$5,000', color: theme.colors.brand_red},
              {
                title: 'Real Estates',
                value: '$6,540',
                color: theme.colors.brand_blue,
              },
              {
                title: 'Cash',
                value: '$10,000',
                color: theme.colors.text_secondary,
              },
            ]}
          />
          <ListItemWithGreenArrow
            content1="Deposits, Withdraw"
            onPress={() => {
              props.navigation.navigate('WithdrawChoiceScreen');
            }}
          />
          <ListItemWithGreenArrow
            content1="Statements & History"
            content2="Documents & Account Activity"
            onPress={() => {
              props.navigation.navigate('StatementHomeScreen');
            }}
          />
          <ListItemWithGreenArrow
            content1="Settings"
            content2="Notification, Security, Account"
            onPress={() => {
              props.navigation.navigate('AppSettingHomeScreen');
            }}
          />
          <ListItemWithGreenArrow
            content1="Help"
            content2="Support, Disclosure"
          />
          <ListItemWithGreenArrow
            content1="Reinvestment"
            content2="Recurring Investments, Dividend Reinvestment"
            onPress={() => {
              props.navigation.navigate('ReinvestmentHomeScreen');
            }}
          />
        </View>
        <View style={styles(theme).btnContainer}>
          <BorderedButton
            borderColor={theme.colors.green}
            captionColor={theme.colors.text_primary}
            backgroundColor={theme.colors.green}
            caption="Log out"
            marginTop={16}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const WithdrawChoiceScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Deposits, Withdraw"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View
        style={{
          ...styles(theme).container,
          marginTop: 160,
          marginHorizontal: 16,
        }}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Transfer"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('ProfileTransferScreen');
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Deposit"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('ProfileDepositScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const ProfileDepositScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Deposit"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Deposit"
        color={theme.colors.text_primary}
        fontSize={34}
      />
      <Text />
      <View style={styles(theme).listContainer}>
        <ListItemWithImage
          faIcon={true}
          iconName="bank"
          content="My Account in a Different Bank"
        />
        <ListItemWithImage
          faIcon={true}
          iconName="bitcoin"
          content="From Crypto Wallet"
        />
        <ListItemWithImage
          faIcon={true}
          iconName="credit-card-alt"
          content="Visa or Mastercard"
          onPress={() => {
            props.navigation.navigate('ProfileAddCardScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const ProfileAddCardScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleName = res => {
    setName(res);
  };
  const handleNumber = res => {
    setNumber(res);
  };
  const handleinput = res => {};
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Add new card"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text />
      <View style={styles(theme).listContainer}>
        <AmountInput
          width={'100%'}
          caption={`Card Holder Name ${'\n'}`}
          placeholder="John Smith"
          val={''}
          onChange={handleName}
          backgroundColor={theme.colors.background_secondary}
        />
        <Text />
        <AmountInput
          width={'100%'}
          caption={`Card Number ${'\n'}`}
          placeholder="0000 0000 0000 0000"
          val={number.toString()}
          onChange={handleNumber}
          numbertype
          backgroundColor={theme.colors.background_secondary}
        />
        <Text />
        <View style={styles(theme).flexRow}>
          <AmountInput
            width={'47%'}
            caption={`Expiry Date ${'\n'}`}
            placeholder="00/00"
            val={''}
            onChange={handleinput}
            numbertype
            backgroundColor={theme.colors.background_secondary}
          />
          <AmountInput
            width={'47%'}
            caption={`CCV ${'\n'}`}
            placeholder="000"
            val={''}
            onChange={handleinput}
            numbertype
            backgroundColor={theme.colors.background_secondary}
          />
        </View>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Add"
          onPress={() => {
            props.navigation.navigate('ProfileCardListScreen', {
              name: name,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const ProfileCardListScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const name = props.route.params.name;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Add new card"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).listContainer}>
        <ListItemWithImage
          faIcon={true}
          iconName="cc-visa"
          content={`${name} Visa Card`}
          fontSize={16}
          onPress={() => {
            props.navigation.navigate('ProfileDepositAmountScreen');
          }}
          rightIcon="check"
        />
        <View style={styles(theme).addCardList}>
          <Text style={styles(theme).addText}>Add More</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ProfileAddCardScreen');
            }}>
            <AntDesign
              name="pluscircleo"
              size={24}
              color={theme.colors.text_primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export const ProfileDepositAmountScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [amount, setAmount] = useState(0);
  const handleAmount = res => {
    setAmount(res);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title=""
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <Text style={styles(theme).headingText}>Amount</Text>
        <AmountInput
          caption=""
          backgroundColor={theme.colors.background_secondary}
          textColor={theme.colors.text_primary}
          val={''}
          onChange={handleAmount}
          placeholder="$200"
          numbertype={true}
        />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Submit"
          onPress={() => {
            props.navigation.navigate('ProfileDepositConfirmScreen', {
              amount: amount,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const ProfileDepositConfirmScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const amount = props.route.params.amount;
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title=""
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{...styles(theme).inputBox, marginTop: 16}}>
        <Text
          style={{
            ...styles(theme).headingText,
            fontSize: 22,
            marginBottom: 100,
          }}>
          Review your transaction
        </Text>
        <AmountInput
          caption=""
          backgroundColor={theme.colors.background_secondary}
          textColor={theme.colors.text_primary}
          val={`$${amount}`}
          disabled={true}
          placeholder=""
          numbertype={true}
        />
        <Text />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={{...styles(theme).label, marginBottom: 16}}>
          A 3% VISA Free Will Be Charged
        </Text>
        <Text style={styles(theme).text}>From Your Visa Card</Text>
        <Text style={styles(theme).label}>To</Text>
        <Text style={styles(theme).text}>B-Square Account</Text>
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Deposit"
          onPress={() => {
            dispatch(updateUserBalance(Number(amount)));
            updateUserInfo(userInfo.userId, {
              account_balance: Number(amount),
            }).then(() => {
              props.navigation.navigate('Profile');
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default ProfileHomeScreen;

const styles = theme =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    chartContainer: {
      marginHorizontal: 16,
      marginVertical: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      marginHorizontal: 16,
      marginVertical: 16,
    },
    profileImage: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 16,
      marginTop: 12,
    },
    btnContainer: {
      marginVertical: 32,
      width: wp('50%'),
      alignSelf: 'center',
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
    addCardList: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background_third,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    addText: {
      fontWeight: '400',
      fontSize: 16,
      color: theme.colors.text_primary,
    },
    inputBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
    },
    continueBtn: {
      alignItems: 'center',
      paddingHorizontal: 16,
      position: 'absolute',
      bottom: -30,
      width: '100%',
    },
    headingText: {
      color: theme.colors.text_primary,
      fontSize: 30,
      fontWeight: '700',
      marginBottom: 32,
    },
    label: {
      color: theme.colors.text_secondary,
      alignSelf: 'center',
      fontSize: 13,
      fontWeight: '400',
    },
    text: {
      color: theme.colors.text_primary,
      alignSelf: 'center',
      fontSize: 18,
      fontWeight: '700',
      marginVertical: 32,
    },
  });
