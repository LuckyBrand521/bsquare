import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
//custom components
import {
  NavigationHeader,
  NavigationProgressHeader,
} from '../../components/Headers';
import {DropdownSelect} from '../../components/Inputs';

import {
  SectionTitle,
  SmallLine,
  TwoColSmallLine,
} from '../../components/SectionTitle';
import {BorderedButton} from '../../components/BubbleButton';
import {UploadButton} from '../../components/UploadButton';
//custom styles
import {investmentStyles} from '../../styles/investment';

const selectFile = async () => {
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.allFiles],
    });
    // Printing the log realted to the file
    console.log('res : ' + JSON.stringify(res));
    // Setting the state to show single file attributes
    // setSingleFile(res[0]);
  } catch (err) {
    // setSingleFile(null);
    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};
export const RegisterOneScreen = props => {
  const infoFormSchema = yup.object().shape({
    firstname: yup.string().required('This field is requried'),
    lastname: yup.string().required('This field is required'),
    email: yup.string().email().required('This field is requried'),
  });
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={1}
        total={4}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="Sign Up"
        color={theme.colors.text_primary}
        fontSize={34}
      />
      <View style={styles(theme).leadingText}>
        <Text style={styles(theme).leadingTextContent}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LoginScreen');
          }}>
          <Text style={styles(theme).loginText}> Log In</Text>
        </TouchableOpacity>
      </View>
      <Formik
        validationSchema={infoFormSchema}
        initialValues={{
          email: '',
          firstname: '',
          lastname: '',
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
              <Text style={styles(theme).inputLabel}>First Name</Text>
              <TextInput
                placeholder="John"
                name="firstname"
                placeholderTextColor={theme.colors.text_secondary}
                style={styles(theme).input}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                value={values.firstname}
              />
              <Text style={styles(theme).inputLabel}>Last Name</Text>
              <TextInput
                placeholder="Smith"
                name="lastname"
                placeholderTextColor={theme.colors.text_secondary}
                style={styles(theme).input}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname}
              />
              <View style={{height: hp('10%')}} />
            </View>
            <View style={styles(theme).confirmBtn}>
              <BorderedButton
                borderColor={theme.colors.green}
                captionColor={theme.colors.text_primary}
                backgroundColor={theme.colors.green}
                caption="Next"
                onPress={() => {
                  props.navigation.navigate('RegisterTwoScreen');
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export const RegisterTwoScreen = props => {
  const infoFormSchema = yup.object().shape({
    dob: yup.date().required('This field is requried'),
    nationality: yup.string().required('This field is required'),
    residentCountry: yup.string().email().required('This field is requried'),
    phone: yup.string().required('This field is required'),
  });
  const [nationalityCode, setNationalityCode] = useState('');
  const [residentCountryCode, setResidentCountryCode] = useState('');
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={2}
        total={4}
        onPress={() => {
          props.navigation.goBack();
        }}
      />

      <Formik
        validationSchema={infoFormSchema}
        initialValues={{
          dob: '',
          nationality: '',
          residentCountry: '',
          phone: '',
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
            <View style={{...styles(theme).formContainer, marginTop: 32}}>
              <Text style={styles(theme).inputLabel}>Date of Birth</Text>
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
                  onDateChange={handleChange('dob')}
                  onBlur={handleBlur('dob')}
                  date={values.dob}
                  style={{fontSize: 22}}
                  mode="date" // The enum of date, datetime and time
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
              <Text style={styles(theme).inputLabel}>Nationality</Text>
              <View
                style={{
                  ...styles(theme).input,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 13,
                }}>
                <CountryPicker
                  theme={{
                    ...DARK_THEME,
                    onBackgroundTextColor: theme.colors.text_secondary,
                    fontSize: 22,
                  }}
                  countryCode={nationalityCode}
                  withFilter
                  withCountryNameButton
                  containerButtonStyle={{color: 'white'}}
                  onSelect={country => {
                    handleChange('nationality');
                    setNationalityCode(country.cca2);
                  }}
                />
                <AntDesign
                  style={{position: 'absolute', right: 16}}
                  name="down"
                  color={theme.colors.text_secondary}
                  size={12}
                />
              </View>
              <Text style={styles(theme).inputLabel}>Country of Residence</Text>
              <View
                style={{
                  ...styles(theme).input,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 13,
                }}>
                <CountryPicker
                  theme={{
                    ...DARK_THEME,
                    onBackgroundTextColor: theme.colors.text_secondary,
                    fontSize: 22,
                  }}
                  countryCode={residentCountryCode}
                  withFilter
                  withCountryNameButton
                  containerButtonStyle={{color: 'white'}}
                  onSelect={country => {
                    handleChange('residentCountry');
                    setResidentCountryCode(country.cca2);
                  }}
                />
                <AntDesign
                  style={{position: 'absolute', right: 16}}
                  name="down"
                  color={theme.colors.text_secondary}
                  size={12}
                />
              </View>
              <Text style={styles(theme).inputLabel}>Phone Number</Text>
              <TextInput
                placeholder="+971-585274290"
                name="email"
                keyboardType="phone-pad"
                placeholderTextColor={theme.colors.text_secondary}
                style={styles(theme).input}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              <View style={{height: hp('10%')}} />
            </View>
            <View style={styles(theme).confirmBtn}>
              <BorderedButton
                borderColor={theme.colors.green}
                captionColor={theme.colors.text_primary}
                backgroundColor={theme.colors.green}
                caption="Next"
                onPress={() => {
                  props.navigation.navigate('VerificationCodeScreen');
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export const VerificationCodeScreen = props => {
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
      <NavigationProgressHeader
        value={3}
        total={4}
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
          Enter the code we sent to your phone number
        </Text>
      </View>
      <Text style={styles(theme).phoneNumber}>+971-459154981</Text>
      <CodeField
        ref={ref}
        {...componentProps}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={res => {
          setValue(res);
          if (res == '1234') {
            props.navigation.navigate('SetPasswordScreen');
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

export const SetPasswordScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const infoFormSchema = yup.object().shape({
    password: yup.string().min(8).max(32).required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required(),
  });
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationProgressHeader
        value={4}
        total={4}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text />
      <SectionTitle
        title="Create your password"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <Formik
        validationSchema={infoFormSchema}
        initialValues={{
          password: '',
          password_confirmation: '',
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
            <View style={{...styles(theme).formContainer, marginTop: '15%'}}>
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
              <Text style={styles(theme).inputLabel}>
                Password confirmation
              </Text>
              <TextInput
                placeholder="Confirm your password"
                name="password_confirmation"
                secureTextEntry={true}
                placeholderTextColor={theme.colors.text_secondary}
                style={styles(theme).input}
                onChangeText={handleChange('password_confirmation')}
                onBlur={handleBlur('password_confirmation')}
                value={values.password_confirmation}
              />
            </View>
            <View style={styles(theme).confirmBtn}>
              <BorderedButton
                borderColor={theme.colors.green}
                captionColor={theme.colors.text_primary}
                backgroundColor={theme.colors.green}
                caption="Next"
                onPress={() => {
                  props.navigation.navigate('SetAllScreen');
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export const SetAllScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <View style={styles(theme).logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: 120, height: 200}}
        />
        <Text style={styles(theme).allSetLabel}>You Are All Set</Text>
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Check Out The App"
          onPress={() => {
            props.navigation.navigate('TabNavigation');
          }}
        />
        <Text />
        <BorderedButton
          borderColor="transparent"
          captionColor={theme.colors.green}
          backgroundColor={theme.colors.background_primary}
          caption="Finish Signing Up"
          onPress={() => {
            props.navigation.navigate('SetFaceIDScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const SetFaceIDScreen = props => {
  const theme = useContext(ThemeContext).theme;

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
        title="Biometric facial recognition"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).leadingText}>
        <Text style={styles(theme).leadingTextContent}>
          Do you want to connect biometric face recognition now?
        </Text>
      </View>
      <View style={{...styles(theme).logoContainer, marginTop: '30%'}}>
        <Image
          source={require('../../assets/images/faceId.png')}
          style={{width: 120, height: 120}}
        />
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Yes"
          onPress={() => {
            Alert.alert(
              'Do you want to allow “B Squared” to use Face ID?',
              'This app was designed to support Touch ID. It was not been updated forFace ID.',
              [
                {
                  text: "Don't Allow",
                  onPress: () => console.log('No button clicked'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => props.navigation.navigate('UploadIDScreen'),
                },
              ],
              {
                cancelable: true,
                style: {
                  borderRadius: 20,
                },
              },
            );
          }}
        />
        <Text />
        <BorderedButton
          borderColor="transparent"
          captionColor={theme.colors.green}
          backgroundColor={theme.colors.background_primary}
          caption="Connect it later"
          onPress={() => {
            props.navigation.navigate('UploadIDScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const UploadIDScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const sheet = useRef();
  const [image, setImage] = useState('');
  const [passportImage, setPassportImage] = useState(null);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setImage(image.path);
        setPassportImage(image);
        sheet.current.close();
      })
      .catch(error => {
        console.log(error);
      });
  };
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
        title="ID Verification"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).uploadScreenContainer}>
        <DropdownSelect
          data={[
            {label: 'Passport', value: 'passport'},
            {label: 'National ID', value: 'national-id'},
            {label: 'Driver license', value: 'driver-licence'},
          ]}
        />
        <View style={styles(theme).uploadButtonsContainer}>
          <UploadButton
            name="camera"
            onPress={takePhotoFromCamera}
            label="Take a photo"
          />
          <Text style={styles(theme).orText}>or</Text>
          <UploadButton
            name="upload"
            onPress={selectFile}
            label="Upload a document"
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
            props.navigation.navigate('UploadAddressScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const UploadAddressScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const sheet = useRef();
  const [image, setImage] = useState('');
  const [passportImage, setPassportImage] = useState(null);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setImage(image.path);
        setPassportImage(image);
        sheet.current.close();
      })
      .catch(error => {
        console.log(error);
      });
  };
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
        title="Address Verification"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).uploadScreenContainer}>
        <DropdownSelect
          data={[
            {label: 'Utility Bill', value: 'utility-bill'},
            {label: 'Tax Documentation', value: 'tax-document'},
          ]}
        />
        <View style={styles(theme).uploadButtonsContainer}>
          <UploadButton
            name="camera"
            onPress={takePhotoFromCamera}
            label="Take a photo"
          />
          <Text style={styles(theme).orText}>or</Text>
          <UploadButton
            name="upload"
            onPress={selectFile}
            label="Upload a document"
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
            props.navigation.navigate('RegisterCompleteScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const RegisterCompleteScreen = props => {
  const theme = useContext(ThemeContext).theme;

  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <Text style={styles(theme).topSpace} />
      <SectionTitle
        title="Finally We Are Done"
        color={theme.colors.text_primary}
        fontSize={22}
      />
      <View style={styles(theme).leadingText}>
        <Text style={styles(theme).leadingTextContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus
          suspendisse risus egestas quam. Non vitae ullamcorper at cras gravida.
          Porttitor volutpat pharetra tincidunt.
        </Text>
      </View>
      <View style={{...styles(theme).logoContainer, marginTop: '30%'}}>
        <Image
          source={require('../../assets/images/double_check.png')}
          style={{width: 110, height: 50}}
        />
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Fund the account"
          onPress={() => {
            props.navigation.navigate('FundingMethodSelectScreen');
          }}
        />
        <Text />
        <BorderedButton
          borderColor="transparent"
          captionColor={theme.colors.green}
          backgroundColor={theme.colors.background_primary}
          caption="Go to the Home Page"
          onPress={() => {
            props.navigation.navigate('TabNavigation');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%',
    },
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
    dateInput: {
      borderRadius: 10,
      borderWidth: 0,
      marginLeft: 5,
      alignItems: 'flex-start',
      width: '80%',
      fontSize: 22,
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
    allSetLabel: {
      color: theme.colors.text_primary,
      fontSize: 22,
      marginTop: '10%',
      alignSelf: 'center',
    },
    uploadScreenContainer: {
      marginHorizontal: 16,
      paddingTop: '8%',
    },
    uploadButtonsContainer: {
      paddingVertical: '15%',
    },
    orText: {
      fontSize: 22,
      color: theme.colors.text_secondary,
      alignSelf: 'center',
      marginVertical: 12,
    },
    topSpace: {
      height: hp(7),
    },
  });
