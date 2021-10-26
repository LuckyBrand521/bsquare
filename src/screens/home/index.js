import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {store} from '../../redux/store';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {fetchPortfolio, getIdeaItems} from '../../utils/firestoreapi';
import {COIN_MARKET_CAP_URL, CMC_PRO_API_KEY} from '../../utils/constants';
import {
  setUserInfo,
  setCryptoPortfolio,
  setStockPortfolio,
  setIdeaPortfolio,
} from '../../redux/slices/portfolioSlice';

//custom components
import {HomeHeader} from '../../components/Headers';
import {PanelTitle} from '../../components/SectionTitle';
import {StockCard} from '../../components/Card';
import {SearchInput} from '../../components/Inputs';
import {TagPanel} from '../../components/TagPanel';
//custom styles
import {investmentStyles} from '../../styles/investment';
import {globalStyles} from '../../styles/global';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');
//test data
import {newsList, earningList, stockList} from '../../store/datalist';
import {
  insertBuyHistory,
  insertSellHistory,
  updateStockNewsOnDB,
} from '../../utils/utils';
import {exchangeCurrency} from '../../utils/common';
import {getCoinListFromCMC} from '../../utils/thirdapi';

function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // getCoinListFromCMC();
    auth()
      .signInWithEmailAndPassword('luckybrand521@gmail.com', 'CrazyJason1010')
      .then(e => {
        const userId = e.user.uid;
        dispatch(setUserInfo({user_id: userId}));
        fetchPortfolio(userId, 'crypto').then(res => {
          dispatch(setCryptoPortfolio(res.items));
          fetchPortfolio(userId, 'stock').then(data => {
            dispatch(setStockPortfolio(data.items));
            fetchPortfolio(userId, 'idea').then(data => {
              dispatch(setIdeaPortfolio(data.items));
              setLoading(false);
            });
          });
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
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
      <ScrollView>
        <HomeHeader imageSource={require('../../assets/images/avatar1.png')} />
        <SearchInput />
        <TagPanel />
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Top Movers" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10}}>
            {stockList.map((item, index) => {
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
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Top Crypto Movers" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10}}>
            {stockList.map((item, index) => {
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
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Top Stock Movers" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10}}>
            {stockList.map((item, index) => {
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
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Top Real Estate Movers" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10}}>
            {stockList.map((item, index) => {
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
        <View style={globalStyles.mvn}>
          <View style={investmentStyles.panelHeader}>
            <PanelTitle title="Top Ideas Movers" />
            <TouchableOpacity>
              <Text style={investmentStyles.greenLabel}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingBottom: 10}}>
            {stockList.map((item, index) => {
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

export default HomeScreen;
