import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  LinearGradient,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
//custom components
import {SectionTitle, PanelTitle} from '../../components/SectionTitle';
import {StockNewsCard, StockCard} from '../../components/Card';
import {NavigationHeader} from '../../components/Headers';
import {IdeaPortfolioPanel, CryptoHistoryPanel} from '../../components/Gadgets';
//custom styles
import {investmentStyles} from '../../styles/investment';
//apis for DB and thirdapi
import {getIdeaPortfolioWithDetail} from '../../utils/utils';
import {
  getCryptoNewsForIdeas,
  getCryptoIdeaChartData,
} from '../../utils/thirdapi';
import {ideaHistoryList, ideaList} from '../../store/datalist';
function IdeaHomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [ideaPortfolioList, setIdeaPortfolioList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const portfolio = useSelector(state => state.portfolios.ideaPortfolio);
  const userInfo = useSelector(state => state.portfolios.userInfo);
  const goDetail = useCallback(item => {
    navigation.navigate('IdeaDetailScreen', {item: item});
  }, []);

  useEffect(() => {
    getIdeaPortfolioWithDetail(userInfo.user_id, portfolio).then(res => {
      setIdeaPortfolioList(res);
      // getCryptoIdeaChartData(res[0].ideaDetails.items).then(data => {
      //   console.log('chartssssssssssssssssssssss', data);
      // });
      getCryptoNewsForIdeas(res)
        .then(resList => {
          setNewsList(resList);
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
      <SafeAreaView style={investmentStyles.container}>
        <Spinner visible={loading} textContent={'Loading...'} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={investmentStyles.container}>
      <NavigationHeader
        title=""
        onPress={() => {
          navigation.navigate('InvestmentHomeScreen');
        }}
      />
      <ScrollView>
        <SectionTitle title="Ideas" fontSize={30} />
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
            <PanelTitle title="My Portfolio" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <IdeaPortfolioPanel
            navigation={navigation}
            items={ideaPortfolioList}
          />
        </View>
        <View style={{marginTop: 16}}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="History" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <CryptoHistoryPanel items={ideaHistoryList} />
        </View>
        <View>
          <View style={{...investmentStyles.panelHeader, marginVertical: 20}}>
            <PanelTitle title="Related News" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>Show more</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{marginVertical: 20}}>
            {newsList.map((item, index) => {
              return (
                <StockNewsCard
                  title={item.title}
                  content={item.content}
                  source={item.source}
                  uri={item.image}
                  key={index}
                  newsHour={item.hour}
                  lightHave={true}
                />
              );
            })}
          </View> */}
        </View>
        <View>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="More Ideas" />
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
                <StockCard
                  title={item.title}
                  name={item.name}
                  val={item.val}
                  uri={item.image}
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
}
export default IdeaHomeScreen;
