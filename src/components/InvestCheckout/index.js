import React, {useState, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {Paragraph} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
//custom components
import {CloseButton, ContinueBottomBtn} from '../../components/BubbleButton';
import {CheckMarker} from '../../components/Gadgets';
import {ProductHorizon, ProductVertical} from '../Card/products';
import {DropdownSelect, AmountInput} from '../Inputs';

import {updatePortfolio, updateUserInfo} from '../../utils/firestoreapi';
import {
  setPurchaseStore,
  updateUserBalance,
  setCryptoPortfolio,
  setStockPortfolio,
  setIdeaPortfolio,
} from '../../redux/slices/portfolioSlice';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import {colors, measures} from '../../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const RatingStoryPopup = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: colors.sheetBackColor,
        },
        draggableIcon: {
          backgroundColor: theme.colors.background_secondary,
        },
        container: globalStyles.tradingStoryPanel,
      }}
      height={hp('80%')}>
      <Text
        style={{
          fontSize: 22,
          color: theme.colors.text_primary,
          fontWeight: '700',
          marginTop: 20,
        }}>
        Libero
      </Text>
      <ScrollView>
        <Paragraph style={{color: theme.colors.text_primary}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat
          convallis sed in venenatis lectus pharetra, auctor accumsan. Dolor
          felis et nulla tempor urna, nunc maecenas non amet. Nisl sagittis,
          tellus hendrerit rhoncus, dui cursus convallis dignissim. Risus nulla
          elementum eu nibh aenean. Odio pharetra vitae adipiscing adipiscing
          risus eget. Risus et risus cursus erat. Congue porttitor rhoncus quam
          sed lacus. Aliquet leo eget lacinia vel turpis elit at odio. Et,
          gravida magna pulvinar eget porttitor dignissim risus facilisis quis.
          Mattis interdum elit vitae amet. Faucibus auctor massa sed in ultrices
          ultrices tellus lectus habitasse. Proin fringilla vitae justo, orci,
          convallis porttitor accumsan a. Pulvinar eget quis id leo leo auctor
          amet. Etiam dui enim non tellus, id est elit eu. Vel tellus in leo
          vitae, amet. Pellentesque consequat feugiat scelerisque sit
          consectetur fames. Parturient auctor facilisi dui at in non proin
          dolor, pulvinar. Ipsum eu pretium eget est eu. Pharetra, platea tortor
          malesuada ipsum urna cum.{' '}
        </Paragraph>
      </ScrollView>
      <TouchableOpacity
        style={investmentStyles.dismissBtn}
        onPress={() => props.parentRef.current.close()}>
        <Text style={investmentStyles.midText}>Dismiss</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};
const images = {
  AAPL: require('../../assets/images/AAPL.png'),
  AMZN: require('../../assets/images/AMZN.png'),
  TSLA: require('../../assets/images/TSLA.png'),
  MSFT: require('../../assets/images/MSFT.png'),
};
export const TradingCheckoutFirst = props => {
  const purchaseStore = useSelector(state => state.portfolios.purchaseStore);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext).theme;
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
      }}
      height={hp('100%')}>
      <LinearGradient
        colors={['rgba(0, 0,0, 0.5)', 'rgba(0, 0, 0, 0.9)']}
        style={[globalStyles.f1, {justifyContent: 'flex-end'}]}>
        <View
          style={{
            flexDirection: 'column',
            flexWrap: 'wrap-reverse',
            marginBottom: 28,
          }}>
          <TouchableOpacity
            style={[
              globalStyles.tradeBuyBtn,
              globalStyles.w5,
              globalStyles.mb16,
              {backgroundColor: colors.redColor},
            ]}
            onPress={() => {
              dispatch(
                setPurchaseStore({id: '', amount: 0, quantity: 0, buy: 0}),
              );
              props.sellRef.current.open();
            }}>
            <Text style={[investmentStyles.midText, globalStyles.bold]}>
              Sell
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.tradeBuyBtn,
              globalStyles.w5,
              globalStyles.mb16,
            ]}
            onPress={() => {
              dispatch(
                setPurchaseStore({id: '', amount: 0, quantity: 0, buy: 1}),
              );
              props.buyRef.current.open();
              props.parentRef.current.close();
            }}>
            <Text style={[investmentStyles.midText, globalStyles.bold]}>
              Buy
            </Text>
          </TouchableOpacity>
          <View style={[globalStyles.tradeCancelBtn, globalStyles.mb16]}>
            <View style={[globalStyles.f1, {justifyContent: 'center'}]}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  marginBottom: 6,
                  color: theme.colors.text_primary,
                }}>
                Today’s Volume
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: theme.colors.text_primary,
                }}>
                {props.volume ? props.volume : '54, 381, 175'}
              </Text>
            </View>
            <TouchableOpacity
              // style={[globalStyles.greenBorder]}
              style={[globalStyles.buyCancelGreenBtn]}
              onPress={() => {
                props.parentRef.current.close();
              }}>
              <Icon name="x" size={28} color={colors.greenColor} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </RBSheet>
  );
};

