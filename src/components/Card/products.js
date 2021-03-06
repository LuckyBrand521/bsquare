import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Pie from 'react-native-pie';
import {measures} from '../../styles/colors';
import {globalStyles} from '../../styles/global';
const images = {
  AAPL: require('../../assets/images/AAPL.png'),
  AMZN: require('../../assets/images/AMZN.png'),
  TSLA: require('../../assets/images/TSLA.png'),
  MSFT: require('../../assets/images/MSFT.png'),
};
export const ProductHorizon = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={globalStyles.coinShadow}>
        <Image
          source={props.coinImage ? props.coinImage : images[props.coinLabel]}
          style={{
            width: props.imageWidth,
            height: props.imageWidth,
          }}
        />
      </View>
      <View style={globalStyles.mhn}>
        <Text
          style={{...globalStyles.labell, color: theme.colors.text_primary}}>
          {props.coinName}
        </Text>
        <Text
          style={{...globalStyles.labeln, color: theme.colors.text_primary}}>
          {props.coinLabel}
        </Text>
      </View>
    </View>
  );
};

export const ProductVertical = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: props.marginTop ? props.marginTop : 0,
      }}>
      <View style={globalStyles.coinShadow}>
        <Image
          source={props.coinImage ? props.coinImage : images[props.coinLabel]}
          style={{
            width: props.imageWidth,
            height: props.imageWidth,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            ...globalStyles.labelB,
            fontSize: 22,
            color: theme.colors.text_primary,
          }}>
          {props.coinName}
        </Text>
        <Text
          style={[
            globalStyles.labeln,
            globalStyles.alsc,
            {marginTop: 16, color: theme.colors.text_primary},
          ]}>
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
            color: 'white',
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
