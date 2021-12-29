import React, {useState, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {Paragraph} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import {colors, measures} from '../../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const RBSheetListSelector = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <RBSheet
      ref={props.parentRef}
      closeOnDragDown={false}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: theme.colors.background_secondary,
        },
        draggableIcon: {
          backgroundColor: theme.colors.background_secondary,
        },
        container: globalStyles.tradingStoryPanel,
      }}
      height={hp('40%')}>
      <Text
        style={{
          fontSize: 22,
          color: theme.colors.text_primary,
          fontWeight: '700',
          marginTop: 20,
        }}>
        {props.title}
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
    </RBSheet>
  );
};
