import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {
  COIN_MARKET_CAP_URL,
  CMC_URL,
  CMC_PRO_API_KEY,
  CMC_CRYPTO_QUOTE_URL,
  CMC_COIN_LIST_URL,
  CMC_NEWS_URL,
  RAPIDAPI_KEY,
  RAPIDAPI_NEWSCATCHER_HOST,
  NEWSCATCHER_API_URL,
  RAPID_STOCK_QUOTE_URL,
  RAPID_STOCK_YAHOO_HOST,
  CURRENCY_EXCHANGE_URL,
  RAPIDAPI_CURRENCY_EXCHANGE_HOST,
  YAHOO_STOCK_CHART_URL,
} from './constants';
import {cvtObjecttoArray, cvtYahooCharttoArray} from './common';
import IdeaHomeScreen from '../screens/ideas';

export const getChartFromCMC = (coinId, range) => {
  return axios
    .get(
      `${CMC_URL}/data-api/v3/cryptocurrency/detail/chart?id=${coinId}&range=${range}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
        },
      },
    )
    .then(res => {
      let obj = res.data.data.points;
      return Promise.resolve(cvtObjecttoArray(obj));
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

export async function getChartsFromCMC(coinId) {
  let data = [];
  let ranges = ['1D', '7D', '1M', '3M', '1Y', 'ALL'];
  for (let i = 0; i < ranges.length; i++) {
    const t = await axios.get(
      `${CMC_URL}/data-api/v3/cryptocurrency/detail/chart?id=${coinId}&range=${ranges[i]}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
        },
      },
    );
    data.push(cvtObjecttoArray(t.data.data.points));
  }
  return Promise.resolve(data);
}

