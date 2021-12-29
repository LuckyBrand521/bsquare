import React, {useEffect, useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {ThemeContext} from 'react-native-elements';

function SplashScreen({navigation}) {
  const theme = useContext(ThemeContext).theme;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('AuthScreen');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background_primary,
      }}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{width: 144, height: 230}}
      />
      <Text style={{fontSize: 22, marginTop: 48, color: '#FFF'}}>
        By The World, For The World
      </Text>
    </View>
  );
}

export default SplashScreen;
