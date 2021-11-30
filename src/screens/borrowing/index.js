import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

//custom components
import {
  NavigationHeader,
  NavigationProgressHeader,
} from '../../components/Headers';
import {
  SectionTitle,
  SmallLine,
  TwoColSmallLine,
} from '../../components/SectionTitle';
import {ThemeContext} from 'react-native-elements';
import {BorderedButton} from '../../components/BubbleButton';
import {AmountInput, DropdownSelect} from '../../components/Inputs';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {updateUserInfo} from '../../utils/firestoreapi';
import {updateUserBalance} from '../../redux/slices/portfolioSlice';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//data source
const primaryDetails = [
  {title: 'Residual Intrest (USDT)', value: '0.00208'},
  {title: 'Remaining Principal (USDT)', value: '100.00'},
  {title: 'Expiration Time(Loan Term)', value: '3/8/2021 19:59 (7 days)'},
];
const details = [
  {title: 'Hourly interest', value: '0.0020%'},
  {title: 'Accrued interest period', value: '1 hour'},
  {title: 'Date Borrow', value: '27/7/2021 20:15'},
  {title: 'Liquidation LTV', value: '83%'},
  {title: 'To Liquidation price', value: '27.7%'},
  {title: 'Liquidation price(ADA/USDT)', value: '0.9163%'},
  {title: 'Order ID', value: '654916549519'},
];
export const BorrowingHomeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    if (props.route.params?.show) {
      setShow(true);
    }
  });
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
        <View style={styles(theme).greenContainer}>
          <SectionTitle
            title="Ongoing Loans"
            color={theme.colors.text_secondary}
            fontSize={22}
          />
          {show && (
            <View style={styles(theme).mh16}>
              <TwoColSmallLine
                titles={['Total debt (USDT)', 'LTV']}
                values={['100', '60%']}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                valueSize={16}
                paddingVertical={12}
              />
              <TwoColSmallLine
                titles={['Collateral Amount (USDT)', '']}
                values={['131.49', '']}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                valueSize={16}
                paddingVertical={12}
              />
              {primaryDetails.map((item, index) => {
                return (
                  <SmallLine
                    key={index}
                    title={item.title}
                    value={item.value}
                    normal
                    bottomBorder
                    borderColor={theme.colors.background_tertiary}
                    titleColor={theme.colors.text_secondary}
                    valueColor={theme.colors.text_primary}
                    paddingVertical={12}
                  />
                );
              })}
              {expanded && (
                <View>
                  {details.map((item, index) => {
                    return (
                      <SmallLine
                        key={index}
                        title={item.title}
                        value={item.value}
                        normal
                        bottomBorder
                        borderColor={theme.colors.background_tertiary}
                        titleColor={theme.colors.text_secondary}
                        valueColor={theme.colors.text_primary}
                        paddingVertical={12}
                      />
                    );
                  })}
                </View>
              )}
              <TouchableOpacity
                style={styles(theme).viewMore}
                onPress={() => {
                  handleExpand();
                }}>
                <Text style={styles(theme).green}>
                  {expanded ? 'View less' : 'View more'}
                </Text>
              </TouchableOpacity>
              <BorderedButton
                borderColor={theme.colors.background_third}
                captionColor={theme.colors.text_primary}
                caption="Repay"
                marginTop={16}
                onPress={() => {
                  props.navigation.navigate('BorrowingRepayScreen');
                }}
              />
            </View>
          )}
        </View>
        <View style={styles(theme).mh16}>
          <BorderedButton
            borderColor={theme.colors.green}
            captionColor={theme.colors.text_primary}
            backgroundColor={theme.colors.green}
            caption="Borrow"
            marginTop={16}
            onPress={() => {
              props.navigation.navigate('BorrowingStep1Screen');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const BorrowingRepayScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const repayDetails = [
    {title: 'Interest Repaid', value: '0.00416 USDT'},
    {title: 'Principal Repaid', value: '99.995834'},
    {title: 'Total Repayment', value: '100.0000'},
    {title: 'LTV after Repayment', value: '0.05%'},
    {title: 'Returned Collateral Amount', value: '124.912471 ADA'},
  ];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title={'Repay'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Repay"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).mh16}>
        <View style={styles(theme).mh16}>
          <TwoColSmallLine
            titles={['Repayment amount', 'MAX']}
            values={['100.0000', 'USDT']}
            normal
            bottomBorder
            borderColor={theme.colors.background_tertiary}
            titleColor={theme.colors.text_secondary}
            valueColor={theme.colors.text_primary}
            valueSize={16}
            paddingVertical={12}
          />
          <TwoColSmallLine
            titles={['Total debt', 'Your free asset:']}
            values={['100.004166 USDT', '100.0000 USDT']}
            normal
            bottomBorder
            borderColor={theme.colors.background_tertiary}
            titleColor={theme.colors.text_secondary}
            valueColor={theme.colors.text_primary}
            valueSize={16}
            paddingVertical={12}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <DropdownSelect
            data={[
              {label: '25%', value: '25'},
              {label: '50%', value: '50'},
              {label: '75%', value: '75'},
              {label: '100%', value: '100'},
            ]}
          />
        </View>
        <View style={styles(theme).mh16}>
          {repayDetails.map((item, index) => {
            return (
              <SmallLine
                key={index}
                title={item.title}
                value={item.value}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                paddingVertical={12}
              />
            );
          })}
        </View>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Confirm Repayment"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BorrowingStep1Screen = props => {
  const theme = useContext(ThemeContext).theme;
  const item = {name: ''};
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={1}
        total={6}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <Text style={{...styles(theme).headingText, textAlign: 'center'}}>
          What would you like {'\n'}to borrow?
        </Text>
      </View>
      <View style={styles(theme).confirmBtns}>
        <BorderedButton
          captionColor={theme.colors.text_primary}
          borderColor={theme.colors.background_third}
          caption="USD Coin"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BorrowingStep2Screen', {
              item: {name: 'BUSD'},
            });
          }}
        />
        <BorderedButton
          backgroundColor={theme.colors.green}
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          caption="USDT"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('BorrowingStep2Screen', {
              item: {name: 'USDT'},
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BorrowingStep2Screen = props => {
  const theme = useContext(ThemeContext).theme;
  const item = props.route.params.item;
  const [amount, setAmount] = useState(0);
  const rate = 1.325;
  const handleAmount = res => {
    setAmount(res);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={2}
        total={6}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title={`Borrow ${item.name}`}
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).containerType2}>
        <Text style={styles(theme).headingText}>
          How much would you like {'\n'}to borrow?
        </Text>
        <View style={styles(theme).flexRow}>
          <View style={styles(theme).half}>
            <AmountInput
              caption="I want to borrow"
              backgroundColor={theme.colors.background_secondary}
              textColor={theme.colors.text_primary}
              val={''}
              onChange={handleAmount}
              placeholder="$200"
              numbertype={true}
              width={'100%'}
            />
          </View>
          <View style={styles(theme).half}>
            <Text style={styles(theme).labeln}>Collateral Amount</Text>
            <TextInput
              style={styles(theme).dummyLabel}
              value={`${amount * rate}`}
              editable={false}
            />
          </View>
        </View>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Continue"
          onPress={() => {
            props.navigation.navigate('BorrowingStep3Screen', {
              item: {...item, amount: amount, collateral: amount * rate},
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const BorrowingStep3Screen = props => {
  const theme = useContext(ThemeContext).theme;
  const item = props.route.params.item;
  const terms = [
    '7 Days',
    '1 Month',
    '3 Months',
    '6 Months',
    '12 Months',
    '18 Months',
    '24 Months',
  ];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={3}
        total={6}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).containerType2}>
        <Text style={{...styles(theme).headingText, textAlign: 'center'}}>
          Pick out a loan term
        </Text>
        {terms.map((val, index) => {
          return (
            <BorderedButton
              key={index}
              captionColor={theme.colors.text_primary}
              borderColor={theme.colors.background_third}
              caption={val}
              marginTop={16}
              onPress={() => {
                props.navigation.navigate('BorrowingStep4Screen', {
                  item: {...item, term: 6},
                });
              }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export const BorrowingStep4Screen = props => {
  const theme = useContext(ThemeContext).theme;
  const item = props.route.params.item;
  const terms = ['Bitcoin', 'Ethereum', 'ADA'];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={4}
        total={6}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).containerType2}>
        <Text
          style={{
            ...styles(theme).headingText,
            textAlign: 'center',
            marginTop: '10%',
          }}>
          Use your collateral
        </Text>
        {terms.map((val, index) => {
          return (
            <BorderedButton
              key={index}
              captionColor={theme.colors.text_primary}
              borderColor={theme.colors.background_third}
              caption={val}
              marginTop={16}
              onPress={() => {
                props.navigation.navigate('BorrowingStep5Screen', {
                  item: {...item, collateralCoin: terms[index]},
                });
              }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export const BorrowingStep5Screen = props => {
  const theme = useContext(ThemeContext).theme;
  const item = props.route.params.item;
  const termDetails = [
    {
      interestRate: 0,
      rate: 0,
      ltv: 10,
      collateral: 312.529,
      collateralCoin: item.collateralCoin,
    },
    {
      interestRate: 3.95,
      rate: 0.33,
      ltv: 20,
      collateral: 312.529,
      collateralCoin: item.collateralCoin,
    },
    {
      interestRate: 7.75,
      rate: 0.65,
      ltv: 33,
      collateral: 312.529,
      collateralCoin: item.collateralCoin,
    },
    {
      interestRate: 12.8,
      rate: 0.65,
      ltv: 88,
      collateral: 312.529,
      collateralCoin: item.collateralCoin,
    },
  ];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={5}
        total={6}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <SectionTitle
          title={'Choose interest rate'}
          color={theme.colors.text_primary}
          fontSize={22}
        />
        {termDetails.map((val, index) => {
          return (
            <TouchableOpacity
              style={styles(theme).containerType3}
              key={index}
              onPress={() => {
                props.navigation.navigate('BorrowingStep6Screen', {
                  item: {...item, interestRate: val.interestRate},
                });
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: theme.colors.text_primary,
                }}>{`${val.interestRate}% APR`}</Text>
              <SmallLine
                title={'Monthly payment'}
                value={val.rate}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                paddingVertical={12}
              />
              <SmallLine
                title={'Loan-to-value ratio (LTV)'}
                value={`${val.ltv}%`}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                paddingVertical={12}
              />
              <SmallLine
                title={'Collateral needed'}
                value={`${val.collateral.toLocaleString()} ${
                  val.collateralCoin
                }`}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                paddingVertical={12}
              />
            </TouchableOpacity>
          );
        })}
        <Text />
      </ScrollView>
    </SafeAreaView>
  );
};
export const BorrowingStep6Screen = props => {
  const theme = useContext(ThemeContext).theme;
  const item = props.route.params.item;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const resDetails = [
    {
      title: 'Monthly payment',
      value: '$0.33',
    },
    {title: 'Loan terms', value: '7 days'},
    {title: 'Loan-to-value ratio (LTV)', value: '88%'},
    {title: 'Collateral needed', value: '312,529 ADA'},
    {title: 'Expriation time', value: '3/8/2021'},
    {
      title: 'Total Interest amount',
      value: `${(item.amount * item.interestRate) / 100} USDT`,
    },
  ];
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={6}
        total={6}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <Text style={styles(theme).pageTitle}>Here are your loan terms</Text>
        <Text
          style={{
            ...styles(theme).dummyLabel,
            width: '55%',
            alignSelf: 'center',
            paddingVertical: 12,
            marginVertical: 24,
          }}>{`${item.amount} ${item.name}`}</Text>
        <View style={styles(theme).containerType3}>
          {resDetails.map((val, index) => {
            return (
              <SmallLine
                key={index}
                title={val.title}
                value={val.value}
                normal
                bottomBorder
                borderColor={theme.colors.background_tertiary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                paddingVertical={12}
              />
            );
          })}
          <SmallLine
            title={'Repayment Amount'}
            value={`${(item.amount * (1 + item.interestRate / 100)).toFixed(
              2,
            )} ${item.name}`}
            normal
            bottomBorder
            borderColor={theme.colors.background_tertiary}
            titleColor={theme.colors.text_secondary}
            valueColor={theme.colors.text_primary}
            paddingVertical={18}
            titleSize={16}
            valueSize={16}
          />
        </View>
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.text_secondary,
            margin: 16,
          }}>
          By taking out a loan with B Squared, you agree {'\n'}to our Terms of
          Use
        </Text>
      </ScrollView>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Apply"
          onPress={() => {
            updateUserInfo(userInfo.userId, {
              account_balance: userInfo.account_balance + Number(item.amount),
            })
              .then(() => {
                dispatch(
                  updateUserBalance(
                    userInfo.account_balance + Number(item.amount),
                  ),
                );
                props.navigation.navigate('BorrowingHomeScreen', {
                  item: item,
                  show: true,
                });
              })
              .catch(err => {
                console.log(err);
                props.navigation.navigate('BorrowingHomeScreen', {
                  item: item,
                  show: true,
                });
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    greenContainer: {
      marginHorizontal: 16,
      marginVertical: 24,
      paddingVertical: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.green,
    },
    containerType2: {
      marginHorizontal: 16,
      marginTop: hp('3%'),
    },
    pageTitle: {
      alignSelf: 'center',
      fontFamily: 'HelveticaNeueCyr',
      fontSize: 22,
      fontWeight: 'bold',
      paddingVertical: 2,
      color: theme.colors.text_primary,
    },
    containerType3: {
      marginHorizontal: 16,
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    mh16: {
      marginHorizontal: 16,
    },
    viewMore: {
      alignSelf: 'flex-end',
      marginVertical: 16,
    },
    green: {
      color: theme.colors.green,
    },
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
    inputBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
    },
    confirmBtns: {
      marginTop: 40,
      marginHorizontal: 16,
    },
    headingText: {
      color: theme.colors.text_primary,
      fontSize: 22,
      marginBottom: 32,
    },
    smlabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      fontWeight: '400',
      marginVertical: 10,
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    half: {
      width: '45%',
    },
    dummyLabel: {
      color: theme.colors.text_secondary,
      fontSize: 22,
      borderRadius: 10,
      width: '100%',
      backgroundColor: theme.colors.background_secondary,
      textAlign: 'center',
    },
    labeln: {
      fontWeight: '400',
      fontSize: 13,
      color: theme.colors.text_secondary,
      lineHeight: 18,
      marginBottom: 0,
    },
  });
