import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {fetchPortfolio} from '../../utils/firestoreapi';
import {
  setUserInfo,
  setCryptoPortfolio,
  setStockPortfolio,
  setIdeaPortfolio,
} from '../../redux/slices/portfolioSlice';

//custom components
import {HomeHeader} from '../../components/Headers';
import {PanelTitle} from '../../components/SectionTitle';
import {HomeIdeaNewCard, StockNewsCard} from '../../components/Card';
import {SearchInput} from '../../components/Inputs';
import {PopularBubble} from '../../components/BubbleButton';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import Spinner from 'react-native-loading-spinner-overlay';
import {getCryptoNews} from '../../utils/thirdapi';
//api
import {getUserInfo, getIdeaItems} from '../../utils/firestoreapi';
import {ideaImages} from '../../utils/constants';
const getHourDiff = time => {
  const now = new Date();
  const r = Math.round(Math.abs(now.getTime() - time.getTime()) / 3600 / 1000);
  return r;
};
function HomeScreen(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [newsList, setNewsList] = useState([]);
  const theme = useContext(ThemeContext).theme;
  const goIdeaDetail = (type, id) => {
    getIdeaItems(id, type).then(res => {
      let temp = {};
      temp.amount = 1;
      temp.symbol = id;
      temp.type = type;
      temp.ideaDetails = res;
      props.navigation.navigate('Investment', {
        screen: 'IdeaDetailScreen',
        params: {
          item: temp,
        },
      });
    });
  };
  useEffect(() => {
    // auth()
    //   .signInWithEmailAndPassword('luckybrand521@gmail.com', 'CrazyJason1010')
    //   .then(e => {
    //e.user.uid
    // props.navigation.addListener('focus', () => {
    //   setLoading(true);
    getUserInfo('love').then(d => {
      const userId = 'love';
      dispatch(setUserInfo({...d, userId: userId}));
      Promise.all([
        fetchPortfolio(userId, 'crypto'),
        fetchPortfolio(userId, 'stock'),
        fetchPortfolio(userId, 'idea'),
        getCryptoNews('stocks'),
      ])
        .then(values => {
          dispatch(setCryptoPortfolio(values[0].items ? values[0].items : []));
          dispatch(setStockPortfolio(values[1].items ? values[1].items : []));
          dispatch(setIdeaPortfolio(values[2].items ? values[2].items : []));
          setNewsList(values[3].length > 0 ? values[3].slice(0, 3) : []);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          ...investmentStyles.container,
          backgroundColor: theme.colors.background_primary,
        }}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: theme.colors.text_primary}}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        ...investmentStyles.container,
        backgroundColor: theme.colors.background_primary,
      }}>
      <ScrollView>
        <HomeHeader imageSource={require('../../assets/images/avatar1.png')} />
        <SearchInput navigation={props.navigation} />
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="Popular Products"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles(theme).bubbleContainer}>
            <PopularBubble
              label="Movie Lovers"
              image={ideaImages.MVL}
              onPress={() => {
                goIdeaDetail('stock', 'MVL');
              }}
              radius={60}
              position={{x: 20, y: 16}}
            />
            <PopularBubble
              label="NFT"
              image={ideaImages.NFT}
              onPress={() => {
                goIdeaDetail('crypto', 'NFT');
              }}
              radius={40}
              position={{x: 160, y: 8}}
            />
            <PopularBubble
              label="Metaverse"
              image={ideaImages.MTV}
              onPress={() => {
                goIdeaDetail('crypto', 'MTV');
              }}
              radius={60}
              position={{x: 260, y: 16}}
            />
            <PopularBubble
              label="Entertainment"
              labelSize={11}
              image={ideaImages.MGZE}
              onPress={() => {
                goIdeaDetail('stock', 'MGZE');
              }}
              radius={40}
              position={{x: 20, y: 160}}
            />
            <PopularBubble
              label="Gaming NFT"
              image={ideaImages.GNFT}
              onPress={() => {
                goIdeaDetail('crypto', 'GNFT');
              }}
              radius={70}
              position={{x: 130, y: 110}}
            />
            <PopularBubble
              label="GES"
              image={ideaImages.GES}
              onPress={() => {
                goIdeaDetail('stock', 'GES');
              }}
              radius={40}
              position={{x: 300, y: 160}}
            />
          </View>
        </View>
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="New Arrivals"
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ArrivalScreen');
              }}>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10, marginBottom: 10}}>
            <HomeIdeaNewCard
              image={require('../../assets/images/london_apr.png')}
              width={140}
              imageWidth={120}
              imageHeight={120}
              name={'London Apr'}
              symbol={'LNDN'}
              onPress={() => {
                props.navigation.navigate('Investment', {
                  screen: 'RealEstateDetailScreen',
                });
              }}
            />
            <HomeIdeaNewCard
              image={require('../../assets/images/NEWB.jpeg')}
              width={140}
              imageWidth={120}
              imageHeight={120}
              name={'New Banking'}
              symbol={'NEWB'}
              onPress={() => {
                goIdeaDetail('crypto', 'NEWB');
              }}
            />
            <HomeIdeaNewCard
              image={require('../../assets/images/bali.png')}
              width={140}
              imageWidth={120}
              imageHeight={120}
              name={'Bali Villa'}
              symbol={'BAL'}
              onPress={() => {
                props.navigation.navigate('Investment', {
                  screen: 'RealEstateDetailScreen',
                });
              }}
            />
            <HomeIdeaNewCard
              image={require('../../assets/images/NFT.jpeg')}
              width={140}
              imageWidth={120}
              imageHeight={120}
              name={'NFT'}
              symbol={'NFT'}
              onPress={() => {
                goIdeaDetail('crypto', 'NFT');
              }}
            />
            <HomeIdeaNewCard
              image={require('../../assets/images/MGZE.jpeg')}
              width={140}
              imageWidth={120}
              imageHeight={120}
              name={'Millenniums & GenZ Entertainment'}
              symbol={'MGZE'}
              onPress={() => {
                goIdeaDetail('stock', 'MGZE');
              }}
            />
            <HomeIdeaNewCard
              image={require('../../assets/images/GES.jpeg')}
              width={140}
              imageWidth={120}
              imageHeight={120}
              name={'Gamers & E-Sports'}
              symbol={'GES'}
              onPress={() => {
                goIdeaDetail('stock', 'GES');
              }}
            />
          </ScrollView>
        </View>
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="Related News"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          {newsList.length > 0 && (
            <View style={{marginVertical: 20}}>
              {newsList.map((item, index) => {
                if (item.media) {
                  return (
                    <StockNewsCard
                      title={item.title.slice(0, 18) + '...'}
                      content={item.summary}
                      uri={item.media}
                      key={index}
                      newsHour={getHourDiff(new Date(item.published_date))}
                      source={item.link}
                    />
                  );
                }
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = theme =>
  StyleSheet.create({
    bubbleContainer: {
      height: 280,
    },
  });
