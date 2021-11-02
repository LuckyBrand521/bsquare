import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

//custom components
import {CreditCard} from '../../../components/Card/creditcard';
import {CardTemplateGallery} from '../../../components/ImageGallery';
import {NavigationHeader} from '../../../components/Headers';
import {SectionTitle, SmallLine} from '../../../components/SectionTitle';
import {DropdownSelect, AmountInput} from '../../../components/Inputs';
import {
  BorderedButton,
  ContinueBottomBtn,
} from '../../../components/BubbleButton';
import {
  ListItemWithImage,
  ListItemWithSwitch,
} from '../../../components/ListItem';
//custom styles
import {investmentStyles} from '../../../styles/investment';

const tempplateColors = ['#5EB330', '#2A2E3B', '#C55739'];

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
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    transferOptions: {
      marginHorizontal: 16,
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
  });
