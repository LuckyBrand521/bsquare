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
import {DropdownSelect} from '../../components/Inputs';
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
          onPress={() => {
            props.navigation.navigate('CryptoTransferScreen');
          }}
        />
        <ListItemWithImage
          faIcon={true}
          iconName="credit-card-alt"
          content="Transfer to a Local Bank"
          onPress={() => {
            props.navigation.navigate('LocalBankTransferScreen');
          }}
        />
        <ListItemWithImage
          faIcon={false}
          iconName="globe"
          content="International Transfer"
          onPress={() => {
            props.navigation.navigate('LocalBankTransferScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const PriceBtn = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity style={styles(theme).priceBtn} onPress={props.onPress}>
      <Text style={styles(theme).priceBtnLabel}>{props.value}</Text>
    </TouchableOpacity>
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
  const [amount, setAmount] = useState('');
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
          onChangeText={res => {
            console.log(res);
            setAmount(res);
          }}
          value={amount}
        />
        <Text />
        <FlexRowWrapper>
          <PriceBtn
            value="$10"
            onPress={() => {
              setAmount('10');
            }}
          />
          <PriceBtn
            value="$50"
            onPress={() => {
              setAmount('50');
            }}
          />
          <PriceBtn
            value="$100"
            onPress={() => {
              setAmount('100');
            }}
          />
        </FlexRowWrapper>
        <Text style={styles(theme).centerLabel}>$10,200 available</Text>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Submit"
          onPress={() => {
            props.navigation.navigate('TransferConfirmScreen', {
              amount: '$' + amount,
              dest: 'My Account Citi Bank',
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const TransferConfirmScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const amount = props.route.params.amount;
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
          val={`${amount}`}
          disabled={true}
          placeholder=""
          numbertype={true}
        />
        <Text />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles(theme).text}>From my B-Squared Account</Text>
        <Text style={styles(theme).label}>To</Text>
        <Text style={styles(theme).text}>{props.route.params.dest}</Text>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Transfer"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export const CryptoTransferScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [beneficiaryId, setBeneficiaryId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const contacts = [
    {name: 'Bill Gates'},
    {
      name: 'Steve Jobs',
    },
    {name: 'Bob Adams'},
  ];
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Crypto Wallet Transfer"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden="true"
      />
      <Text />
      <View style={styles(theme).listContainer}>
        <Text style={styles(theme).inputLabel}>Choose Beneficiary</Text>
        <TouchableBorderedWrapper onPress={() => {}}>
          <FlexBetweenWrapper style={{margin: 12}}>
            <Text style={styles(theme).bankLabel}>
              {contacts[beneficiaryId].name}
            </Text>
            <AntDesign
              name={openModal ? 'up' : 'down'}
              color={theme.colors.text_secondary}
              size={12}
            />
          </FlexBetweenWrapper>
        </TouchableBorderedWrapper>
        <Text />
        <Text style={styles(theme).inputLabel}>Pay With</Text>
        <DropdownSelect
          data={[
            {label: 'ETH', value: 'eth'},
            {label: 'BTC', value: 'btc'},
          ]}
        />
        <Text />
        <Text style={styles(theme).inputLabel}>Amount</Text>
        <FlexBetweenWrapper style={{margin: 2}}>
          <TextInput
            style={styles(theme).amountInput}
            keyboardType="number-pad"
            onChangeText={res => {
              console.log(res);
              setAmount(res);
            }}
            value={amount}
          />
          <TextInput
            style={styles(theme).amountInput}
            value={'$' + (Number(amount) * 3951.4).toString()}
            editable={false}
          />
        </FlexBetweenWrapper>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Submit"
          onPress={() => {
            props.navigation.navigate('TransferConfirmScreen', {
              amount: amount,
              dest: contacts[beneficiaryId].name,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const LocalBankTransferScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [beneficiaryId, setBeneficiaryId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const contacts = [
    {name: 'Bill Gates'},
    {
      name: 'Steve Jobs',
    },
    {name: 'Bob Adams'},
  ];
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Crypto Wallet Transfer"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden="true"
      />
      <Text />
      <View style={styles(theme).listContainer}>
        <Text style={styles(theme).inputLabel}>Choose Beneficiary</Text>
        <TouchableBorderedWrapper onPress={() => {}}>
          <FlexBetweenWrapper style={{margin: 12}}>
            <Text style={styles(theme).bankLabel}>
              {contacts[beneficiaryId].name}
            </Text>
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
          onChangeText={res => {
            console.log(res);
            setAmount(res);
          }}
          value={amount}
        />
        <Text />
        <FlexRowWrapper>
          <PriceBtn
            value="$10"
            onPress={() => {
              setAmount('10');
            }}
          />
          <PriceBtn
            value="$50"
            onPress={() => {
              setAmount('50');
            }}
          />
          <PriceBtn
            value="$100"
            onPress={() => {
              setAmount('100');
            }}
          />
        </FlexRowWrapper>
        <Text style={styles(theme).centerLabel}>$10,200 available</Text>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Submit"
          onPress={() => {
            props.navigation.navigate('TransferConfirmScreen', {
              amount: amount,
              dest: contacts[beneficiaryId].name,
            });
          }}
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
    inputBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
    },
    bankLabel: {
      color: theme.colors.text_primary,
      fontSize: 22,
      marginLeft: 16,
    },
    amountInput: {
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
      width: '45%',
      textAlign: 'center',
      fontSize: 22,
      color: theme.colors.text_primary,
    },
    priceBtn: {
      borderRadius: 30,
      borderWidth: 1,
      borderColor: theme.colors.text_secondary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 12,
    },
    priceBtnLabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
    },
    centerLabel: {
      fontSize: 13,
      color: theme.colors.text_secondary,
      alignSelf: 'center',
      marginTop: '10%',
    },
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
  });
