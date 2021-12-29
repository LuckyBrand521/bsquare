import React, {useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//custom components
import {NavigationHeader} from '../../components/Headers';
import {ListItemWithArrow, ListItemWithSwitch} from '../../components/ListItem';
import {SVGSimpleChart} from '../../components/LineChart';
import {BorderedButton, ContinueBottomBtn} from '../../components/BubbleButton';

//redux Actions
import {updateTheme} from '../../redux/slices/portfolioSlice';
//api
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles, themedStyles} from '../../styles/global';
import {sampleChartData} from '../../store/datalist';

import {lightTheme, darkTheme} from '../../utils/constants';
export const AppSettingHomeScreen = props => {
  const {theme} = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Settings"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <Text style={[styles(theme).normalText, styles(theme).borderBottom]}>
        ACCOUNT
      </Text>
      <ListItemWithArrow
        content="Notifications & Messages"
        onPress={() => {
          props.navigation.navigate('AppSettingNMScreen');
        }}
      />
      <Text style={[styles(theme).normalText, styles(theme).borderBottom]}>
        PREFERENCES
      </Text>
      <ListItemWithArrow
        content="App Appearance"
        onPress={() => {
          props.navigation.navigate('AppSettingAppearanceScreen');
        }}
      />
      <ListItemWithArrow
        content="Data Usage"
        onPress={() => {
          props.navigation.navigate('AppSettingDUScreen');
        }}
      />
    </SafeAreaView>
  );
};
export const AppSettingNMScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Notifications & Messages"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <Text />
      <ListItemWithArrow
        content="Push Notifications"
        onPress={() => {
          props.navigation.navigate('AppSettingPNScreen');
        }}
      />
      <ListItemWithArrow
        content="Email Notifications"
        onPress={() => {
          props.navigation.navigate('AppSettingENScreen');
        }}
      />
      <ListItemWithArrow content="Messages" />
      <ListItemWithArrow content="Muted" />
    </SafeAreaView>
  );
};

