import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
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
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import {colors, measures} from '../../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const RatingStoryPopup = props => {
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
          backgroundColor: '#fff',
        },
        container: globalStyles.tradingStoryPanel,
      }}
      height={hp('80%')}>
      <Text style={{fontSize: 22, fontWeight: '700', marginTop: 20}}>
        Libero
      </Text>
      <ScrollView>
        <Paragraph>
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

export const TradingCheckoutFirst = props => {
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
      }}
      height={hp('100%')}>
      <LinearGradient
        colors={['rgba(255, 255,255, 0.5)', 'rgba(255, 255, 255, 0.9)']}
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
            onPress={() => props.sellRef.current.open()}>
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
              props.buyRef.current.open();
              props.parentRef.current.close();
            }}>
            <Text style={[investmentStyles.midText, globalStyles.bold]}>
              Buy
            </Text>
          </TouchableOpacity>
          <View style={[globalStyles.tradeCancelBtn, globalStyles.mb16]}>
            <View style={[globalStyles.f1, {justifyContent: 'center'}]}>
              <Text style={{fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>
                Today’s Volume
              </Text>
              <Text style={{fontSize: 13, fontWeight: '400'}}>54,381,175</Text>
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
        container: globalStyles.tradingStoryPanel,
      }}
      height={hp('100%')}>
      <CloseButton
        onPress={() => {
          props.parentRef.current.close();
        }}
      />
      <Text style={[globalStyles.labelB, {alignSelf: 'center'}]}>Buy</Text>
      <View
        style={[
          globalStyles.flexDR,
          globalStyles.justifySB,
          globalStyles.mvn,
          globalStyles.alc,
        ]}>
        <ProductHorizon
          coinImage={props.item.image}
          imageWidth={props.imageWidth ? props.imageWidth : 45}
          coinName={props.item.name}
          coinLabel={props.item.label}
        />
        <Text style={globalStyles.labelB}>$3000</Text>
      </View>
      <DropdownSelect />
      <View
        style={[
          globalStyles.flexDR,
          globalStyles.justifySB,
          {marginTop: measures.side},
        ]}>
        <AmountInput caption="Number Of Shares" val={'1'} />
        <AmountInput caption="Amount" disabled val={'3,000'} />
      </View>
      <Text
        style={[
          globalStyles.alsc,
          globalStyles.labeln,
          {marginVertical: measures.side},
        ]}>
        $5812.90 available
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
          props.reviewRef.current.open();
          props.parentRef.current.close();
        }}
      />
    </RBSheet>
  );
};

export const TradingReceipt = props => {
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
        container: globalStyles.tradingStoryPanel,
      }}
      height={hp('100%')}>
      <Text style={[globalStyles.labelM, {alignSelf: 'center'}]}>Receipt</Text>

      <ProductVertical
        coinImage={props.item.image}
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
        $3,000
      </Text>
      <Text style={[globalStyles.labelB, globalStyles.alsc]}>1 Coin</Text>
      <Text
        style={{
          ...globalStyles.labell,
          color: colors.tm,
          alignSelf: 'center',
          marginTop: 160,
        }}>
        Fees: $300
      </Text>

      <ContinueBottomBtn
        content="Continue"
        onPress={() => {
          props.completeRef.current.open();
          props.parentRef.current.close();
        }}
      />
    </RBSheet>
  );
};

export const PurchaseComplete = props => {
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
        container: globalStyles.tradingStoryPanel,
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
