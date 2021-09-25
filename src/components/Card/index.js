import * as React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
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
export const NewsCard = props => {
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card style={{...styles.card, width: props.width}}>
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
          <Paragraph style={styles.content}>{props.content}</Paragraph>
        </Card.Content>

        <Card.Actions>
          <TouchableOpacity>
            <Text style={{...styles.content, color: '#5E9FDA'}}>Read more</Text>
          </TouchableOpacity>
        </Card.Actions>
        <Text style={styles.dateLabel}>{props.date}</Text>
      </Card>
    </DropShadow>
  );
};

export const EarningCard = props => (
  <Card style={styles.earningCard}>
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
      <Title style={styles.earningTitle}>{props.title}</Title>
      <Paragraph style={styles.earningContent}>Past: {props.pastVal}</Paragraph>
      <Paragraph style={styles.earningContent}>
        Expected: {props.expectVal}
      </Paragraph>
      <Paragraph style={{...styles.earningContent, color: '#5AC53A'}}>
        {props.leftDays} Days Left
      </Paragraph>
    </Card.Content>
  </Card>
);

export const StockNewsCard = props => (
  <View style={styles.stockNews}>
    <View style={styles.stockNewsHeader}>
      <Text style={styles.stockNewsTitle}>{props.title}</Text>
      <Text style={{fontSize: 10}}>{props.newsHour}h </Text>
      {props.lightHave && (
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
        }}>
        {props.content}
      </Paragraph>
      <Image
        source={{uri: props.uri}}
        style={{
          borderRadius: 10,
          marginTop: 5,
          width: '15%',
        }}
      />
    </Card.Content>

    <Card.Actions style={{paddingLeft: 0}}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            'https://finance.yahoo.com/video/morgan-stanley-lists-lucid-motors-141208138.html',
          );
        }}>
        <Text style={{...styles.content, color: '#5E9FDA'}}>Read more</Text>
      </TouchableOpacity>
    </Card.Actions>
  </View>
);

export const AnalCard = props => (
  <DropShadow style={styles.dropShadowStyle}>
    <Card style={{...styles.card, width: props.width}}>
      <Card.Content style={{paddingLeft: 7}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Title style={styles.title}>{props.title}</Title>
          <Text style={{color: '#83899D', fontSize: 10}}>Nunc</Text>
        </View>
        <Paragraph style={styles.content}>{props.content}</Paragraph>
      </Card.Content>

      <Card.Actions>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={{...styles.content, color: '#5E9FDA'}}>Read more</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  </DropShadow>
);

export const StockCard = props => (
  <Card style={{...styles.earningCard, paddingBottom: 0}}>
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
    <Card.Content style={{paddingLeft: 0, marginTop: 6}}>
      <Title
        style={{
          ...styles.earningTitle,
          fontFamily: 'Helvetica Neue',
          fontWeight: '500',
          marginBottom: 12,
        }}>
        {props.title}
      </Title>
      <Text style={{fontSize: 16, lineHeight: 20}}>{props.name}</Text>
      <Text style={{fontSize: 16, lineHeight: 20}}>{props.val}%</Text>
    </Card.Content>
  </Card>
);

export const CryptoSimilarCard = props => (
  <Card
    style={{
      ...styles.earningCard,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#EBEFF1',
      paddingBottom: 0,
    }}>
    <Image
      source={props.coinImage}
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
        }}>
        {props.title}
      </Title>
      <BrandColorLabel green value={`+${props.increment}%`} />
      <Paragraph style={styles.earningContent}>{props.time}H</Paragraph>
    </Card.Content>
  </Card>
);

export const RealEstatePropertyCard = props => {
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card
        style={{
          ...styles.card,
          width: props.width ? props.width : wp('100%') - 12,
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
            <Title style={styles.title}>{props.title}</Title>
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
    </DropShadow>
  );
};

export const RealEstateHistoryCard = props => {
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card style={{...styles.card, width: props.width}}>
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
  return (
    <DropShadow style={styles.dropShadowStyle}>
      <Card style={{...styles.card, width: props.width}}>
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
  return (
    <TouchableOpacity style={styles.documentPinStyle}>
      <Text>
        <Icon name="paperclip" size={20} />
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};
