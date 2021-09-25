import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {colors, measures} from '../../styles/colors';
import {globalStyles} from '../../styles/global';

export const ProductHorizon = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={globalStyles.coinShadow}>
        <Image
          source={props.coinImage}
          style={{
            width: props.imageWidth,
            height: props.imageWidth,
          }}
        />
      </View>
      <View style={globalStyles.mhn}>
        <Text style={globalStyles.labell}>{props.coinName}</Text>
        <Text style={globalStyles.labeln}>{props.coinLabel}</Text>
      </View>
    </View>
  );
};

export const ProductVertical = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: props.marginTop ? props.marginTop : 0,
      }}>
      <View style={globalStyles.coinShadow}>
        <Image
          source={props.coinImage}
          style={{
            width: props.imageWidth,
            height: props.imageWidth,
          }}
        />
      </View>
      <View>
        <Text style={{...globalStyles.labelB, fontSize: 22}}>
          {props.coinName}
        </Text>
        <Text style={[globalStyles.labeln, globalStyles.alsc, {marginTop: 16}]}>
          {props.coinLabel}
        </Text>
      </View>
    </View>
  );
};

export const HighlightVertical = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: props.marginTop ? props.marginTop : 0,
        marginRight: measures.side,
      }}>
      <View>
        <Text
          style={{
            fontWeight: '400',
            lineHeight: 13,
            color: colors.tn,
            fontSize: 10,
          }}>
          {props.name}
        </Text>
      </View>
      <View
        style={{
          ...globalStyles.coinShadow,
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={props.image}
          style={{
            width: props.imageWidth
              ? props.imageWidth
              : measures.productImageSize,
            height: props.imageWidth
              ? props.imageWidth
              : measures.productImageSize,
          }}
        />
      </View>
    </View>
  );
};
