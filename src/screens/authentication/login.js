import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as yup from 'yup';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
//custom components
import {NavigationHeader} from '../../components/Headers';

import {SectionTitle} from '../../components/SectionTitle';
import {BorderedButton} from '../../components/BubbleButton';
//custom styles
import {investmentStyles} from '../../styles/investment';

export const LoginScreen = props => {
  const infoFormSchema = yup.object().shape({
    email: yup.string().email().required('This field is requried'),
    password: yup.string().required('This field is requried'),
  });
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <Text style={styles(theme).topSpace} />
      <SectionTitle
        title="Log in"
        color={theme.colors.text_primary}
        fontSize={34}
      />
      <View style={styles(theme).leadingText}>
        <Text style={styles(theme).leadingTextContent}>New to B Squared?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('RegisterOneScreen');
          }}>
          <Text style={styles(theme).loginText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Formik
        validationSchema={infoFormSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={() => {}}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={styles(theme).formContainer}>
              <Text style={styles(theme).inputLabel}>Email Address</Text>
              <TextInput
                placeholder="xyz@gmail.com"
                name="email"
                keyboardType="email-address"
                placeholderTextColor={theme.colors.text_secondary}
                style={styles(theme).input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Text style={styles(theme).inputLabel}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                name="password"
                secureTextEntry={true}
                placeholderTextColor={theme.colors.text_secondary}
                style={styles(theme).input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={styles(theme).confirmBtn}>
              <BorderedButton
                borderColor={theme.colors.green}
                captionColor={theme.colors.text_primary}
                backgroundColor={theme.colors.green}
                caption="Log In"
                onPress={() => {
                  props.navigation.navigate('LoginVerificationCodeScreen');
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export const LoginVerificationCodeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [componentProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title={''}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text />
      <SectionTitle
        title="Verification Code"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).leadingText}>
        <Text style={styles(theme).leadingTextContent}>
          Enter the code we sent to your email
        </Text>
      </View>
      <Text style={styles(theme).phoneNumber}>xyz@gmail.com</Text>
      <CodeField
        ref={ref}
        {...componentProps}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={res => {
          setValue(res);
          if (res == '1234') {
            props.navigation.navigate('TabNavigation');
          }
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles(theme).codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles(theme).cell, isFocused && styles(theme).focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={{...styles(theme).leadingText, alignSelf: 'center'}}>
        <Text style={styles(theme).leadingTextContent}>
          Didn't receive the code?
        </Text>
        <TouchableOpacity>
          <Text style={styles(theme).loginText}> Resend the code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    leadingText: {
      flexDirection: 'row',
      marginLeft: 16,
      marginVertical: 16,
    },
    leadingTextContent: {
      color: theme.colors.text_primary,
      fontSize: 16,
    },
    loginText: {color: theme.colors.brand_teal, fontSize: 16},
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
    formContainer: {
      marginHorizontal: 16,
    },
    input: {
      borderRadius: 10,
      backgroundColor: theme.colors.background_secondary,
      color: theme.colors.text_primary,
      fontSize: 22,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    inputLabel: {
      color: theme.colors.text_secondary,
      fontSize: 13,
      marginVertical: 8,
    },
    codeFieldRoot: {
      marginTop: 100,
      justifyContent: 'space-around',
      marginHorizontal: 80,
    },
    cell: {
      width: 40,
      height: 50,
      lineHeight: 48,
      fontSize: 24,
      borderRadius: 5,
      borderColor: 'transparent',
      backgroundColor: theme.colors.background_secondary,
      textAlign: 'center',
      color: theme.colors.green,
      justifyContent: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },
    phoneNumber: {
      color: theme.colors.green,
      fontSize: 16,
      marginLeft: 16,
      fontWeight: 'bold',
    },
    topSpace: {
      height: hp(7),
    },
  });
