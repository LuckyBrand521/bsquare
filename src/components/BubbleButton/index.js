import React, {useContext} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
//custom styles
import {globalStyles} from '../../styles/global';
import {colors} from '../../styles/colors';

export const BubbleButton = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
        width: props.radius ? 2 * props.radius : 100,
        height: props.radius ? 2 * props.radius : 100,
        backgroundColor: props.backgroundColor,
        left: props.position.x ? props.position.x : 80,
        top: props.position.y ? props.position.y : 80,
        opacity: 0.9,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '400',
          color: theme.colors.text_primary,
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '700',
          color: theme.colors.text_primary,
        }}>
        ${props.quantity}
      </Text>
    </TouchableOpacity>
  );
};

export const PopularBubble = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: props.radius * 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: props.position.x ? props.position.x : 80,
        top: props.position.y ? props.position.y : 80,
      }}>
      <Image
        style={{
          borderRadius: 100,
          width: props.radius ? 2 * props.radius : 100,
          height: props.radius ? 2 * props.radius : 100,
          opacity: 0.5,
        }}
        source={props.image}
      />
      <Text
        style={{
          fontSize: props.labelSize ? props.labelSize : 17,
          fontWeight: '700',
          color: theme.colors.text_primary,
          position: 'absolute',
          top: props.radius - 12,
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export const BubbleChart = props => {
  const panelWidth = props.panelSize.width;
  const panelHeight = props.panelSize.height;
  return <TouchableOpacity />;
};

export const BlackRoundButton = props => {
  return (
    <TouchableOpacity
      style={{
        ...props.customStyle,
        width: 237,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
      }}
      onPress={() => {
        props.onPress ? props.onPress() : null;
      }}>
      <Image
        source={props.iconUrl}
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'transparent',
          borderRadius: 4,
          marginRight: 16,
        }}
      />
      <Text
        style={{
          fontFamily: 'SF UI Display',
          color: '#fff',
          fontSize: 16,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export const CloseButton = props => {
  return (
    <TouchableOpacity style={globalStyles.closeButton} onPress={props.onPress}>
      <Icon name="x" size={28} color={colors.tn} />
    </TouchableOpacity>
  );
};

export const ContinueBottomBtn = props => {
  return (
    <TouchableOpacity
      style={globalStyles.continueBottomBtn}
      onPress={props.onPress}>
      <Text style={globalStyles.whiteText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export const BorderedButton = props => {
  const [backgroundColor, setBackgroundColor] = React.useState(
    props.backgroundColor
      ? props.backgroundColor
      : globalStyles.borderedBtn.backgroundColor,
  );
  return (
    <TouchableOpacity
      style={{
        ...globalStyles.borderedBtn,
        borderColor: props.borderColor,
        borderWidth: props.borderColor ? 1 : 0,
        marginTop: props.marginTop ? props.marginTop : 0,
        backgroundColor: backgroundColor,
      }}
      // onPressIn={() => {
      //   setBackgroundColor('#5EB330');
      // }}
      // onPressOut={() => {
      //   props.backgroundColor
      //     ? props.backgroundColor
      //     : globalStyles.borderedBtn.backgroundColor;
      // }}
      onPress={props.onPress}>
      <Text
        style={{color: props.captionColor, fontSize: 16, fontWeight: 'bold'}}>
        {props.caption}
      </Text>
    </TouchableOpacity>
  );
};

export const FunctionalButton = props => {
  return (
    <TouchableOpacity
      style={{
        ...styles.buttonContainer,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : 'transparent',
        borderColor: props.borderColor ? props.borderColor : 'transparent',
      }}
      onPress={props.onPress}>
      <Text
        style={{
          color: props.textColor ? props.textColor : 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {props.caption}
      </Text>
    </TouchableOpacity>
  );
};

export const FinishButton = props => {
  return (
    <TouchableOpacity style={styles.finishButton} onPress={props.onPress}>
      <Text style={props.captionStyle}>{props.caption}</Text>
    </TouchableOpacity>
  );
};

const calcRadius = varList => {
  const minRadius = 40;
  return varList;
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  finishButton: {
    borderRadius: 500,
    borderWidth: 1,
    borderColor: '#5EB330',
    width: 152,
    height: 152,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
  },
});
