import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

//custom components
import {CreditCard} from '../../../components/Card/creditcard';
import {CardTemplateGallery} from '../../../components/ImageGallery';
import {NavigationHeader} from '../../../components/Headers';
import {SmallLine} from '../../../components/SectionTitle';
import {BorderedButton} from '../../../components/BubbleButton';
//custom styles
import {investmentStyles} from '../../../styles/investment';
//redux actions
import {updateCardInfo} from '../../../redux/slices/portfolioSlice';
//apis
import {updateUserCardInfo} from '../../../utils/firestoreapi';

const tempplateColors = ['#5EB330', '#2A2E3B', '#C55739'];

export const CreateNewCardScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [tempId, setTempId] = useState(0);
  useEffect(() => {
    console.log('sdf');
  }, []);
  const goConfirm = () => {
    props.navigation.navigate('CreateNewCardConfirmScreen', {
      templateId: tempId,
    });
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Issue a new card"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text style={styles(theme).title}>Select the Design</Text>
      <CardTemplateGallery
        items={[{id: 1}, {id: 2}, {id: 3}]}
        handleChange={val => {
          setTempId(val);
        }}
      />
      <View style={styles(theme).personalInfo}>
        <SmallLine
          bottomBorder
          borderColor={theme.colors.background_third}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          paddingVertical={18}
          title="PERSONAL INFORMATION"
          value=""
        />
        <SmallLine
          bottomBorder
          borderColor={theme.colors.background_third}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Name "
          value="Mohammed Anderson"
        />
        <SmallLine
          bottomBorder
          borderColor={theme.colors.background_third}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Date of birth"
          value="1/11/1990"
        />
        <SmallLine
          bottomBorder
          borderColor={theme.colors.background_third}
          titleColor={theme.colors.text_secondary}
          valueColor={theme.colors.text_primary}
          title="Address"
          value="UAE, Dubai"
        />
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Next"
          onPress={goConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateNewCardConfirmScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const dispatch = useDispatch();
  const [templateId, setTemplateId] = useState(props.route.params.templateId);
  useEffect(() => {
    console.log(props.route.params);
  });
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Confirm the new card"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text style={styles(theme).title}>Your new card</Text>
      <View style={styles(theme).card}>
        <CreditCard
          cardNumber={4812564684558159}
          cardHolder={'Mohammed Anderson'}
          expireDate={'12/24/2022'}
          backgroundColor={tempplateColors[templateId]}
        />
      </View>
      <View style={styles(theme).confirmBtns}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Only electronic"
          marginTop={16}
          onPress={() => {
            updateUserCardInfo(userInfo.userId, {
              balance: 0,
              type: templateId,
              created_at: new Date().getTime(),
              expiration_date: '12/24/2022',
              holder_name: 'Mohammed Anderson',
              number: 4812564684558159,
            }).then(() => {
              dispatch(
                updateCardInfo({
                  balance: 0,
                  type: templateId,
                  created_at: new Date().getTime(),
                  expiration_date: '12/24/2022',
                  holder_name: 'Mohammed Anderson',
                  number: 4812564684558159,
                }),
              );
              props.navigation.navigate('CreateNewCardCompleteScreen', {
                type: 0,
              });
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Electronic and physical"
          marginTop={16}
          onPress={() => {
            updateUserCardInfo(userInfo.userId, {
              balance: 0,
              type: templateId,
              created_at: new Date().getTime(),
              expiration_date: '12/24/2022',
              holder_name: 'Mohammed Anderson',
              number: 4812564684558159,
            }).then(() => {
              dispatch(
                updateCardInfo({
                  balance: 0,
                  type: templateId,
                  created_at: new Date().getTime(),
                  expiration_date: '12/24/2022',
                  holder_name: 'Mohammed Anderson',
                  number: 4812564684558159,
                }),
              );
              props.navigation.navigate('CreateNewCardCompleteScreen', {
                type: 1,
              });
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateNewCardCompleteScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const type = props.route.params.type;
  console.log(type);
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
      />
      <View style={styles(theme).center}>
        <View style={styles(theme).checkIcon}>
          <Icon name="check" size={36} color="white" />
        </View>
        {type == 0 ? (
          <Text style={styles(theme).congratText}>
            Congrats! You are all set
          </Text>
        ) : (
          <SentenceComp />
        )}
      </View>
      <View style={styles(theme).confirmBtn}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Add to Apple Wallet"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('SpendingHomeScreen');
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Done"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('SpendingHomeScreen');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const SentenceComp = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).congratText}>
      <Text style={{color: theme.colors.text_primary}}>
        Your electronic card is all set and you can use {'\n'} it right away.
      </Text>
      <Text />
      <Text style={{color: theme.colors.text_primary}}>
        Your physical card will be delevired to you{'\n'} in the next 48h.
      </Text>
    </View>
  );
};

export const ActivateCardScreen = props => {
  const theme = useContext(ThemeContext).theme;
  // const [templateId, setTemplateId] = useState(props.route.params.templateId);
  const [templateId, setTemplateId] = useState(1);
  useEffect(() => {
    console.log(props.route.params);
  });
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Card activation"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text style={styles(theme).title}>Did you get your card?</Text>
      <View style={styles(theme).card}>
        <CreditCard
          cardNumber={4812564684558159}
          cardHolder={'Mohammed Anderson'}
          expireDate={'12/24/2022'}
          backgroundColor={tempplateColors[templateId]}
        />
      </View>
      <View style={styles(theme).confirmBtns}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Yup, let's activate it"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('CreateNewCardCompleteScreen', {type: 0});
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Add to Apple Wallet"
          marginTop={16}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    title: {
      fontSize: 22,
      color: theme.colors.text_primary,
      alignSelf: 'center',
      marginVertical: 40,
      fontWeight: 'bold',
    },
    personalInfo: {
      marginHorizontal: 16,
      marginVertical: 16,
    },
    confirmBtn: {
      marginHorizontal: 16,
      position: 'absolute',
      width: wp('100%') - 32,
      bottom: 20,
    },
    card: {
      alignSelf: 'center',
    },
    confirmBtns: {
      marginTop: 40,
      marginHorizontal: 16,
    },
    checkIcon: {
      width: 64,
      height: 64,
      backgroundColor: theme.colors.green,
      alignItems: 'center',
      borderRadius: 50,
      justifyContent: 'center',
    },
    center: {
      top: 180,
      alignItems: 'center',
    },
    congratText: {
      color: theme.colors.text_primary,
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 16,
      marginHorizontal: 16,
    },
  });
