import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {useEffect} from 'react';

function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Navigation');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{width: 144, height: 230}}
      />
      <Text style={{fontSize: 22, marginTop: 48}}>
        By The World, For The World
      </Text>
    </View>
  );
}

export default SplashScreen;
