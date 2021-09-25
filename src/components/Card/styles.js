import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  dropShadowStyle: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  card: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginLeft: 0,
  },
  content: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 0,
    lineHeight: 18,
  },
  dateLabel: {
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 0,
    lineHeight: 13,
    marginTop: 40,
    paddingLeft: 9,
  },
  earningCard: {
    width: 142,
    padding: 10,
    paddingLeft: 16,
    backgroundColor: '#F6F8FA',
    borderRadius: 10,
    marginLeft: 10,
  },
  earningTitle: {
    fontFamily: 'SF UI Display',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    color: '#000',
  },
  earningContent: {
    fontFamily: 'SF UI Display',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#83899D',
  },
  stockNews: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEFF1',
    paddingBottom: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    width: wp(100) - 32,
  },
  stockNewsHeader: {
    flexDirection: 'row',
  },
  stockNewsTitle: {
    fontFamily: 'HelveticaNeueCyr',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  stockNewsContent: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 0,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  documentPinStyle: {
    width: 100,
    height: 60,
    backgroundColor: '#aaa',
  },
});