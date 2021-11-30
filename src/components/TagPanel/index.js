import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import {PanelTitle} from '../../components/SectionTitle';
import {SmallLine} from '../../components/SectionTitle';
//custom styles
import {colors} from '../../styles/colors';

export const TagPanel = () => {
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
  const [isOpen, setOn] = useState(false);
  return (
    <View>
      <PanelTitle color={props.color} title={props.title} />
      <Paragraph style={{...styles.paragraphStyle, color: props.color}}>
        {isOpen && props.info.overview}
        {!isOpen && props.info.overview.slice(0, 200) + '...'}
      </Paragraph>
      <TouchableOpacity
        onPress={() => {
          setOn(!isOpen);
        }}>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 12,
          borderTopWidth: 1,
        }}>
        <SmallLine
          title="CEO"
          value={props.info.ceo}
          titleSize={13}
          valueSize={13}
          bottomBorder
        />
        <SmallLine
          title="Headquarters"
          value={props.info.headquarters}
          titleSize={13}
          valueSize={13}
          bottomBorder
        />
        <View style={styles.flexRow}>
          <SmallLine
            title="Founded"
            value={props.info.founded}
            titleSize={13}
            valueSize={13}
            width="45%"
            bottomBorder
          />
          <SmallLine
            title="Employees"
            value={props.info.employees}
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
