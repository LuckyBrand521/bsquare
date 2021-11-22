import React, {useState, useContext} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

//custom components
import {
  SectionTitle,
  PanelTitle,
  SmallLine,
} from '../../components/SectionTitle';
import {ThemeContext} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import {FunctionalButton} from '../../components/BubbleButton';
import {
  CreditCard,
  AddCardBtn,
  GoalListItemCard,
} from '../../components/Card/creditcard';
import {CardFeatureLinks} from '../../components/CardFeatureLinks';
import {ListItemWithArrow, ListItemWithPrice} from '../../components/ListItem';

//custom styles
import {investmentStyles} from '../../styles/investment';

//test data

function SpendingHomeScreen(props) {
  const theme = useContext(ThemeContext).theme;
  const [activites, setActivities] = useState([
    {name: 'Apple Store', amount: 500, date: 1635534281},
    {name: 'Amazon', amount: 365, date: 1635534281},
    {name: 'Starbucks', amount: 6, date: 1635534281},
  ]);
  // const [goals, setGoals] = useState([
  //   {
  //     id: 0,
  //     uri: 'https://picsum.photos/700',
  //     title: 'Tesla Model S',
  //     dates: 30,
  //     percent: 12,
  //     total: 10000,
  //   },
  // ]);
  const [goals, setGoals] = useState([]);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const viewGoalDetail = id => {
    props.navigation.navigate('GoalDetailScreen', {goalId: id});
  };
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <ScrollView>
        <SectionTitle title="Cash" color="#F5F7F8" fontSize={34} />
        <View style={styles(theme).flexRow}>
          <Text style={styles(theme).text}>Purchase Power</Text>
          <Text style={[styles(theme).text, styles(theme).balanceLabel]}>
            ${userInfo.account_balance.toFixed(2)}
          </Text>
        </View>
        <View style={styles(theme).cardView}>
          <AddCardBtn
            onPress={() => {
              // props.navigation.goBack();
              props.navigation.navigate('CreateNewCardScreen');
            }}
            style={styles(theme).addBtn}
          />
          {Object.keys(userInfo.card_info).length !== 0 && (
            <CreditCard
              cardNumber={Number(userInfo.card_info.number)}
              cardHolder={userInfo.card_info.holder_name}
              expireDate={userInfo.card_info.expiration_date}
              type={userInfo.card_info.type}
            />
          )}
        </View>
        <CardFeatureLinks navigation={props.navigation} />
        <View>
          <ListItemWithArrow
            onPress={() => {
              props.navigation.navigate('ActivateCardScreen');
            }}
            content="Activate Card"
          />
          <ListItemWithArrow content="Set a PIN Number" />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              title="Recent Activities"
              color={theme.colors.text_primary}
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
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
        </View>
        <View>
          <LottieView
            source={require('../../assets/animations/piggy.json')}
            autoPlay={false}
            loop={false}
            style={{
              height: 300,
              alignSelf: 'center',
              backgroundColor: 'transparent',
            }}
            speed={1}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              title="Interest Earned"
              color={theme.colors.text_primary}
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
          </View>
          <View style={styles(theme).paddingHor16}>
            <SmallLine
              bottomBorder
              borderColor={theme.colors.text_secondary}
              titleColor={theme.colors.text_secondary}
              valueColor={theme.colors.text_primary}
              title="So Far This Month"
              value="$500"
            />
            <SmallLine
              bottomBorder
              borderColor={theme.colors.text_secondary}
              titleColor={theme.colors.text_secondary}
              valueColor={theme.colors.text_primary}
              title="Next Pay Date"
              value="Feb 28, 2022"
            />
            <SmallLine
              bottomBorder
              borderColor={theme.colors.text_secondary}
              titleColor={theme.colors.text_secondary}
              valueColor={theme.colors.text_primary}
              title="Paied This Year"
              value="$500"
            />
            <View style={styles(theme).twoCols}>
              <SmallLine
                bottomBorder
                borderColor={theme.colors.text_secondary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                title="APY"
                value="1.8%"
                width="45%"
              />
              <SmallLine
                bottomBorder
                borderColor={theme.colors.text_secondary}
                titleColor={theme.colors.text_secondary}
                valueColor={theme.colors.text_primary}
                title="Swept Cash"
                value="$400"
                width="45%"
              />
            </View>
          </View>
        </View>
        <View style={{...styles(theme).marginHor16, marginTop: 16}}>
          <FunctionalButton
            caption="Withdraw"
            backgroundColor={theme.colors.green}
            textColor={theme.colors.text_primary}
            onPress={() => {
              props.navigation.navigate('WithdrawScreen');
            }}
          />
          <FunctionalButton
            caption="Add to Interest Account"
            backgroundColor={'tranparent'}
            borderColor={theme.colors.green}
            textColor={theme.colors.green}
            onPress={() => {
              props.navigation.navigate('DepositInterestAccountScreen');
            }}
          />
        </View>
        <PanelTitle title="Goals" color={theme.colors.text_primary} />
        {userInfo.goals.length > 0 && (
          <ScrollView
            style={styles(theme).top16}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {userInfo.goals.map((item, index) => {
              return (
                <GoalListItemCard
                  uri={item.uri}
                  width={320}
                  key={index}
                  title={item.title}
                  dates={item.dates}
                  percent={item.percent}
                  value={`$${(item.total * item.percent) / 100}/$${item.total}`}
                  imageWidth={300}
                  imageHeight={150}
                  onPress={() => {
                    viewGoalDetail(index);
                  }}
                />
              );
            })}
          </ScrollView>
        )}
        <Text />
        <FunctionalButton
          caption="Set a new Goal"
          backgroundColor={'tranparent'}
          borderColor={theme.colors.green}
          textColor={theme.colors.green}
          onPress={() => {
            props.navigation.navigate('GoalCatogorySelectScreen');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SpendingHomeScreen;

const styles = theme =>
  StyleSheet.create({
    text: {
      color: theme.colors.text_primary,
      fontSize: 16,
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      alignItems: 'center',
    },
    balanceLabel: {
      fontWeight: 'bold',
      fontSize: 22,
    },
    cardView: {
      // marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 202,
      padding: 16,
    },
    addBtn: {
      width: 72,
      backgroundColor: theme.colors.background_secondary,
    },
    marginHor16: {
      marginHorizontal: 16,
    },
    paddingHor16: {
      paddingHorizontal: 16,
    },
    twoCols: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    top16: {
      marginTop: 16,
    },
  });
