import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

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

const styles = StyleSheet.create({
  viewContainer: {
    // alignItems: 'center',
    marginTop: measures.side,
  },
  thumbList: {
    marginTop: 8,
  },
});
