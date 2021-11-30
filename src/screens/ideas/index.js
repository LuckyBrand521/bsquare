import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {StockNewsCard, IdeaCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {IdeaPortfolioPanel, CryptoHistoryPanel} from '../../components/Gadgets';
//custom styles
import {investmentStyles} from '../../styles/investment';
//apis for DB and thirdapi
import {getIdeaPortfolioWithDetail, getMoreIdeas} from '../../utils/utils';
import {getCryptoNews} from '../../utils/thirdapi';
import {ideaHistoryList} from '../../store/datalist';
const getHourDiff = time => {
  const now = new Date();
  const r = Math.round(Math.abs(now.getTime() - time.getTime()) / 3600 / 1000);
  return r;
};
const IdeaHomeScreen = props => {
  const theme = useContext(ThemeContext).theme;
  const [loading, setLoading] = useState(true);
  const [ideaPortfolioList, setIdeaPortfolioList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [ideaList, setIdeaList] = useState([]);
  const portfolio = useSelector(state => state.portfolios.ideaPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  console.log(portfolio);
  useEffect(() => {
    Promise.all([
      getIdeaPortfolioWithDetail(userInfo.user_id, portfolio),
      getCryptoNews('NFT'),
      getMoreIdeas(),
    ])
      .then(values => {
        setIdeaPortfolioList(values[0]);
        setNewsList(values[1].slice(0, 5));
        setIdeaList(values[2]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
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
          textStyle={{color: theme.colors.text_primary}}
          textContent={'Loading...'}
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
      <NavigationHeader
        title=""
        onPress={() => {
          props.navigation.navigate('InvestmentHomeScreen');
        }}
      />
      <ScrollView>
        <SectionTitle
          title="Ideas"
          color={theme.colors.text_primary}
          fontSize={30}
        />
        <View>
          <Text style={{alignSelf: 'center'}} />
          <LottieView
            source={require('../../assets/animations/idea.json')}
            autoPlay
            loop={false}
            style={{height: 240, alignSelf: 'center'}}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="My Portfolio"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <IdeaPortfolioPanel
            navigation={props.navigation}
            items={ideaPortfolioList}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle color={theme.colors.text_primary} title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoHistoryPanel items={ideaHistoryList} />
        </View>
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle
              color={theme.colors.text_primary}
              title="Related News"
            />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
          </View>
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
        </View>
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle color={theme.colors.text_primary} title="More Ideas" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10, marginVertical: 20}}>
            {ideaList.map((item, index) => {
              return (
                <IdeaCard
                  title={item.name}
                  symbol={item.symbol}
                  val={item.percent}
                  key={index}
                  width={246}
                  imageWidth={45}
                  imageHeight={45}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default IdeaHomeScreen;
