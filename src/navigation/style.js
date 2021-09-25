import React from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';

export const navigationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
