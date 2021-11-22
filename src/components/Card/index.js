import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {ThemeContext} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import DropShadow from 'react-native-drop-shadow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles.js';
import {BrandColorLabel} from '../Gadgets';
import {SmallLine} from '../SectionTitle';
import {colors, measures} from '../../styles/colors.js';
import {ideaImages} from '../../utils/constants';
const trimText = (text, length) => {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length - 3) + '...';
  }
};
export const NewsCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card
        style={{
          ...styles.card,
          width: props.width,
          backgroundColor: theme.colors.background_secondary,
        }}>
        <Image
          source={{uri: props.uri}}
          style={{
            width: props.imageWidth,
            height: props.imageHeight,
            borderRadius: 10,
            marginTop: 5,
          }}
        />
        <Card.Content style={{paddingLeft: 7}}>
          <Title style={{...styles.title, color: theme.colors.text_primary}}>
            {trimText(props.title, 40)}
          </Title>
          <Paragraph
            style={{...styles.content, color: theme.colors.text_primary}}>
            {trimText(props.content, 120)}
          </Paragraph>
        </Card.Content>

        <Card.Actions>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(props.source);
            }}>
            <Text style={{...styles.content, color: '#5E9FDA'}}>Read more</Text>
          </TouchableOpacity>
        </Card.Actions>
        <Text style={{...styles.dateLabel, color: theme.colors.text_secondary}}>
          {props.date}
        </Text>
      </Card>
    </DropShadow>
  );
};

export const EarningCard = props => {
  const theme = React.useContext(ThemeContext).theme;
  return (
    <Card
      style={{
        ...styles.earningCard,
        backgroundColor: theme.colors.background_secondary,
      }}>
      <Image
        source={{
          uri: props.uri,
        }}
        style={{
          width: props.imageWidth,
          height: props.imageHeight,
          borderRadius: 100,
          marginTop: 5,
        }}
      />
      <Card.Content style={{paddingLeft: 0}}>
        <Title
          style={{...styles.earningTitle, color: theme.colors.text_primary}}>
          {props.title}
        </Title>
        <Paragraph style={styles.earningContent}>
          Past: {props.pastVal}
        </Paragraph>
        <Paragraph style={styles.earningContent}>
          Expected: {props.expectVal}
        </Paragraph>
        <Paragraph style={{...styles.earningContent, color: '#5AC53A'}}>
          {props.leftDays} Days Left
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export const StockNewsCard = props => {
  const theme = React.useContext(ThemeContext).theme;
  return (
    <View style={styles.stockNews}>
      <View style={styles.stockNewsHeader}>
        <Text
          style={{...styles.stockNewsTitle, color: theme.colors.text_primary}}>
          {trimText(props.title, 20)}
        </Text>
        <Text style={{fontSize: 10, color: theme.colors.text_secondary}}>
          {props.newsHour}h{' '}
        </Text>
        {props.newsHour < 10 && (
          <Image
            source={require('../../assets/icons/light_icon.png')}
            style={{width: 9, height: 12}}
          />
        )}
      </View>
      <Card.Content style={styles.stockNewsContent}>
        <Paragraph
          style={{
            ...styles.content,
            flex: 7,
            lineHeight: 18,
            fontSize: 13,
            paddingRight: 40,
            width: '80%',
            color: theme.colors.text_primary,
          }}>
          {trimText(props.content, 120)}
        </Paragraph>
        <Image
          source={{uri: props.uri}}
          style={{
            borderRadius: 10,
            marginTop: 5,
            width: 80,
            height: 80,
          }}
        />
      </Card.Content>

      <Card.Actions style={{paddingLeft: 0}}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(props.source);
          }}>
          <Text style={{...styles.content, color: '#5E9FDA'}}>Read more</Text>
        </TouchableOpacity>
      </Card.Actions>
    </View>
  );
};