export const TradingCheckoutOrder = props => {
  const theme = useContext(ThemeContext).theme;
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const purchaseStore = useSelector(state => state.portfolios.purchaseStore);
  const dispatch = useDispatch();
  const [qty1, setQty1] = useState('');
  const [amount, setAmount] = useState(0);
  const [qty, setQty] = useState(0);
  console.log(props.item);
  const handleAmount = res => {
    setQty(Number(res));
    console.log(res);
    setAmount(Number(res * props.item.price));
  };
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: theme.colors.background_primary,
        },
        draggableIcon: {
          backgroundColor: theme.colors.background_primary,
        },
        container: {
          ...globalStyles.tradingStoryPanel,
          backgroundColor: theme.colors.background_primary,
        },
      }}
      height={hp('100%')}>
      <CloseButton
        onPress={() => {
          props.parentRef.current.close();
        }}
      />
      <Text
        style={[
          globalStyles.labelB,
          {alignSelf: 'center', color: theme.colors.text_primary},
        ]}>
        Buy
      </Text>
      <View
        style={[
          globalStyles.flexDR,
          globalStyles.justifySB,
          globalStyles.mvn,
          globalStyles.alc,
        ]}>
        <ProductHorizon
          coinImage={props.item.image ? props.item.image : 0}
          imageWidth={props.imageWidth ? props.imageWidth : 45}
          coinName={props.item.name}
          coinLabel={props.item.label}
        />
        <Text
          style={{...globalStyles.labelB, color: theme.colors.text_primary}}>
          ${props.item.price ? props.item.price.toFixed(2) : 3000}
        </Text>
      </View>
      <DropdownSelect />
      <View
        style={[
          globalStyles.flexDR,
          globalStyles.justifySB,
          {marginTop: measures.side},
        ]}>
        <AmountInput
          backgroundColor={theme.colors.background_secondary}
          caption="Number Of Shares"
          val={qty}
          onChange={handleAmount}
          placeholder="0.00"
          numbertype
        />
        <AmountInput
          backgroundColor={theme.colors.background_secondary}
          caption="Amount"
          disabled
          val={amount.toFixed(4)}
          onChange={() => {}}
        />
      </View>
      <Text
        style={[
          globalStyles.alsc,
          globalStyles.labeln,
          {marginVertical: measures.side},
        ]}>
        ${userInfo.account_balance} available
      </Text>
      <Text
        style={[
          globalStyles.alsc,
          globalStyles.labeln,
          {marginVertical: measures.side},
        ]}>
        Fees: $300
      </Text>
      <ContinueBottomBtn
        content="Review"
        onPress={() => {
          dispatch(
            setPurchaseStore({
              id: props.item.id,
              amount: Number(amount),
              quantity: Number(qty),
              category: props.item.category ? props.item.category : 1,
              buy: 1,
            }),
          );
          props.reviewRef.current.open();
          props.parentRef.current.close();
        }}
      />
    </RBSheet>
  );
};

