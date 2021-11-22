import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {getCurrencyExchangeRates} from './thirdapi';

export async function exchangeCurrency(base, target, amount) {
  const rateList = await getCurrencyExchangeRates(target);
  return Promise.resolve(amount / parseFloat(rateList[base]));
}

export const getTodayDateString = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
};

export const cvtObjecttoArray = obj => {
  const keys = Object.keys(obj);
  let res = [];
  for (let i = 0; i < keys.length; i++) {
    let c =
      Math.round((parseFloat(obj[keys[i]].v[0]) + Number.EPSILON) * 100) / 100;
    res.push(c);
  }
  return {
    chartValues: res,
    interval: Number(keys[1]) - Number(keys[0]),
    first_time: Number(keys[0]),
  };
};

export const cvtYahooCharttoArray = (obj, exchangeRates) => {
  const quote = obj.data.chart.result[0].indicators.quote[0].close;
  //interpolate the array by replacing null values inside the array
  var earliestIndex = 0;
  var rate = 1;
  if (obj.data.chart.result[0].meta.currency !== 'USD') {
    rate = exchangeRates[obj.data.chart.result[0].meta.currency];
  }
  while (!quote[earliestIndex]) {
    earliestIndex++;
  } //quote[earliestIndex] is the earlest price for the stock
  for (var i = 0; i < quote.length; i++) {
    if (!quote[i]) {
      quote[i] = quote[earliestIndex] / rate;
    } else {
      quote[i] = quote[i] / rate;
      earliestIndex = i;
    }
  }
  return {
    chartValues: quote,
    interval:
      obj.data.chart.result[0].timestamp[1] -
      obj.data.chart.result[0].timestamp[0],
    first_time: obj.data.chart.result[0].timestamp[0],
  };
};

export async function calcQuoteFromYahooData(obj) {
  let priceQuote = obj.chart.result[0].indicators.quote[0].close;
  priceQuote = await interpolateArray(
    priceQuote,
    obj.chart.result[0].meta.currency,
  );
  return {
    current_price: priceQuote[priceQuote.length - 1],
    daily_change:
      ((priceQuote[priceQuote.length - 1] - priceQuote[0]) / priceQuote[0]) *
      100,
    name: obj.chart.result[0].meta.symbol,
    symbol: obj.chart.result[0].meta.symbol,
    slug: obj.chart.result[0].meta.symbol,
  };
}

export async function interpolateArray(arr, currency) {
  var earliestIndex = 0;
  if (currency !== 'USD') {
    const res = await getCurrencyExchangeRates('USD');
    rate = res[currency];
    while (!arr[earliestIndex]) {
      earliestIndex++;
    } //arr[earliestIndex] is the earlest price for the stock
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        arr[i] = arr[earliestIndex] / rate;
      } else {
        arr[i] = arr[i] / rate;
        earliestIndex = i;
      }
    }
    return arr;
  } else {
    while (!arr[earliestIndex]) {
      earliestIndex++;
    } //arr[earliestIndex] is the earlest price for the stock
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        arr[i] = arr[earliestIndex];
      } else {
        earliestIndex = i;
      }
    }
    return arr;
  }
}

export async function getStockData(stockId) {
  Promise.all([
    fetch('http://144.126.146.135/yahoo_stock_report.php?stockId=AAPL'),
    fetch('http://144.126.146.135/yahoo_stock_summary.php?stockId=AAPL'),
  ]).then(res => {
    return Promise.resolve(res);
  });
}

export async function getDataFromFS(stockId) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('stockList')
      .doc(stockId)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        } else {
          return resolve({});
        }
      });
  });
}

export async function getDetailFromYahoo(stockId) {
  return axios(
    `http://144.126.146.135/yahoo_stock_summary.php?stockId=${stockId}`,
  )
    .then(res => {
      return Promise.resolve(res.data.quoteSummary.result[0]);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
}

export async function getReportFromYahoo(stockId) {
  return axios(
    `http://144.126.146.135/yahoo_stock_report.php?stockId=${stockId}`,
  )
    .then(res => {
      return Promise.resolve(res.data.finance.result.reports);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
}

export async function getStockNewsFromNasdaq(stockId) {
  const base = 'https://nasdaq.com';
  return axios(`http://144.126.146.135/nasdaq-news.php?stockId=${stockId}`)
    .then(res => {
      return Promise.resolve(res.data.data.rows);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
}

export async function addCardToAccount(
  userId,
  balance,
  name = 'Mohammed Anderson',
  type = 1,
) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        card_info: {
          balance: balance,
          created_at: new Date().getTime(),
          expiration_date: '12/31/2023',
          holder_name: name,
          type: type,
        },
      })
      .then(() => {
        resolve();
      })
      .catch(err => reject);
  });
}
