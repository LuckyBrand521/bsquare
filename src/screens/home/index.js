import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <TouchableOpacity>
        <Text />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
