import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  CustomProgressBar,
  BrandColorLabel,
  CryptoPerformanceRow,
} from '../../components/Gadgets';
import {SmallLine, PanelTitle} from '../SectionTitle';
import {colors, measures} from '../../styles/colors.js';
import {globalStyles} from '../../styles/global';

export const RealEstateDetailCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <CustomProgressBar
          val={props.percent}
          color="#5AC53A"
          textColor={colors.tn}
          text={`${props.percent * 100}% Funded`}
          barHeight={8}
          width={wp('100%') - 125}
        />
      </View>
      <View>
        <SmallLine
          paddingVertical={12}
          title="Investment"
          bottomBorder
          valueColor={props.value1Color ? props.value1Color : colors.greenColor}
          value={props.amount}
        />
        <SmallLine
          paddingVertical={12}
          title="Date bought"
          bottomBorder
          value={props.boughtDate}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SmallLine
            width="45%"
            paddingVertical={12}
            title="Number of tokens"
            bottomBorder
            value={props.tokenNumber}
          />
          <SmallLine
            width="45%"
            paddingVertical={12}
            title="EST Value"
            bottomBorder
            value={props.estValue}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SmallLine
            width="45%"
            paddingVertical={12}
            title="P/L"
            bottomBorder
            value={props.plValue}
          />
          <SmallLine
            width="45%"
            paddingVertical={12}
            title="RIO"
            bottomBorder
            value={props.rioValue}
          />
        </View>
      </View>
    </View>
  );
};

export const RealEstateInfoCard = props => {
  return (
    <View style={styles.container}>
      <SmallLine
        titleColor={colors.tm}
        paddingVertical={12}
        title="Max Amount"
        topBorder
        bottomBorder
        value={props.maxAmount}
        valueColor={colors.tn}
        normal
      />
      <SmallLine
        titleColor={colors.tm}
        paddingVertical={12}
        title="Min Amount"
        bottomBorder
        value={props.minAmount}
        valueColor={colors.tn}
        normal
      />
      <SmallLine
        titleColor={colors.tm}
        paddingVertical={12}
        title="Investment Period"
        bottomBorder
        value={props.period}
        valueColor={colors.tn}
        normal
      />
      <SmallLine
        titleColor={colors.tm}
        paddingVertical={12}
        title="Expected ROI"
        bottomBorder
        value={props.roi}
        valueColor={colors.tn}
        normal
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <SmallLine
          titleColor={colors.tm}
          width="45%"
          paddingVertical={12}
          title="Start Date"
          bottomBorder
          value={props.startDate}
          valueColor={colors.tn}
          normal
        />
        <SmallLine
          titleColor={colors.tm}
          width="45%"
          paddingVertical={12}
          title="End Date"
          bottomBorder
          value={props.endDate}
          valueColor={colors.tn}
          normal
        />
      </View>
    </View>
  );
};

export const ReadMorePanel = props => {
  const [textShown, setTextShown] = useState(false); //To show your remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [triggerTextLocation, setTriggerTextLocation] = useState({
    top: 0,
    right: 0,
  });

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = e => {
    const {lines} = e.nativeEvent;
    if (lines && Array.isArray(lines) && lines.length > 0) {
      let tempTxtLocation = {
        top: (lines.length - 1) * lines[0].height,
        right: wp('100%') - lines[lines.length - 1].width - 10,
      };
      setTriggerTextLocation(tempTxtLocation);
      setLengthMore(lines.length >= props.targetLines);
    }
  };
  return (
    <View style={styles.mainBody}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : props.targetLines || 1}
        style={styles.txtStyle}>
        {props.text || ''}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} style={styles.lessMoreStyle}>
          {textShown ? ' Less' : 'See more'}
        </Text>
      ) : null}
    </View>
  );
};

export const PropertyDetailCard = props => {
  return (
    <View style={globalStyles.mhn}>
      <SmallLine
        titleColor={colors.tn}
        paddingVertical={12}
        title="Floors"
        bottomBorder
        value={props.floors}
      />
      <SmallLine
        titleColor={colors.tn}
        paddingVertical={12}
        title="Number of Apartments"
        bottomBorder
        value={props.apartments}
      />
      <SmallLine
        titleColor={colors.tn}
        paddingVertical={12}
        title="Occupation"
        bottomBorder
        value={props.occupation}
      />
      <SmallLine
        titleColor={colors.tn}
        paddingVertical={12}
        title="Total Rent"
        bottomBorder
        value={props.total}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: measures.side,
    paddingHorizontal: measures.side,
  },
  barContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: measures.side,
  },
  mainBody: {
    marginTop: 6,
    marginHorizontal: measures.side,
    marginBottom: measures.side,
  },
  titleStyle: {
    fontFamily: 'HelveticaNeueCyr',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A2E3B',
  },
  txtStyle: {
    fontFamily: 'HelveticaNeueCyr',
    fontSize: 13,
    lineHeight: 20,
    color: '#000',
    marginTop: 10,
  },
  lessMoreStyle: {
    fontSize: 13,
    color: colors.tr,
    marginTop: 6,
  },
});
