import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import MonthPicker from 'react-native-month-year-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {globalStyles} from '../../styles/global';
import {colors} from '../../styles/colors';
// import {TextInput} from 'react-native-paper';

export const DropdownSelect = props => {
  const theme = useContext(ThemeContext).theme;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('coin');
  const [items, setItems] = useState(
    props.data
      ? props.data
      : [
          {label: 'Coin', value: 'coin'},
          {label: 'Stock', value: 'stock'},
          {label: 'Real Estate', value: 'estate'},
          {label: 'Idea', value: 'idea'},
        ],
  );
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      arrowIconStyle={{opacity: 1, color: theme.colors.text_primary}}
      textStyle={{color: theme.colors.text_secondary, fontSize: 22}}
      style={{
        backgroundColor: theme.colors.background_secondary,
        borderWidth: 0,
      }}
      dropDownContainerStyle={{
        borderWidth: 0,
        backgroundColor: theme.colors.background_secondary,
      }}
    />
  );
};

export const AmountInput = props => {
  const [value, setValue] = useState(props.val);
  const theme = useContext(ThemeContext).theme;
  useEffect(() => {
    console.log(value);
  }, []);
  return (
    <View style={{width: '48%'}}>
      <Text style={globalStyles.labeln}>{props.caption}</Text>
      <TextInput
        editable={props.disabled ? false : true}
        style={{
          ...styles(theme).textInput,
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : styles(theme).textInput.backgroundColor,
          color: props.textColor ? props.textColor : styles.textInput.color,
        }}
        value={value}
        placeholder={props.placeholder ? props.placeholder : '0'}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : '#888'
        }
        onChangeText={res => {
          props.onChange(res);
          setValue(props.numbertype ? Number(res) : res);
        }}
        keyboardType={props.numbertype ? 'number-pad' : 'default'}
      />
    </View>
  );
};

export const SearchInput = props => {
  const [query, setQuery] = useState('');
  const theme = useContext(ThemeContext).theme;
  return (
    <TextInput
      value={query}
      onChange={setQuery}
      style={{
        ...styles(theme).textInput,
        marginHorizontal: 16,
        marginVertical: 24,
      }}
      placeholder="Search by ticker or name"
      placeholderTextColor={colors.tm}
    />
  );
};

export const MonthYearPicker = props => {
  const theme = useContext(ThemeContext).theme;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      props.onPress(selectedDate);
    },
    [date, showPicker],
  );
  return (
    <View style={{width: '100%', paddingHorizontal: 16}}>
      <TouchableOpacity
        style={styles(theme).datePickerBtn}
        onPress={() => showPicker(true)}>
        <Text style={styles(theme).dateLabel}>{date.toDateString()}</Text>
        <Icon name="calendar" size={30} color={theme.colors.text_secondary} />
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="US"
        />
      )}
    </View>
  );
};

export const SimpleSlider = props => {
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([2]);
  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

  const sliderOneValuesChange = values => {
    setSliderOneValue(values);
    props.handleChange(values[0]);
  };

  const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);
  return (
    <MultiSlider
      values={sliderOneValue}
      sliderLength={props.length}
      onValuesChangeStart={sliderOneValuesChangeStart}
      onValuesChange={sliderOneValuesChange}
      onValuesChangeFinish={sliderOneValuesChangeFinish}
      min={0}
      max={100}
      step={1}
      containerStyle={props.containerStyle}
    />
  );
};

const styles = theme =>
  StyleSheet.create({
    datePickerBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
    },
    dateLabel: {
      fontSize: 16,
      color: theme.colors.text_primary,
    },
    textInput: {
      backgroundColor: colors.grayColor,
      borderWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 10,
      textAlign: 'center',
      paddingHorizontal: 16,
      fontSize: 22,
      color: colors.tm,
    },
  });