export async function getCoinListFromCMC() {
  const data = await axios.get(CMC_COIN_LIST_URL);
  console.log(data.data.data.cryptoCurrencyList);
}
export async function getStockChartsFromRPD(stockId) {
  let data = [];
  let ranges = ['1d', '5d', '3mo', '6mo', '1y', '5y', 'max'];
  for (let i = 0; i < ranges.length; i++) {
    setTimeout(function () {
      console.log('delay');
    }, 500);
    let parm = ranges[i];
    if (i > 1) {
      parm += '&interval=1d';
    }
    const t = await axios.get(
      `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${stockId}?range=${parm}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'x-rapidapi-host': RAPID_STOCK_YAHOO_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
      },
    );
    data.push({
      chartValues: t.data.chart.result[0].indicators.quote[0].close,
      interval:
        Number(t.data.chart.result[0].timestamp[1]) -
        Number(t.data.chart.result[0].timestamp[0]),
      first_time: Number(t.data.chart.result[0].timestamp[0]),
    });
  }
  return Promise.resolve(data);
}

export const getCryptoQuoteFromCMC = coinId => {
  return axios
    .get(`${CMC_CRYPTO_QUOTE_URL}?id=${coinId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
      },
    })
    .then(res => {
      let obj = res.data.data[coinId.toString()];
      return Promise.resolve(obj);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getStockQuoteFromRPD = stockId => {
  return axios
    .get(`${RAPID_STOCK_QUOTE_URL}${stockId}?modules=price`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-rapidapi-host': RAPID_STOCK_YAHOO_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    })
    .then(res => {
      return Promise.resolve(res.data.quoteSummary.result[0].price);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

//$url = 'https://newscatcher.p.rapidapi.com/v1/search_free?q=cryptocurrency&lang=en&media=True';
export const getCryptoNews = query => {
  return axios
    .get(`${NEWSCATCHER_API_URL}?q=${query}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-rapidapi-host': RAPIDAPI_NEWSCATCHER_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    })
    .then(res => {
      return Promise.resolve(res.data.articles);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getCryptoNewsForIdeas = items => {
  let ids = [];
  let resList = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].ideaDetails.type == 'crypto') {
      for (let j = 0; j < items[i].ideaDetails.items.length; j++) {
        const id = items[i].ideaDetails.items[j].id;
        if (ids.indexOf(id) == -1) {
          ids.push(id);
        }
      }
    }
  }
  const id_str = ids.toString();
  return axios
    .get(`${CMC_NEWS_URL}?coins=${id_str}&page=1&size=${ids.length * 2}`)
    .then(res => {
      for (let i = 0; i < res.data.data.length; i++) {
        if (resList.length == 5) {
          return Promise.resolve(resList);
        } else {
          if (res.data.data[i].cover) {
            resList.push({
              image: res.data.data[i].cover,
              title: res.data.data[i].meta.title,
              content: res.data.data[i].meta.subtitle,
              source: res.data.data[i].meta.sourceUrl,
              time: res.data.data[i].meta.createdAt,
              hour: calcHourDifference(res.data.data[i].meta.createdAt),
            });
          }
        }
      }
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getStockNewsForIdeas = items => {};

export const getCurrencyExchangeRates = query => {
  return axios
    .get(`${CURRENCY_EXCHANGE_URL}${query}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'x-rapidapi-host': RAPIDAPI_CURRENCY_EXCHANGE_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    })
    .then(res => {
      return Promise.resolve(res.data.rates);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

export async function getCryptoIdeaChartData(items) {
  let ideaChartData = await getChartsFromCMC(items[0].id);
  for (var i = 0; i < ideaChartData.length; i++) {
    //for 1D, 1W, etc
    for (var j = 0; j < ideaChartData[i].chartValues.length; j++) {
      ideaChartData[i].chartValues[j] =
        ideaChartData[i].chartValues[j] * items[0].amount;
    }
  }
  for (var i = 1; i < items.length; i++) {
    //for each coin
    const eachCoinChart = await getChartsFromCMC(items[i].id);
    for (var j = 0; j < ideaChartData.length; j++) {
      //for 1D 1W, etc
      for (var k = 0; k < ideaChartData[j].chartValues.length; k++) {
        //1D chart data
        if (eachCoinChart[j]) {
          if (eachCoinChart[j].chartValues[k]) {
            ideaChartData[j].chartValues[k] +=
              items[i].amount * eachCoinChart[j].chartValues[k];
          }
        }
      }
    }
  }
  return Promise.resolve(ideaChartData);
}

export async function getStockIdeaChartData(items) {
  let ideaChartData = await getChartsFromYahoo(items[0].id);
  for (var i = 0; i < ideaChartData.length; i++) {
    //for 1D, 1W, etc
    for (var j = 0; j < ideaChartData[i].chartValues.length; j++) {
      ideaChartData[i].chartValues[j] =
        ideaChartData[i].chartValues[j] * items[0].amount;
    }
  }
  for (var i = 1; i < items.length; i++) {
    //for each coin
    const eachCoinChart = await getChartsFromYahoo(items[i].id);
    for (var j = 0; j < ideaChartData.length; j++) {
      //for 1D 1W, etc
      for (var k = 0; k < ideaChartData[j].chartValues.length; k++) {
        //1D chart data
        if (eachCoinChart[j]) {
          if (eachCoinChart[j].chartValues[k]) {
            ideaChartData[j].chartValues[k] +=
              items[i].amount * eachCoinChart[j].chartValues[k];
          }
        }
      }
    }
  }
  return Promise.resolve(ideaChartData);
}

export async function getChartsFromYahoo(id) {
  ranges = ['1D', '5D', '1Mo'];
  resList = [];
  const exchangeRates = await getCurrencyExchangeRates('USD');
  for (let i = 0; i < ranges.length; i++) {
    temp = await getStockQuoteFromYahoo(id, ranges[i]);
    resList.push(cvtYahooCharttoArray(temp, exchangeRates));
  }
  return Promise.resolve(resList);
}

export async function getStockQuoteFromYahoo(stockId, range) {
  return axios
    .get(`${YAHOO_STOCK_CHART_URL}?stockId=${stockId}&range=${range}`)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
}

//simple utils
const calcHourDifference = time => {
  const d = new Date(time);
  return Math.abs((d.getTime() - new Date().getTime()) / 3600000).toFixed(0);
};