export const AnalCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card
        style={{
          ...styles.card,
          width: props.width,
          backgroundColor: theme.colors.background_secondary,
        }}>
        <Card.Content style={{paddingLeft: 7}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Title style={{...styles.title, color: theme.colors.text_primary}}>
              {props.title}
            </Title>
            <Text style={{color: '#83899D', fontSize: 10}}>Nunc</Text>
          </View>
          <Paragraph
            style={{...styles.content, color: theme.colors.text_primary}}>
            {props.content}
          </Paragraph>
        </Card.Content>

        <Card.Actions>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={{...styles.content, color: '#5E9FDA'}}>Read more</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </DropShadow>
  );
};
const images = {
  AAPL: require('../../assets/images/AAPL.png'),
  AMZN: require('../../assets/images/AMZN.png'),
  TSLA: require('../../assets/images/TSLA.png'),
  MSFT: require('../../assets/images/MSFT.png'),
};
export const StockCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Card
      style={{
        ...styles.earningCard,
        paddingBottom: 0,
        backgroundColor: theme.colors.background_secondary,
      }}>
      <Image
        source={images[props.name]}
        style={{
          width: props.imageWidth,
          height: props.imageHeight,
          borderRadius: 100,
          marginTop: 5,
        }}
      />
      <Card.Content style={{paddingLeft: 0, marginTop: 6}}>
        <Title
          style={{
            ...styles.earningTitle,
            fontFamily: 'Helvetica Neue',
            fontWeight: '500',
            marginBottom: 12,
            color: theme.colors.text_primary,
          }}>
          {props.title}
        </Title>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            color: theme.colors.text_primary,
          }}>
          {props.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            color: theme.colors.text_primary,
          }}>
          {props.val}%
        </Text>
      </Card.Content>
    </Card>
  );
};
export const IdeaCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Card
      style={{
        ...styles.earningCard,
        paddingBottom: 0,
        backgroundColor: theme.colors.background_secondary,
      }}>
      <Image
        source={ideaImages[props.symbol]}
        style={{
          width: props.imageWidth,
          height: props.imageHeight,
          borderRadius: 100,
          marginTop: 5,
        }}
      />
      <Card.Content style={{paddingLeft: 0, marginTop: 6}}>
        <Title
          style={{
            ...styles.earningTitle,
            fontFamily: 'Helvetica Neue',
            fontWeight: '500',
            marginBottom: 12,
            color: theme.colors.text_primary,
          }}>
          {props.title}
        </Title>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            color: theme.colors.text_primary,
          }}>
          {props.symbol}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            color: theme.colors.text_primary,
          }}>
          {props.val}%
        </Text>
      </Card.Content>
    </Card>
  );
};

