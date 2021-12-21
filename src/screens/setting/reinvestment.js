import React, {useState, useContext} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';

//custom components
import {NavigationHeader} from '../../components/Headers';
import {SectionTitle} from '../../components/SectionTitle';
import {BorderedButton} from '../../components/BubbleButton';

import {DropdownSelect} from '../../components/Inputs';
//redux Actions
//api
//custom styles
import {investmentStyles} from '../../styles/investment';

export const ReinvestmentHomeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [amount, setAmount] = useState('');
  const [isOn, setIsOn] = useState(true);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Reinvestment"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <ScrollView>
        <SectionTitle
          title="Reinvestment"
          color={theme.colors.text_primary}
          fontSize={34}
        />
        <View style={styles(theme).container}>
          <Text style={styles(theme).inputLabel}>Reinvest</Text>
          <TextInput
            placeholder="100"
            keyboardType="number-pad"
            placeholderTextColor={theme.colors.text_secondary}
            value={amount}
            onChangeText={setAmount}
            style={{...styles(theme).input, width: 150}}
          />
          <Text style={styles(theme).inputLabel}>From</Text>
          <DropdownSelect
            data={[
              {label: 'Cash Balance', value: 'cash'},
              {label: 'Wallet', value: 'wallet'},
              {label: 'Local Bank', value: 'bank'},
              {label: 'Paypal', value: 'paypal'},
            ]}
          />
          <Text style={styles(theme).inputLabel}>Every</Text>
          <DropdownSelect
            data={[
              {label: 'Week', value: 'weekly'},
              {label: 'Month', value: 'monthly'},
            ]}
          />
          <Text />
          <>
            <SectionTitle
              title="Recurring Investments"
              color={theme.colors.text_primary}
              fontSize={22}
              marginLeft={1}
            />
            <Text style={styles(theme).dummyLabel}>0</Text>
            <Text style={styles(theme).paragraph}>
              Recurring investments purchase stocks, crypro, ideas, Real Estate
              on a repeated schedule. You can pause or delete your investments
              at any time.
            </Text>
            <TouchableOpacity>
              <Text style={styles(theme).textLink}>Read More</Text>
            </TouchableOpacity>
          </>
          <>
            <Text />
            <SectionTitle
              title="Devidend Investments"
              color={theme.colors.text_primary}
              fontSize={22}
              marginLeft={1}
            />
            <Text style={styles(theme).dummyLabel}>Disabled</Text>
            <Text style={styles(theme).paragraph}>
              Dividend Reinvestment (DRIP) automatically reinvests cash and and
              real estate dividend payment into additional shares of the
              underlying stock or fund.
            </Text>
            <TouchableOpacity>
              <Text style={styles(theme).textLink}>Read More</Text>
            </TouchableOpacity>
          </>
          <View style={styles(theme).flexRow}>
            <Text style={styles(theme).textPrimary}>
              Enable Divident Reinvestment
            </Text>
            <ToggleSwitch
              isOn={isOn}
              onColor="#5AC53A"
              offColor={theme.colors.text_secondary}
              size="large"
              onToggle={isOn => {
                setIsOn(isOn);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles(theme).mh16}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Borrow"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('ReinvestmentTypeScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const ReinvestmentTypeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Select Investment"
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
          caption="My Current Investments"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('ReinvestmentSelectCategoryScreen');
          }}
        />
        <Text style={styles(theme).buttonLabel}>
          Reinvest equally into my already existing Investments.
        </Text>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Select Category"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('ReinvestmentSelectCategoryScreen');
          }}
        />
        <Text style={styles(theme).buttonLabel}>
          Pick exactly where you want to reinvest your money
        </Text>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Custome"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('ReinvestmentSelectCategoryScreen');
          }}
        />
        <Text style={styles(theme).buttonLabel}>
          Customize how your money should be invested
        </Text>
      </View>
    </SafeAreaView>
  );
};
export const ReinvestmentSelectCategoryScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Select Category"
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
          caption="Crypto"
          marginTop={16}
          onPress={() => {}}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Real Estate"
          marginTop={16}
          onPress={() => {}}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Stock"
          marginTop={16}
          onPress={() => {}}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Cash"
          marginTop={16}
          onPress={() => {}}
        />
      </View>
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
    input: {
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
      color: theme.colors.text_primary,
      fontSize: 22,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    dummyLabel: {
      fontSize: 22,
      color: theme.colors.text_secondary,
      marginVertical: 12,
    },
    paragraph: {
      color: theme.colors.text_primary,
      fontSize: 13,
      marginVertical: 12,
    },
    textLink: {
      color: theme.colors.text_link,
      fontSize: 13,
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
    },
    textPrimary: {
      fontSize: 16,
      color: theme.colors.text_primary,
      fontWeight: 'bold',
    },
    mh16: {
      marginHorizontal: 16,
    },
    buttonLabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      alignSelf: 'center',
      marginTop: 16,
    },
  });
