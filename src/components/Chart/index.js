import React, {useState, useRef, useContext} from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
import {Paragraph} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
//custom components
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {BlackRoundButton} from '../../components/BubbleButton';
import {ProfitLabel} from '../../components/ProfitLabel';
import {SmallLine} from '../../components/SectionTitle';
import {StockNewsCard, AnalCard, StockCard} from '../../components/Card';
import {NavigationHeader, TrendViewHeader} from '../../components/Headers';
import {CustomProgressBar} from '../../components/Gadgets';
import {AboutPanel} from '../../components/TagPanel';
//custom styles
import {investmentStyles} from '../../styles/investment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {newsList, analList, stockList} from '../../store/datalist';
const {width, height} = Dimensions.get('window');

export const SmallBubbleChart = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <>
      <View style={styles.earningChart}>
        <View style={{flex: 1}}>
          {props.yAxis.reverse().map((item, index) => {
            return (
              <Text
                key={index}
                style={{
                  ...styles.earningChartYaxis,
                  color: theme.colors.text_primary,
                }}>
                {item}
              </Text>
            );
          })}
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 180}}>
            <Text style={{...styles.actualEPSStyle, top: 150}} />
            <Text
              style={{
                ...styles.actualEPSStyle,
                top: 140,
                backgroundColor: 'rgba( 90,197,58, 0.4 )',
              }}
            />
          </View>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 0,
              color: theme.colors.text_primary,
            }}>
            Q4
          </Text>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 5,
              color: theme.colors.text_primary,
            }}>
            FY20
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 180}}>
            <Text style={{...styles.actualEPSStyle, top: 40}} />
            <Text
              style={{
                ...styles.actualEPSStyle,
                top: 60,
                backgroundColor: 'rgba( 90,197,58, 0.4 )',
              }}
            />
          </View>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 0,
              color: theme.colors.text_primary,
            }}>
            Q1
          </Text>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 5,
              color: theme.colors.text_primary,
            }}>
            FY21
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 180}}>
            <Text style={{...styles.actualEPSStyle, top: 60}} />
            <Text
              style={{
                ...styles.actualEPSStyle,
                top: 90,
                backgroundColor: 'rgba( 90,197,58, 0.4 )',
              }}
            />
          </View>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 0,
              color: theme.colors.text_primary,
            }}>
            Q2
          </Text>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 5,
              color: theme.colors.text_primary,
            }}>
            FY21
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 180}}>
            <Text style={{...styles.actualEPSStyle, top: 70}} />
            <Text
              style={{
                ...styles.actualEPSStyle,
                top: 80,
                backgroundColor: 'rgba( 90,197,58, 0.4 )',
              }}
            />
          </View>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 0,
              color: theme.colors.text_primary,
            }}>
            Q3
          </Text>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 5,
              color: theme.colors.text_primary,
            }}>
            FY21
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 180}} />
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 0,
              color: theme.colors.text_primary,
            }}>
            Q4
          </Text>
          <Text
            style={{
              ...styles.earningChartYaxis,
              marginVertical: 5,
              color: theme.colors.text_primary,
            }}>
            FY21
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 16}}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: theme.colors.text_primary}}>Expected EPS </Text>
          <Text style={styles.greenBubble} />
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: 'rgba( 90,197,58, 1 )'}}>
            Actual EPS{' '}
          </Text>
          <Text
            style={{
              ...styles.greenBubble,
              backgroundColor: 'rgba( 90,197,58, 0.4)',
            }}
          />
        </View>
      </View>
    </>
  );
};

export const AnalystRatings = props => {
  const theme = useContext(ThemeContext).theme;
  const total = props.values.buy + props.values.sell + props.values.hold;

  return (
    <View>
      <PanelTitle title={props.title} color={theme.colors.text_primary} />
      <View style={styles.analystContainer}>
        <View style={{width: '20%', justifyContent: 'center'}}>
          <Pie
            radius={36}
            innerRadius={32}
            sections={[
              {
                percentage: Math.round((100 * props.values.buy) / total, 1),
                color: '#5AC53A',
              },
            ]}
            backgroundColor={theme.colors.background_secondary}
          />
          <View style={styles.percentLabel}>
            <Text style={{color: '#5AC53A', fontSize: 24}}>
              {Math.round((100 * props.values.buy) / total, 2)}
              <Text style={{color: '#5AC53A', fontSize: 13}}>%</Text>
            </Text>
            <Text style={{color: '#5AC53A', fontSize: 13}}>BUY</Text>
          </View>
        </View>
        <View style={{width: '75%'}}>
          <CustomProgressBar
            val={props.values.buy / total.toFixed(2)}
            color={theme.colors.green}
            text={`${((100 * props.values.buy) / total).toFixed(2)}% Buy`}
            width={180}
          />
          <CustomProgressBar
            val={props.values.hold / total.toFixed(2)}
            color={theme.colors.text_primary}
            text={`${((100 * props.values.hold) / total).toFixed(2)}% Hold`}
            width={180}
          />
          <CustomProgressBar
            val={props.values.sell / total.toFixed(2)}
            color={theme.colors.red}
            text={`${((100 * props.values.sell) / total).toFixed(2)}% Sell`}
            width={180}
          />
        </View>
      </View>
      {props.analList && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{paddingBottom: 10, marginBottom: 10}}>
          {props.analList.map((item, index) => {
            return (
              <AnalCard
                title={item.provider}
                content={item.reportTitle.slice(0, 90) + '...'}
                key={item.id}
                width={270}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export const WealthChart = props => {
  return (
    <View>
      <Pie
        radius={props.radius}
        innerRadius={props.radius - 4}
        sections={[
          {
            percentage: props.values[0].value,
            color: props.values[0].color,
          },
          {
            percentage: props.values[1].value,
            color: props.values[1].color,
          },
          {
            percentage: props.values[2].value,
            color: props.values[2].color,
          },
          {
            percentage: props.values[3].value,
            color: props.values[3].color,
          },
          {
            percentage: props.values[4].value,
            color: props.values[4].color,
          },
        ]}
        dividerSize={2}
        strokeCap={'butt'}
        backgroundColor={props.backgroundColor}
      />
      <View
        style={{
          ...styles.gauge,
          left: props.radius / 2 + 8,
          top: props.radius / 2 + 20,
        }}>
        <Text style={{...styles.guageLabel, color: props.labelColor}}>
          {props.label}
        </Text>
        <Text style={{...styles.gaugeText, color: props.amountColor}}>
          ${Number(props.amount).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  earningChart: {
    flexDirection: 'row',
    height: 200,
    marginRight: 16,
  },
  earningChartYaxis: {
    fontFamily: 'HelveticaNeueCyr',
    fontWeight: '400',
    fontSize: 12,
    alignSelf: 'center',
    marginVertical: 16,
  },
  actualEPSStyle: {
    width: 16,
    borderRadius: 30,
    backgroundColor: '#5AC53A',
    height: 16,
    alignSelf: 'center',
    position: 'relative',
  },
  greenBubble: {
    width: 12,
    height: 12,
    borderRadius: 30,
    marginLeft: 6,
    backgroundColor: 'rgba( 90,197,58, 1 )',
  },
  analystContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    width: wp(100) - 32,
    marginVertical: 20,
    alignItems: 'center',
  },
  percentLabel: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gauge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    fontSize: 22,
    fontWeight: 'bold',
  },
  gaugeLabel: {
    backgroundColor: 'transparent',
    fontSize: 13,
  },
});