const LabelWithQuestion = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).flexRowWithBorder}>
      <Text style={styles(theme).textSecondary}>{props.label}</Text>
      <AntDesign
        size={16}
        name="exclamationcircleo"
        color={theme.colors.text_secondary}
      />
    </View>
  );
};
export const AppSettingPNScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Push Notifications"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <View style={styles(theme).marginHorizontal16}>
        <Text />
        <LabelWithQuestion label="MY ACCOUNT" />
        <ListItemWithSwitch content="Bank Activity" isOn />
        <Text />
        <LabelWithQuestion label="MY HOLDINGS" />
        <ListItemWithSwitch content="Price Movements" isOn />
        <ListItemWithSwitch content="Shareholder Updates" isOn />
        <ListItemWithSwitch content="Order Status" isOn />
        <Text />
        <LabelWithQuestion label="MY WISHLISTS" />
        <ListItemWithSwitch content="Price Movements" isOn />
        <ListItemWithSwitch content="Shareholder Updates" isOn />
      </View>
    </SafeAreaView>
  );
};
export const AppSettingENScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Email Notifications"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <View style={styles(theme).marginHorizontal16}>
        <Text />
        <LabelWithQuestion label="MY ACCOUNT" />
        <ListItemWithSwitch content="Bank Activity" isOn />
        <Text />
        <LabelWithQuestion label="MY HOLDINGS" />
        <ListItemWithSwitch content="Shareholder Updates" isOn />
        <ListItemWithSwitch content="Order Status" isOn />
      </View>
    </SafeAreaView>
  );
};
export const AppSettingAppearanceScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const dispatch = useDispatch();
  const [darkThemed, setDarkThemed] = useState(true);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="App Appearance"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <Text />
      <View style={[themedStyles(theme).verticalBordered, globalStyles.flexDR]}>
        <Text
          style={[
            themedStyles(theme).greenText,
            themedStyles(theme).normalSizeText,
            globalStyles.mhs,
          ]}>
          Example Inc. <Feather name="arrow-up-right" />
        </Text>
        <Text
          style={[
            themedStyles(theme).redText,
            themedStyles(theme).normalSizeText,
            globalStyles.mhs,
          ]}>
          $619.2 <Feather name="arrow-down-right" />
        </Text>
        <Text
          style={[
            themedStyles(theme).redText,
            themedStyles(theme).normalSizeText,
            globalStyles.mhs,
            globalStyles.bold,
          ]}>
          <AntDesign name="caretdown" /> $2.45 (1.2%)
        </Text>
        <Text
          style={[
            themedStyles(theme).greenText,
            themedStyles(theme).normalSizeText,
            globalStyles.mhs,
            globalStyles.bold,
          ]}>
          <AntDesign name="caretup" /> $2.45 (1.2%)
        </Text>
      </View>
      <Text />
      <SVGSimpleChart
        color={theme.colors.green}
        width={wp('100%')}
        height={210}
        data={sampleChartData}
      />
      <Text />
      <View style={[themedStyles(theme).verticalBordered]}>
        <View style={styles(theme).btnGroup}>
          <BorderedButton
            borderColor={theme.colors.red}
            captionColor={theme.colors.text_primary}
            backgroundColor={theme.colors.red}
            caption="Sell"
            marginTop={16}
            onPress={() => {}}
          />
          <BorderedButton
            borderColor={theme.colors.green}
            captionColor={theme.colors.text_primary}
            backgroundColor={theme.colors.green}
            caption="Buy"
            marginTop={16}
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles(theme).marginHorizontal16}>
        <ListItemWithSwitch
          content="Dark theme"
          isOn={darkThemed}
          onToggle={() => {
            if (darkThemed) {
              setDarkThemed(false);
              dispatch(updateTheme(lightTheme));
            } else {
              setDarkThemed(true);
              dispatch(updateTheme(darkTheme));
            }
          }}
        />
        <ListItemWithSwitch content="Shareholder Updates" isOn />
      </View>
    </SafeAreaView>
  );
};
export const AppSettingDUScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [type, setType] = useState(0);
  const DisplayTypeItem = itemprops => {
    return (
      <TouchableOpacity
        style={{
          ...styles(theme).flexRowWithBorder,
          justifyContent: 'space-between',
          paddingRight: 8,
        }}
        onPress={itemprops.onPress}>
        <Text style={{fontSize: 16, color: theme.colors.text_primary}}>
          {itemprops.label}
        </Text>
        {itemprops.isSelected && (
          <AntDesign name="check" color={theme.colors.green} size={24} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Data Usage"
        onPress={() => {
          props.navigation.goBack();
        }}
        iconHidden={true}
      />
      <View style={styles(theme).marginHorizontal16}>
        <Text
          style={[
            styles(theme).textSecondary,
            styles(theme).borderBottom,
            {marginRight: 0},
          ]}>
          AUTOPLAY VIDEOS
        </Text>
        <DisplayTypeItem
          label="On Mobile Data and Wi-Fi Connections"
          isSelected={type === 0}
          onPress={() => {
            setType(0);
          }}
        />
        <DisplayTypeItem
          label="On Wi-Fi Connections Only"
          isSelected={type === 1}
          onPress={() => {
            setType(1);
          }}
        />
        <DisplayTypeItem
          label="Never Autoplay Videos"
          isSelected={type === 2}
          onPress={() => {
            setType(2);
          }}
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
      marginHorizontal: 16,
    },
    borderBottom: {
      borderBottomColor: theme.colors.background_secondary,
      borderBottomWidth: 1,
      paddingVertical: 16,
      marginTop: 16,
    },
    flexRowWithBorder: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background_secondary,
      paddingVertical: 16,
    },
    textSecondary: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      marginRight: 8,
    },
    marginHorizontal16: {
      marginHorizontal: 16,
    },
    btnGroup: {
      width: '50%',
      alignSelf: 'center',
      marginBottom: 16,
    },
  });
