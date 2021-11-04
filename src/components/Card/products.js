import * as React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Pie from 'react-native-pie';
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

export const GoalWithRing = props => {
  return (
    <View style={{width: props.radius * 2, alignItems: 'center'}}>
      <Image
        source={props.image}
        style={{
          ...styles.roundImage,
          width: props.radius * 2 - 16,
          height: props.radius * 2 - 16,
          top: 8,
        }}
      />
      <Pie
        radius={props.radius}
        innerRadius={props.radius - 4}
        sections={[
          {
            percentage: props.value,
            color: '#5AC53A',
          },
        ]}
        backgroundColor="#83899D"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ringContainer: {},
  roundImage: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
});
