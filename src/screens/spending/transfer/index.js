import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import LottieView from 'lottie-react-native';

//custom components
import {NavigationHeader} from '../../../components/Headers';
import {SectionTitle, SmallLine} from '../../../components/SectionTitle';
import {AmountInput} from '../../../components/Inputs';
import {ContinueBottomBtn} from '../../../components/BubbleButton';
import {
  ListItemWithImage,
  ListItemWithSwitch,
} from '../../../components/ListItem';
//custom styles
import {investmentStyles} from '../../../styles/investment';
import {updateUserInfo} from '../../../utils/firestoreapi';
import {updateUserBalance} from '../../../redux/slices/portfolioSlice';

export const TransferChoiceScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Transfer"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Transfers"
        color={theme.colors.text_primary}
        fontSize={30}
      />
      <View style={styles(theme).transferOptions}>
        <ListItemWithImage
          faIcon={true}
          iconName="bank"
          content="My Account In a Different Bank"
        />
        <ListItemWithImage
          faIcon={true}
          iconName="bitcoin"
          content="Crypto Wallet Transfer"
        />
        <ListItemWithImage
          faIcon={true}
          iconName="money"
          content="Transfer to a Local Bank"
        />
        <ListItemWithImage
          faIcon={false}
          iconName="globe"
          content="International Transfer"
        />
      </View>
      <View style={styles(theme).transferInfo}>
        <SmallLine
          bottomBorder
          borderColor={theme.colors.background_third}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          paddingVertical={18}
          title="CASH MANAGEMENT"
          value=""
        />
        <ListItemWithSwitch isOn={false} content="Show Account Number" />
        <ListItemWithSwitch isOn={true} content="Lock Withdraws" />
      </View>
    </SafeAreaView>
  );
};

export const WithdrawScreen = props => {
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
        title="Withdrawl Amount"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <AmountInput
          caption=""
          backgroundColor={theme.colors.background_secondary}
          textColor={theme.colors.text_primary}
          val={3000}
          onChange={handleAmount}
        />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Submit"
          onPress={() => {
            props.navigation.navigate('WithdrawComplete', {
              amount: Number(amount),
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const WithdrawCompleteScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const anims = [
    require('../../../assets/animations/piggy_tap1.json'),
    require('../../../assets/animations/piggy_tap1.json'),
    require('../../../assets/animations/piggy_tap2.json'),
    require('../../../assets/animations/piggy_tap3.json'),
  ];
  const [animation, setAnimation] = useState();
  const [animId, setAnimId] = useState(0);
  const handleAnimation = () => {
    if (animId >= 3) {
      setTimeout(() => {
        props.navigation.navigate('SpendingHomeScreen');
      }, 1000);
    } else {
      setAnimId(animId + 1);
      animation.play();
    }
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
      <View style={styles(theme).animView}>
        <LottieView
          ref={animation => {
            setAnimation(animation);
          }}
          source={anims[animId]}
          loop={false}
          style={{alignSelf: 'center'}}
        />
      </View>
      <View style={styles(theme).tapScreenBtn}>
        <TouchableOpacity
          style={styles(theme).tapBtn}
          onPress={handleAnimation}>
          <Text
            style={{
              color: theme.colors.text_primary,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Tap Three Times To Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const DepositInterestAccountScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const [amount, setAmount] = useState('');
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
        title="Add to Interest Account"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).paddingHor16}>
        <SmallLine
          bottomBorder
          borderColor={theme.colors.text_secondary}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Payment"
          value="Monthly"
        />
        <SmallLine
          bottomBorder
          borderColor={theme.colors.text_secondary}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Next Pay Date"
          value="Dec 12, 2021"
        />
        <View style={styles(theme).twoCols}>
          <SmallLine
            bottomBorder
            borderColor={theme.colors.text_secondary}
            titleColor={theme.colors.text_secondary}
            valueColor={theme.colors.text_primary}
            title="APY"
            value="1.8%"
            width="45%"
          />
          <SmallLine
            bottomBorder
            borderColor={theme.colors.text_secondary}
            titleColor={theme.colors.text_secondary}
            valueColor={theme.colors.text_primary}
            title="Withdraw"
            value="Anytime"
            width="45%"
          />
        </View>
      </View>
      <View style={{...styles(theme).inputBox, marginTop: 16}}>
        <AmountInput
          caption=""
          backgroundColor={theme.colors.background_secondary}
          textColor={theme.colors.text_primary}
          val={amount.toString()}
          onChange={handleAmount}
        />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Submit"
          onPress={() => {
            updateUserInfo(userInfo.userId, {
              account_balance: userInfo.account_balance - Number(amount),
            }).then(() => {
              dispatch(
                updateUserBalance(userInfo.account_balance - Number(amount)),
              );
              props.navigation.navigate('DepositInterestAccountComplete', {
                amount: Number(amount),
              });
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const DepositInterestAccountComplete = props => {
  const theme = useContext(ThemeContext).theme;
  const amount = props.route.params.amount;
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('SpendingHomeScreen');
    }, 5000);
  }, []);
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
      <View style={styles(theme).animView}>
        <LottieView
          source={require('../../../assets/animations/piggy.json')}
          autoPlay
          loop={false}
          style={{alignSelf: 'center'}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    transferOptions: {
      marginHorizontal: 16,
      marginTop: 20,
    },
    transferInfo: {
      marginHorizontal: 16,
      marginTop: 24,
    },
    inputBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 140,
    },
    continueBtn: {
      alignItems: 'center',
      paddingHorizontal: 16,
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    animView: {
      height: '90%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paddingHor16: {
      paddingHorizontal: 16,
      marginTop: 16,
    },
    twoCols: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tapScreenBtn: {
      position: 'absolute',
      bottom: 0,
      height: 100,
      width: '100%',
    },
    tapBtn: {
      backgroundColor: theme.colors.green,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
