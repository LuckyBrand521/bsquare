import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {MoneyTitle, PanelTitle} from '../../components/SectionTitle';
import {SmallLine} from '../../components/SectionTitle';
//custom styles
import {investmentStyles, cryptoStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import {colors} from '../../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const TagPanel = props => {
  return (
    <View>
      <Text style={styles.panelLabel}>Popular list</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.tagsList}>
        <TagLabel label="Top 100 Crypto's" />
        <TagLabel label="Top Tech stocks" />
        <TagLabel label="London Real estate" />
        <TagLabel label="Bitcoin" />
        <TagLabel label="Apple stock" />
        <TagLabel label="Exchange" />
        <TagLabel label="Top 100 Crypto's" />
      </ScrollView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.tagsList}>
        <TagLabel label="London Real estate" />
        <TagLabel label="Bitcoin" />
        <TagLabel label="Top 100 Crypto's" />
        <TagLabel label="Top Tech stocks" />
        <TagLabel label="Apple stock" />
        <TagLabel label="Exchange" />
        <TagLabel label="Top 100 Crypto's" />
      </ScrollView>
    </View>
  );
};

export const TagLabel = props => (
  <Text style={styles.taglabel}>{props.label}</Text>
);

export const AboutPanel = props => {
  return (
    <View>
      <PanelTitle title={props.title} />
      <Paragraph style={styles.paragraphStyle}>
        Apple Inc. is an American multinational technology company that
        specializes in consumer electronics, computer software, and online
        services. Apple is the world's largest technology company by revenue
        and, since January 2021, the world's most valuable company.
      </Paragraph>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 12,
          borderTopWidth: 1,
          borderColor: '#EBEFF1',
        }}>
        <SmallLine
          title="CEO"
          value="Timothy Donald Cook"
          titleSize={13}
          valueSize={13}
          bottomBorder
        />
        <SmallLine
          title="Headquarters"
          value="Cupertino, California"
          titleSize={13}
          valueSize={13}
          bottomBorder
        />
        <View style={styles.flexRow}>
          <SmallLine
            title="Founded"
            value="1976"
            titleSize={13}
            valueSize={13}
            width="45%"
            bottomBorder
          />
          <SmallLine
            title="Employees"
            value="147 000"
            titleSize={13}
            valueSize={13}
            width="45%"
            bottomBorder
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panelLabel: {
    color: colors.tm,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 16,
    marginBottom: 12,
  },
  taglabel: {
    fontSize: 10,
    fontWeight: '700',
    borderRadius: 50,
    backgroundColor: colors.greenBackColor,
    paddingVertical: 10,
    paddingHorizontal: 24,
    margin: 4,
    color: colors.greenColor,
  },
  tagsList: {
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMore: {
    fontSize: 13,
    color: '#5E9FDA',
    marginLeft: 16,
    marginTop: 10,
  },
  paragraphStyle: {
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
