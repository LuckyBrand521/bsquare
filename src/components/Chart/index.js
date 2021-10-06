import React, {useState, useRef} from 'react';
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
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Pie from 'react-native-pie';
import {Paragraph} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import Dash from 'react-native-dash';
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
  return (
    <>
      <View style={styles.earningChart}>
        <View style={{flex: 1}}>
          {props.yAxis.reverse().map((item, index) => {
            return (
              <Text key={index} style={styles.earningChartYaxis}>
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
          <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
            Q4
          </Text>
          <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
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
          <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
            Q1
          </Text>
          <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
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
          <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
            Q2
          </Text>
          <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
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
          <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
            Q3
          </Text>
          <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
            FY21
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 180}} />
          <Text style={{...styles.earningChartYaxis, marginVertical: 0}}>
            Q4
          </Text>
          <Text style={{...styles.earningChartYaxis, marginVertical: 5}}>
            FY21
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 16}}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <Text>Expected EPS </Text>
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
  return (
    <View>
      <PanelTitle title={props.title} />
      <View style={styles.analystContainer}>
        <View style={{width: '20%', justifyContent: 'center'}}>
          <Pie
            radius={36}
            innerRadius={32}
            sections={[
              {
                percentage: props.values.buy,
                color: '#5AC53A',
              },
            ]}
            backgroundColor="#ddd"
          />
          <View style={styles.percentLabel}>
            <Text style={{color: '#5AC53A', fontSize: 24}}>
              {props.values.buy}
              <Text style={{color: '#5AC53A', fontSize: 13}}>%</Text>
            </Text>
            <Text style={{color: '#5AC53A', fontSize: 13}}>BUY</Text>
          </View>
        </View>
        <View style={{width: '75%'}}>
          <CustomProgressBar
            val={props.values.buy / 100}
            color="#5AC53A"
            text={`${props.values.buy}% Buy`}
            width={180}
          />
          <CustomProgressBar
            val={props.values.hold / 100}
            color="#2A2E3B"
            text={`${props.values.buy}% Hold`}
            width={180}
          />
          <CustomProgressBar
            val={props.values.sell / 100}
            color="#E45A28"
            text={`${props.values.buy}% Sell`}
            width={180}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingBottom: 10, marginBottom: 10}}>
        {props.analList.map((item, index) => {
          return (
            <AnalCard
              title={item.title}
              content={item.content}
              key={item.id}
              width={270}
            />
          );
        })}
      </ScrollView>
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
});
