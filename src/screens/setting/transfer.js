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
  TextInput,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

//custom components
import {NavigationHeader} from '../../components/Headers';
import {SectionTitle} from '../../components/SectionTitle';
import {BorderedButton, ContinueBottomBtn} from '../../components/BubbleButton';
import {AmountInput} from '../../components/Inputs';
import {
  TouchableBorderedWrapper,
  FlexRowWrapper,
  FlexBetweenWrapper,
} from '../../components/Wrapper';
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
export const ProfileTransferScreen = props => {
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
        iconHidden="true"
      />
      <SectionTitle
        title="Transfers"
        color={theme.colors.text_primary}
        fontSize={34}
      />
      <Text />
      <View style={styles(theme).listContainer}>
        <ListItemWithImage
          faIcon={true}
          iconName="bank"
          content="My Account in a Different Bank"
          onPress={() => {
            props.navigation.navigate('BankTransferScreen');
          }}
        />
        <ListItemWithImage
          faIcon={true}
          iconName="bitcoin"
          content="Crypto Wallet Trasfer"
        />
        <ListItemWithImage
          faIcon={true}
          iconName="credit-card-alt"
          content="Transfer to a Local Bank"
          onPress={() => {
            props.navigation.navigate('ProfileAddCardScreen');
          }}
        />
        <ListItemWithImage
          faIcon={false}
          iconName="globe"
          content="International Transfer"
          onPress={() => {
            props.navigation.navigate('ProfileAddCardScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BankTransferScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [bankId, setBankId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const banks = [
    {name: 'Citi Bank', image: require('../../assets/images/citi_bank.png')},
    {
      name: 'Bank of America',
      image: require('../../assets/images/america_bank.png'),
    },
    {name: 'HSBC', image: require('../../assets/images/hsbc.png')},
  ];
  const [amount, setAmount] = useState(0);
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
        iconHidden="true"
      />
      <Text />
      <View style={styles(theme).listContainer}>
        <Text style={styles(theme).inputLabel}>Choose bank</Text>
        <TouchableBorderedWrapper onPress={() => {}}>
          <FlexBetweenWrapper style={{margin: 12}}>
            <FlexRowWrapper>
              <Image
                source={banks[bankId].image}
                style={{width: 32, height: 32}}
              />
              <Text style={styles(theme).bankLabel}>{banks[bankId].name}</Text>
            </FlexRowWrapper>
            <AntDesign
              name={openModal ? 'up' : 'down'}
              color={theme.colors.text_secondary}
              size={12}
            />
          </FlexBetweenWrapper>
        </TouchableBorderedWrapper>
        <Text />
        <Text style={styles(theme).inputLabel}>Amount</Text>
        <TextInput
          style={styles(theme).amountInput}
          keyboardType="number-pad"
          onChange
        />
      </View>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    listContainer: {
      marginHorizontal: 16,
      marginVertical: 16,
    },
    inputLabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      marginVertical: 8,
    },
    bankLabel: {
      color: theme.colors.text_primary,
      fontSize: 22,
      marginLeft: 16,
    },
    amountInput: {
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
      width: '40%',
      textAlign: 'center',
      fontSize: 22,
      color: theme.colors.text_primary,
    },
  });
