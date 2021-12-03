import React, {useContext} from 'react';
import {ThemeContext} from 'react-native-elements';
import {StyleSheet, Text} from 'react-native';
import {Popable} from 'react-native-popable';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const QuestionToolTip = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Popable
      content={
        <Text style={styles(theme).popoverTextStyle}>{props.content}</Text>
      }
      strictPosition={true}
      position={props.position ? props.position : 'right'}
      backgroundColor={
        props.backgroundColor
          ? props.backgroundColor
          : theme.colors.background_secondary
      }
      style={styles(theme).popoverStyle}
      wrapperStyle={styles(theme).wrapperStyle}>
      <Text style={styles(theme).text}>
        <AntDesign
          name="questioncircleo"
          color={theme.colors.text_primary}
          size={props.size ? props.size : 20}
        />
      </Text>
    </Popable>
  );
};

const styles = theme =>
  StyleSheet.create({
    text: {
      color: 'white',
    },
    tooltipContainer: {
      position: 'absolute',
      left: 0,
    },
    popoverStyle: {
      justifyContent: 'center',
    },
    popoverTextStyle: {
      color: theme.colors.text_primary,
      padding: 10,
    },
    wrapperStyle: {
      // width: 20,
      marginHorizontal: 5,
    },
  });
