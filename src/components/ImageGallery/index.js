import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';

//custom styles
import {colors, measures} from '../../styles/colors.js';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
//test data
import {realestateHistoryList} from '../../store/datalist';

export const ImageGallery = props => {
  const [indexSelected, setIndexSelected] = useState(0);
  const carouselRef = useRef();
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };
  const onTouchThumbnail = touched => {
    if (touched === indexSelected) {
      return;
    }
    carouselRef?.current?.snapToItem(touched);
  };
  return (
    <View style={styles.viewContainer}>
      <Carousel
        ref={carouselRef}
        layout="default"
        data={props.items}
        sliderWidth={wp('100%')}
        itemWidth={wp('100%') - 32}
        onSnapToItem={index => onSelect(index)}
        renderItem={({item, index}) => (
          <Image
            key={index}
            style={{width: wp('100%') - 32, height: 200, borderRadius: 10}}
            resizeMode="cover"
            source={{uri: item.image}}
          />
        )}
      />
      <FlatList
        horizontal={true}
        data={realestateHistoryList}
        style={styles.thumbList}
        // style={{position: 'absolute', bottom: 80}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: measures.side,
        }}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              onTouchThumbnail(index);
            }}
            activeOpacity={0.9}>
            <Image
              style={{
                width: measures.thumbsize,
                height: measures.thumbsize,
                marginRight: measures.side,
                borderRadius: 8,
                borderWidth: index === indexSelected ? 2 : 0.75,
                borderColor:
                  index === indexSelected ? colors.greenColor : 'white',
                opacity: index === indexSelected ? 1 : 0.6,
              }}
              source={{uri: item.image}}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export const CardTemplateGallery = props => {
  const [indexSelected, setIndexSelected] = useState(props.tempId);
  const carouselRef = useRef();
  const colors = ['#5EB330', '#2A2E3B', '#C55739'];
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    props.handleChange(indexSelected);
  };
  const onTouchThumbnail = touched => {
    if (touched === indexSelected) {
      return;
    }
    carouselRef?.current?.snapToItem(touched);
  };
  return (
    <View>
      <Carousel
        ref={carouselRef}
        layout="default"
        data={props.items}
        sliderWidth={wp('100%')}
        itemWidth={wp('70%')}
        onSnapToItem={index => onSelect(index)}
        renderItem={({item, index}) => (
          <CardItem key={index} backgroundColor={colors[index]} type={index} />
        )}
      />
      <FlatList
        horizontal={true}
        data={props.items}
        style={styles.bulletList}
        // style={{position: 'absolute', bottom: 80}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: measures.side,
        }}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              onTouchThumbnail(index);
            }}
            activeOpacity={0.9}
            style={[
              styles.bullet,
              index === indexSelected
                ? styles.activeBullet
                : styles.normalBullet,
            ]}
          />
        )}
      />
    </View>
  );
};

const CardItem = props => {
  return (
    <View
      style={{...styles.cardImagePart, backgroundColor: props.backgroundColor}}>
      <Text style={styles.visaSign}>Visa</Text>
      <Icon name="check" color="white" size={24} style={styles.checkIcon} />
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    // alignItems: 'center',
    marginTop: measures.side,
  },
  thumbList: {
    marginTop: 8,
  },
  bulletList: {
    marginTop: 16,
    alignSelf: 'center',
  },
  bullet: {
    width: 12,
    height: 12,
    marginHorizontal: 6,
    borderRadius: 20,
  },
  activeBullet: {
    backgroundColor: '#5EB330',
  },
  normalBullet: {
    backgroundColor: '#83899D',
  },
  cardContainer: {},
  cardImagePart: {
    width: 280,
    height: 170,
    borderRadius: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    bottom: 18,
  },
  visaSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    marginLeft: 17,
    marginTop: 16,
  },
  checkIcon: {
    backgroundColor: '#5EB330',
    borderRadius: 100,
    width: 30,
    height: 30,
    paddingTop: 3,
    textAlign: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
