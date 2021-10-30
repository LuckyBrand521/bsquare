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
