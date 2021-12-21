import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {Paragraph} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PanelTitle} from '../../components/SectionTitle';
import {SmallLine} from '../../components/SectionTitle';
//custom styles
import {colors} from '../../styles/colors';

export const TagPanel = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View>
      <Text style={styles(theme).panelLabel}>Popular list</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles(theme).tagsList}>
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
        style={styles(theme).tagsList}>
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

export const TagLabel = props => {
  const theme = useContext(ThemeContext).theme;
  return <Text style={styles(theme).taglabel}>{props.label}</Text>;
};

export const AboutPanel = props => {
  const theme = useContext(ThemeContext).theme;
  const [isOpen, setOn] = useState(false);
  return (
    <View>
      <PanelTitle color={props.color} title={props.title} />
      <Paragraph style={{...styles(theme).paragraphStyle, color: props.color}}>
        {isOpen && props.info.overview}
        {!isOpen && props.info.overview.slice(0, 200) + '...'}
      </Paragraph>
      <TouchableOpacity
        onPress={() => {
          setOn(!isOpen);
        }}>
        <Text style={styles(theme).readMore}>Read more</Text>
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
        <View style={styles(theme).flexRow}>
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

const PanelItem = props => (
  <View
    style={[styles(props.theme).flexRow, styles(props.theme).panelItemStyle]}>
    <View style={styles(props.theme).flexDirectionRow}>
      <FontAwesome name="circle" size={10} color={props.item.color} />
      <Text style={styles(props.theme).text}>{props.item.title}</Text>
    </View>
    <Text style={styles(props.theme).text}>{props.item.value}</Text>
  </View>
);
export const SingleAccordionPanel = props => {
  const theme = useContext(ThemeContext).theme;
  const [isOpen, setOn] = useState(false);
  return (
    <View style={{marginBottom: 16}}>
      <TouchableOpacity
        style={{...styles(theme).flexRow, marginBottom: 16}}
        onPress={() => {
          setOn(!isOpen);
        }}>
        <Text style={styles(theme).tealLabel}>{props.label}</Text>
        <FontAwesome
          name={isOpen ? 'angle-up' : 'angle-down'}
          size={22}
          color={theme.colors.text_link}
        />
      </TouchableOpacity>
      {isOpen && (
        <>
          {props.items.map((item, index) => {
            return (
              <PanelItem
                theme={theme}
                item={{
                  title: item.title,
                  color: item.color,
                  value: item.value,
                }}
                key={index}
              />
            );
          })}
        </>
      )}
    </View>
  );
};

const styles = theme =>
  StyleSheet.create({
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
    flexDirectionRow: {
      flexDirection: 'row',
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
    tealLabel: {
      color: theme.colors.text_link,
      fontSize: 22,
    },
    text: {
      color: theme.colors.text_primary,
      fontSize: 13,
      marginLeft: 8,
    },
    panelItemStyle: {
      paddingVertical: 8,
      borderBottomColor: theme.colors.background_secondary,
      borderBottomWidth: 1,
    },
  });
