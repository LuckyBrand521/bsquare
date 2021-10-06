import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components';
import {BrandColorLabel} from '../../components/Gadgets';

const GrayLabel = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 4px;
  padding: 4px;
`;

export const AnalysisTag = props => {
  return (
    <View style={{justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {props.items.map((item, index) => {
          return (
            <View style={{flex: 1, alignItems: 'center'}} key={index}>
              <GrayLabel textColor="#2A2E3B">{item.label}</GrayLabel>
              <BrandColorLabel
                bold
                height={25}
                red={item.red}
                value={item.value}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
