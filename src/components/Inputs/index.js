import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {globalStyles} from '../../styles/global';
import {colors} from '../../styles/colors';
import styles from './styles';
// import {TextInput} from 'react-native-paper';

export const DropdownSelect = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('coin');
  const [items, setItems] = useState([
    {label: 'Coin', value: 'coin'},
    {label: 'Stock', value: 'stock'},
    {label: 'Real Estate', value: 'estate'},
    {label: 'Idea', value: 'idea'},
  ]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      arrowIconStyle={{opacity: 0.5}}
      textStyle={{color: colors.tm, fontSize: 22}}
      style={{
        backgroundColor: colors.grayColor,
        borderWidth: 0,
      }}
      dropDownContainerStyle={{borderWidth: 0}}
    />
  );
};

export const AmountInput = props => {
  const [value, setValue] = useState(props.val);
  useEffect(() => {
    console.log(value);
  }, []);
  return (
    <View style={{width: '48%'}}>
      <Text style={globalStyles.labeln}>{props.caption}</Text>
      <TextInput
        editable={props.disabled ? false : true}
        style={{
          ...styles.textInput,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : styles.textInput.backgroundColor,
          color: props.textColor ? props.textColor : styles.textInput.color,
        }}
        value={value}
        onChangeText={res => {
          props.onChange(res);
          setValue(Number(res));
        }}
        keyboardType="number-pad"
      />
    </View>
  );
};

export const SearchInput = props => {
  const [query, setQuery] = useState('');
  return (
    <TextInput
      value={query}
      onChange={setQuery}
      style={{...styles.textInput, marginHorizontal: 16, marginVertical: 24}}
      placeholder="Search by ticker or name"
      placeholderTextColor={colors.tm}
    />
  );
};
