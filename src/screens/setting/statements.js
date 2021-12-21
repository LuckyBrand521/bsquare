import React, {useState, useContext} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

//custom components
import {NavigationHeader} from '../../components/Headers';
import {SectionTitle} from '../../components/SectionTitle';
import {BorderedButton} from '../../components/BubbleButton';
import {ListItemWithPrice} from '../../components/ListItem';
import {DropdownSelect} from '../../components/Inputs';
//redux Actions
//api
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//test data

export const StatementHomeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title=""
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <SectionTitle
        title="Statements & History"
        color={theme.colors.text_primary}
        fontSize={34}
      />
      <Text />
      <View style={{...styles(theme).container, marginTop: 100}}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Statements"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('StatementTypeScreen');
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="History"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('StatementRecentHistoryScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const StatementTypeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [date, setDate] = useState('');
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Statements"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <Text />
      <View style={styles(theme).container}>
        <Text style={styles(theme).inputLabel}>Type</Text>
        <DropdownSelect
          data={[
            {label: 'Daily', value: 'daily'},
            {label: 'Weekly', value: 'weekly'},
            {label: 'Monthly', value: 'monthly'},
            {label: 'Anually', value: 'anually'},
          ]}
        />
        <Text style={styles(theme).inputLabel}>From</Text>
        <View
          style={{
            ...styles(theme).input,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 9,
          }}>
          <DatePicker
            placeholder="1/1/1990"
            name="dob"
            format="MM/DD/YYYY"
            placeholderTextColor={theme.colors.text_secondary}
            style={{fontSize: 22}}
            mode="date" // The enum of date, datetime and time
            date={date}
            onDateChange={res => {
              setDate(res);
            }}
            // onBlur={handleBlur('dob')}
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateText: {
                color: theme.colors.text_primary,
                fontSize: 22,
              },

              dateInput: styles(theme).dateInput,
              placeholderText: {
                color: theme.colors.text_secondary,
                fontSize: 22,
              },
            }}
          />
        </View>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Next"
          onPress={() => {
            props.navigation.navigate('StatementCategoryScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const StatementCategoryScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Statements"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <Text />
      <View style={{...styles(theme).container, marginTop: 100}}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Investments"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('StatementHistoryScreen');
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Cash Accounts"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('StatementHistoryScreen');
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Borrowing"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('StatementHistoryScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const StatementHistoryScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [date, setDate] = useState('');
  const [activites, setActivities] = useState([
    {name: 'Apple Store', amount: 500, date: 1635534281},
    {name: 'Amazon', amount: 365, date: 1635534281},
    {name: 'Starbucks', amount: 6, date: 1635534281},
    {name: 'Apple Store', amount: 500, date: 1635534281},
    {name: 'Amazon', amount: 365, date: 1635534281},
    {name: 'Starbucks', amount: 6, date: 1635534281},
  ]);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Cash Account"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text />
      <View
        style={{
          ...styles(theme).input,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 9,
          margin: 16,
        }}>
        <DatePicker
          placeholder="1/1/1990"
          name="dob"
          format="MM/DD/YYYY"
          placeholderTextColor={theme.colors.text_secondary}
          style={{fontSize: 22}}
          mode="date" // The enum of date, datetime and time
          date={date}
          onDateChange={res => {
            setDate(res);
          }}
          // onBlur={handleBlur('dob')}
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateText: {
              color: theme.colors.text_primary,
              fontSize: 22,
            },

            dateInput: styles(theme).dateInput,
            placeholderText: {
              color: theme.colors.text_secondary,
              fontSize: 22,
            },
          }}
        />
        <AntDesign
          style={{position: 'absolute', right: 16}}
          name="calendar"
          color={theme.colors.text_secondary}
          size={22}
        />
      </View>
      {activites.map((item, index) => {
        return (
          <ListItemWithPrice
            key={index}
            content={item.name}
            time={item.date}
            price={item.amount}
          />
        );
      })}
    </SafeAreaView>
  );
};
export const StatementRecentHistoryScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [date, setDate] = useState('');
  const [activites, setActivities] = useState([
    {name: 'Apple Store', amount: 500, date: 1635534281},
    {name: 'Amazon', amount: 365, date: 1635534281},
    {name: 'Starbucks', amount: 6, date: 1635534281},
    {name: 'Apple Store', amount: 500, date: 1635534281},
  ]);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="History"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <Text />
      <SectionTitle
        title="Recent Activities"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <Text />
      <Text style={styles(theme).normalText}>Feb 3, 2021</Text>
      {activites.map((item, index) => {
        return (
          <ListItemWithPrice
            key={index}
            content={item.name}
            time={item.date}
            price={item.amount}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: 24,
    },
    inputLabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      marginVertical: 8,
    },
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
    input: {
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
      color: theme.colors.text_primary,
      fontSize: 22,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    dateInput: {
      borderRadius: 10,
      borderWidth: 0,
      marginLeft: 5,
      alignItems: 'flex-start',
      width: '80%',
      fontSize: 22,
    },
    normalText: {
      color: theme.colors.text_secondary,
      fontSize: 16,
      marginLeft: 16,
    },
  });