export const TradingReceipt = props => {
  const theme = useContext(ThemeContext).theme;
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const purchaseStore = useSelector(state => state.portfolios.purchaseStore);
  const portfolio = {
    crypto: useSelector(state => state.portfolios.cryptoPortfolio),
    stock: useSelector(state => state.portfolios.stockPortfolio),
    idea: useSelector(state => state.portfolios.ideaPortfolio),
  };
  console.log(purchaseStore);
  const dispatch = useDispatch();
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.7)',
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
        container: {
          ...globalStyles.tradingStoryPanel,
          backgroundColor: theme.colors.background_primary,
        },
      }}
      height={hp('100%')}>
      <Text
        style={[
          globalStyles.labelM,
          {alignSelf: 'center', color: theme.colors.text_primary},
        ]}>
        Receipt
      </Text>

      <ProductVertical
        coinImage={props.item.image ? props.item.image : 0}
        imageWidth={props.imageWidth ? props.imageWidth : 64}
        marginTop={72}
        coinName={props.item.name}
        coinLabel={props.item.label}
      />
      <Text
        style={[
          globalStyles.labelM,
          {
            alignSelf: 'center',
            color: colors.greenColor,
            marginTop: 32,
            marginBottom: 16,
          },
        ]}>
        ${purchaseStore.amount.toFixed(4)}
      </Text>
      <Text
        style={[
          globalStyles.labelB,
          globalStyles.alsc,
          {color: theme.colors.text_primary},
        ]}>
        {purchaseStore.quantity} Coins
      </Text>
      <Text
        style={{
          ...globalStyles.labell,
          color: colors.tm,
          alignSelf: 'center',
          marginTop: 160,
        }}>
        Fees: $0.125
      </Text>

      <ContinueBottomBtn
        content="Continue"
        onPress={() => {
          if (props.type == 'crypto') {
            updatePortfolio(userInfo.userId, 'crypto-portfolio', [
              ...portfolio[props.type],
              {
                amount: Number(purchaseStore.quantity),
                coin_id: purchaseStore.id,
              },
            ]);
            dispatch(
              setCryptoPortfolio([
                ...portfolio[props.type],
                {
                  amount: Number(purchaseStore.quantity),
                  coin_id: purchaseStore.id,
                },
              ]),
            );
          } else if (props.type == 'stock') {
            updatePortfolio(userInfo.userId, 'stock-portfolio', [
              ...portfolio[props.type],
              {
                amount: Number(purchaseStore.quantity),
                stock_id: purchaseStore.id,
              },
            ]);
            dispatch(
              setStockPortfolio([
                ...portfolio[props.type],
                {
                  amount: Number(purchaseStore.quantity),
                  stock_id: purchaseStore.id,
                },
              ]),
            );
          } else if (props.type == 'idea') {
            updatePortfolio(userInfo.userId, 'idea-portfolio', [
              ...portfolio[props.type],
              {
                amount: Number(purchaseStore.quantity),
                idea_id: purchaseStore.id,
                type: purchaseStore.category,
              },
            ]);
            dispatch(
              setIdeaPortfolio([
                ...portfolio[props.type],
                {
                  amount: Number(purchaseStore.quantity),
                  idea_id: purchaseStore.id,
                  type: purchaseStore.category,
                },
              ]),
            );
          }
          updateUserInfo(userInfo.userId, {
            account_balance: userInfo.account_balance - purchaseStore.amount,
          }).then(() => {
            dispatch(
              updateUserBalance(
                userInfo.account_balance - purchaseStore.amount,
              ),
            );
            props.completeRef.current.open();
            props.parentRef.current.close();
          });
        }}
      />
    </RBSheet>
  );
};

export const PurchaseComplete = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.7)',
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
        container: {
          ...globalStyles.tradingStoryPanel,
          backgroundColor: theme.colors.background_primary,
        },
      }}
      height={hp('100%')}>
      <LottieView
        source={require('../../assets/animations/congrats.json')}
        autoPlay
        style={{
          height: 400,
          width: '100%',
          alignSelf: 'center',
          position: 'absolute',
          top: -50,
          zIndex: 3,
        }}
      />
      <CheckMarker
        backgroundColor={colors.greenColor}
        absolute
        marginTop="45%"
        width={95}
        height={95}
        iconStyle={{
          name: 'check',
          size: 45,
          color: '#FFF',
        }}
      />
      <Text
        style={[
          globalStyles.labelB,
          {
            alignSelf: 'center',
            color: colors.greenColor,
            marginTop: 32,
            marginBottom: 16,
          },
        ]}>
        Congratulations {'\n'}
        On Your Purchase
      </Text>

      <ContinueBottomBtn
        content={props.bottomCaption}
        onPress={() => {
          props.parentRef.current.close();
        }}
      />
    </RBSheet>
  );
};
