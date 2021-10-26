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