export const CryptoSimilarCard = props => {
  const theme = React.useContext(ThemeContext).theme;
  return (
    <Card
      style={{
        ...styles.earningCard,
        alignItems: 'center',
        backgroundColor: theme.colors.background_secondary,
        borderWidth: 1,
        borderColor: theme.colors.background_secondary,
        paddingBottom: 0,
      }}>
      <Image
        source={{uri: props.coinImage}}
        style={{
          width: props.imageWidth ? props.imageWidth : 45,
          height: props.imageHeight ? props.imageHeight : 45,
          borderRadius: 100,
          marginTop: 5,
        }}
      />
      <Card.Content style={{paddingLeft: 0, alignItems: 'center'}}>
        <Title
          style={{
            ...styles.earningTitle,
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: 12,
            color: theme.colors.text_primary,
          }}>
          {props.title}
        </Title>
        <BrandColorLabel green value={`+${props.increment}%`} />
        <Paragraph
          style={{...styles.earningContent, color: theme.colors.text_primary}}>
          {props.time}H
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export const RealEstatePropertyCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity style={styles.dropShadowStyle}>
      <Card
        style={{
          ...styles.card,
          width: props.width ? props.width : wp('100%') - 12,
          backgroundColor: theme.colors.background_secondary,
        }}>
        <Image
          source={{uri: props.uri}}
          style={{
            width: props.imageWidth,
            height: props.imageHeight,
            borderRadius: 10,
            marginTop: 5,
          }}
        />
        <Card.Content style={{paddingLeft: 7}}>
          <TouchableOpacity
            onPress={() => {
              props.onPress ? props.onPress() : null;
            }}>
            <Title style={{...styles.title, color: theme.colors.text_primary}}>
              {props.title}
            </Title>
          </TouchableOpacity>
          <View>
            <SmallLine
              paddingVertical={12}
              title="Investment"
              bottomBorder
              valueColor={
                props.value1Color ? props.value1Color : colors.greenColor
              }
              value={props.amount}
            />
            <SmallLine
              paddingVertical={12}
              title="Number of tokens"
              bottomBorder
              value={props.tokenNumber}
            />
            <SmallLine
              paddingVertical={12}
              title="EST Value"
              bottomBorder
              value={props.estValue}
            />
            <SmallLine
              paddingVertical={12}
              title="Date bought"
              bottomBorder
              value={props.boughtDate}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export const RealEstateHistoryCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card
        style={{
          ...styles.card,
          width: props.width,
          backgroundColor: theme.colors.background_secondary,
        }}>
        <Image
          source={{uri: props.uri}}
          style={{
            width: props.imageWidth,
            height: props.imageHeight,
            borderRadius: 10,
            marginTop: 5,
          }}
        />
        <Card.Content style={{paddingLeft: 7}}>
          <Title style={styles.title}>{props.title}</Title>
          <View>
            <SmallLine
              paddingVertical={12}
              title="Bought for"
              bottomBorder
              value={props.boughtValue}
            />
            <SmallLine
              paddingVertical={12}
              title="Sold for"
              bottomBorder
              valueColor={props.soldColor ? props.soldColor : colors.greenColor}
              value={props.soldValue}
            />
            <SmallLine
              paddingVertical={12}
              title="Date bought"
              bottomBorder
              value={props.boughtDate}
            />
            <SmallLine
              paddingVertical={12}
              title="P/L"
              bottomBorder
              value={props.plValue}
            />
          </View>
        </Card.Content>
      </Card>
    </DropShadow>
  );
};

export const RealEstateNewCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card
        style={{
          ...styles.card,
          width: props.width,
          backgroundColor: theme.colors.background_secondary,
        }}>
        <Image
          source={{uri: props.uri}}
          style={{
            width: props.imageWidth,
            height: props.imageHeight,
            borderRadius: 10,
            marginTop: 5,
          }}
        />
        <Card.Content style={{paddingLeft: 7}}>
          <View>
            <SmallLine
              bold
              paddingVertical={12}
              title={props.title}
              titleSize={measures.side}
              valueColor={colors.greenColor}
              value={props.value}
            />
          </View>
        </Card.Content>
      </Card>
    </DropShadow>
  );
};

export const RealEstateDocumentCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{
        ...styles.documentPinStyle,
        backgroundColor: theme.colors.background_secondary,
      }}>
      <Text style={{color: theme.colors.text_primary, fontWeight: 'bold'}}>
        <Icon name="paperclip" size={14} color={theme.colors.text_primary} />{' '}
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export const HomeIdeaNewCard = props => {
  const theme = useContext(ThemeContext).theme;
  return (
    <TouchableOpacity
      style={{
        ...styles.dropShadowStyle,
      }}
      onPress={props.onPress}>
      <Card
        style={{
          ...styles.card,
          width: props.width,
          backgroundColor: theme.colors.background_secondary,
          paddingBottom: 0,
        }}>
        <Image
          source={props.image}
          style={{
            width: props.imageWidth,
            height: props.imageHeight,
            borderRadius: 10,
            marginTop: 5,
          }}
        />
        <Card.Content style={{paddingLeft: 0}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 60,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: theme.colors.text_primary,
                  marginTop: 6,
                  fontWeight: '700',
                }}>
                {props.name}
              </Text>
              <Text style={{color: theme.colors.text_primary, marginTop: 6}}>
                {props.price}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: theme.colors.text_secondary}}>
                {props.symbol}
              </Text>
              <Text
                style={{
                  color: theme.colors.green,
                  fontWeight: '500',
                  fontSize: 13,
                }}>
                {props.state}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
