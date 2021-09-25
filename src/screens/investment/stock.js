import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

function StockInvestmentScreen({navigation}) {
  const goDetail = () => {
    navigation.navigate('StockDetailScreen');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>StockInvestmentScreen!</Text>
      <TouchableOpacity onPress={goDetail}>
        <Text>Go Apple Stock</Text>
      </TouchableOpacity>
    </View>
  );
}

export default StockInvestmentScreen;
