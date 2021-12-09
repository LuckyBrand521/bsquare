import React, {useState, useContext} from 'react';
import {Text, View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//custom components
import {BorderedButton} from '../../components/BubbleButton';
//custom styles
import {investmentStyles} from '../../styles/investment';

const AuthScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <View style={styles(theme).logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: 120, height: 200}}
        />
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Sign Me Up"
          onPress={() => {
            props.navigation.navigate('RegisterOneScreen');
          }}
        />
        <Text />
        <BorderedButton
          borderColor="transparent"
          captionColor={theme.colors.green}
          backgroundColor={theme.colors.background_primary}
          caption="Log In"
          onPress={() => {
            props.navigation.navigate('LoginScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = theme =>
  StyleSheet.create({
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%',
    },
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
  });
