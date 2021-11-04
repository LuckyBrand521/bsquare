import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ThemeContext, CheckBox} from 'react-native-elements';

//custom components
import {NavigationHeader} from '../../../components/Headers';
import {SectionTitle} from '../../../components/SectionTitle';
import {
  AmountInput,
  MonthYearPicker,
  SimpleSlider,
  DropdownSelect,
} from '../../../components/Inputs';
import {
  ContinueBottomBtn,
  BorderedButton,
  FinishButton,
} from '../../../components/BubbleButton';
import {GoalWithRing} from '../../../components/Card/products';
import {ListItemWithPriceDate} from '../../../components/ListItem';
//custom styles
import {investmentStyles} from '../../../styles/investment';

const data = [
  {
    id: 0,
    image: require('../../../assets/images/travel.png'),
    name: 'Vacation',
  },
  {id: 1, image: require('../../../assets/images/home.png'), name: 'Home'},
  {
    id: 2,
    image: require('../../../assets/images/education.png'),
    name: 'Education',
  },
  {id: 3, image: require('../../../assets/images/car.png'), name: 'Car'},
  {
    id: 4,
    image: require('../../../assets/images/wedding.png'),
    name: 'Wedding',
  },
  {
    id: 5,
    image: '',
    name: 'Other',
  },
];
export const GoalCatogorySelectScreen = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <SectionTitle
        title="What is Your Goal?"
        color={theme.colors.text_primary}
        fontSize={24}
      />
      <FlatList
        style={styles(theme).flatList}
        keyExtractor={item => item.id}
        key={1}
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <ImageComponent
            imageSource={item.image}
            name={item.name}
            onPress={() => {
              props.navigation.navigate('CreateGoalWhereScreen', {
                goal: {type: item.id},
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};
const ImageComponent = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View style={styles(theme).imageHolder}>
      <TouchableOpacity onPress={props.onPress}>
        {props.imageSource !== '' && (
          <Image source={props.imageSource} style={styles(theme).image} />
        )}
        {props.imageSource == '' && <Text style={styles(theme).empty} />}
        <View style={styles(theme).textViewHolder}>
          <Text numberOfLines={1} style={styles(theme).textOnImage}>
            {props.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const CreateGoalWhereScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  const [amount, setAmount] = useState('');
  const handleAmount = res => {
    setAmount(res);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <Text style={styles(theme).headingText}>Where To?</Text>
        <AmountInput
          caption=""
          backgroundColor={theme.colors.background_secondary}
          textColor={theme.colors.text_primary}
          val={''}
          onChange={handleAmount}
          placeholder="Dubai"
          numbertype={false}
        />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Next"
          onPress={() => {
            props.navigation.navigate('CreateGoalAmountScreen', {
              goal: {...lastgoal, where: amount},
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateGoalAmountScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  const [amount, setAmount] = useState(0);
  const handleAmount = res => {
    setAmount(res);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <Text style={styles(theme).headingText}>How much do you need?</Text>
        <AmountInput
          caption=""
          backgroundColor={theme.colors.background_secondary}
          textColor={theme.colors.text_primary}
          val={''}
          onChange={handleAmount}
          placeholder="$200"
          numbertype={true}
        />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Next"
          onPress={() => {
            props.navigation.navigate('CreateGoalDateScreen', {
              goal: {...lastgoal, amount: Number(amount)},
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateGoalDateScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [amount, setAmount] = useState(new Date());
  const lastgoal = props.route.params.goal;
  const handleAmount = res => {
    setAmount(res);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <Text style={styles(theme).headingText}>When do you want it?</Text>
        <MonthYearPicker onPress={handleAmount} />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Next"
          onPress={() => {
            props.navigation.navigate('CreateGoalPrepayConfirmScreen', {
              goal: {...lastgoal, deadline: amount.getTime()},
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateGoalPrepayConfirmScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).inputBox}>
        <Text style={{...styles(theme).headingText, textAlign: 'center'}}>
          Do you need a specific {'\n'}amount before the due date?
        </Text>
      </View>
      <View style={styles(theme).confirmBtns}>
        <BorderedButton
          borderColor={theme.colors.green}
          captionColor={theme.colors.text_primary}
          backgroundColor={theme.colors.green}
          caption="Yes"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('CreateGoalPrepayScreen', {
              goal: lastgoal,
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="No"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('CreateNewGoalPayMethodScreen', {
              goal: {...lastgoal, prepay: 0},
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export const CreateGoalPrepayScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  const [amount, setAmount] = useState(0);
  const [preDate, setPreDate] = useState(new Date());
  const handleChange = val => {
    setAmount((lastgoal.amount * val) / 100);
  };
  const handleDate = res => {
    setPreDate(res);
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).formBox}>
        <Text style={styles(theme).headingText}>How much?</Text>
        <Text style={styles(theme).prepayAmountlabel}>{`$${amount}`}</Text>
        <SimpleSlider
          length={wp('100%') - 32}
          handleChange={handleChange}
          containerStyle={{alignSelf: 'center', marginBottom: 16}}
        />
        <Text style={styles(theme).headingText}>By when?</Text>
        <MonthYearPicker onPress={handleDate} />
      </View>
      <View style={styles(theme).continueBtn}>
        <ContinueBottomBtn
          content="Next"
          onPress={() => {
            props.navigation.navigate('CreateNewGoalPayMethodScreen', {
              goal: {
                ...lastgoal,
                prepay: amount,
                preDeadline: preDate.getTime(),
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateNewGoalPayMethodScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles(theme).goalImageContainer}>
        <GoalWithRing
          radius={100}
          image={data[lastgoal.type].image}
          value={0}
        />
      </View>
      <View>
        <ListItemWithPriceDate
          content="Amount"
          time={lastgoal.deadline}
          price={lastgoal.amount - lastgoal.prepay}
        />
        <ListItemWithPriceDate
          content="Amount"
          time={lastgoal.preDeadline}
          price={lastgoal.prepay}
        />
      </View>
      <View style={{...styles(theme).continueBtn, bottom: 0}}>
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Automate"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('CreateNewGoalCompleteScreen', {
              goal: {
                ...lastgoal,
                spendAuto: 1,
              },
            });
          }}
        />
        <BorderedButton
          borderColor={theme.colors.background_third}
          captionColor={theme.colors.text_primary}
          caption="Manually"
          marginTop={16}
          onPress={() => {
            props.navigation.navigate('CreateNewGoalCompleteScreen', {
              goal: {
                ...lastgoal,
                spendAuto: 0,
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export const CreateNewGoalCompleteScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const lastgoal = props.route.params.goal;
  const [checked, setChecked] = useState(lastgoal.spendAuto ? false : true);
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <NavigationHeader
        title="Set a new goal"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{...styles(theme).inputBox, paddingHorizontal: 16}}>
        <Text style={{...styles(theme).headingText, textAlign: 'center'}}>
          Take $
          {(lastgoal.amount / new Date(lastgoal.deadline).getMonth()).toFixed(
            0,
          )}{' '}
          each months {'\n'}on the {new Date().getDate()}
        </Text>
        <Text style={{...styles(theme).headingText, textAlign: 'center'}}>
          from
        </Text>
        <DropdownSelect
          data={[
            {label: 'Cash balance', value: 'cash'},
            {label: 'Bsquare account', value: 'account'},
          ]}
        />
      </View>
      <Text />
      {!lastgoal.spendAuto && (
        <CheckBox
          title="Set a reminder"
          checked={checked}
          containerStyle={styles(theme).checkboxContainer}
          textStyle={styles(theme).checkboxTextStyle}
          checkedColor="green"
          onPress={() => {
            setChecked(!checked);
          }}
        />
      )}
      <FinishButton
        caption="Let's do it"
        captionStyle={styles(theme).finishStyle}
        onPress={() => {
          props.navigation.navigate('SpendingHomeScreen');
        }}
      />
    </SafeAreaView>
  );
};

const getMonth = date => {
  const d1 = new Date();
  const d2 = new Date(date);
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? Math.abs(months) : months;
};
const styles = theme =>
  StyleSheet.create({
    flatList: {
      marginHorizontal: 0,
    },
    imageHolder: {
      margin: 5,
      height: 160,
      flex: 1,
      position: 'relative',
      padding: 3,
      marginTop: 16,
    },
    image: {
      borderRadius: 10,
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    textViewHolder: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      paddingHorizontal: 10,
      paddingVertical: 8,
      alignItems: 'center',
    },
    textOnImage: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 16,
    },
    empty: {
      height: 100,
    },
    inputBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
    },
    continueBtn: {
      alignItems: 'center',
      paddingHorizontal: 16,
      position: 'absolute',
      bottom: -30,
      width: '100%',
    },
    headingText: {
      color: theme.colors.text_primary,
      fontSize: 22,
      marginBottom: 32,
    },
    confirmBtns: {
      marginTop: 40,
      marginHorizontal: 16,
    },
    formBox: {
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginTop: 16,
    },
    prepayAmountlabel: {
      color: theme.colors.text_primary,
      fontSize: 22,
      borderRadius: 10,
      width: 200,
      backgroundColor: theme.colors.background_secondary,
      padding: 12,
      marginBottom: 16,
    },
    goalImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 32,
    },
    finishStyle: {
      color: theme.colors.text_primary,
      fontWeight: 'bold',
      fontSize: 16,
    },
    checkboxContainer: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    checkboxTextStyle: {
      color: theme.colors.text_primary,
      fontWeight: '400',
      fontSize: 22,
    },
  });
