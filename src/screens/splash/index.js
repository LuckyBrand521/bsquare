import * as React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, Image} from 'react-native';

function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Navigation');
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
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
