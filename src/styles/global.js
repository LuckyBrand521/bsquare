import React from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {colors, measures} from './colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tradingStoryPanel: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 16,
  },
  fixedBottomBtn: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    height: 100,
    width: wp(100),
    paddingHorizontal: measures.side,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dismissBtn: {
    position: 'relative',
    bottom: 40,
    height: 60,
    marginHorizontal: 16,
    borderRadius: 50,
    backgroundColor: '#5AC53A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeCancelBtn: {
    marginHorizontal: measures.side,
    flexDirection: 'row',
  },
  tradeBuyBtn: {
    height: 60,
    marginHorizontal: 16,
    borderRadius: 50,
    backgroundColor: '#5AC53A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeBtn: {
    backgroundColor: '#EB663B',
    borderRadius: 30,
    height: 56,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBorder: {
    borderRadius: 50,
    borderColor: colors.greenColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyCancelGreenBtn: {
    flex: 1,
    borderColor: colors.greenColor,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.grayColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    right: 12,
  },
  continueBottomBtn: {
    marginHorizontal: measures.side,
    width: '100%',
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.greenColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 52,
  },
  whiteText: {
    fontWeight: '700',
    color: '#FFF',
    fontSize: 16,
  },
  buyPanel: {
    alignItems: 'flex-end',
  },
  bold: {
    fontWeight: 'bold',
  },
  labelM: {
    fontWeight: '700',
    fontSize: 34,
    color: colors.tn,
    lineHeight: 41,
  },
  labelB: {
    fontWeight: '700',
    fontSize: 22,
    color: colors.tn,
    lineHeight: 28,
  },
  labell: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.tn,
    lineHeight: 20,
  },
  labeln: {
    fontWeight: '400',
    fontSize: 13,
    color: colors.tm,
    lineHeight: 18,
  },
  coinShadow: {
    marginBottom: 6,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: '#111',
    // elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  flexDR: {
    flexDirection: 'row',
  },
  flexDC: {
    flexDirection: 'column',
  },
  justifySB: {
    justifyContent: 'space-between',
  },
  justifySA: {
    justifyContent: 'space-around',
  },
  justifyC: {
    justifyContent: 'center',
  },
  alc: {
    alignItems: 'center',
  },
  alsc: {
    alignSelf: 'center',
  },
  pn: {
    paddingHorizontal: 16,
  },
  mhn: {
    marginHorizontal: 16,
  },
  mvn: {
    marginVertical: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mt16: {
    marginTop: 16,
  },
  f1: {
    flex: 1,
  },
  w5: {
    width: '48%',
  },
});
