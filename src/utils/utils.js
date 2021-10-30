import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {
  getChartFromCMC,
  getCryptoQuoteFromCMC,
  getCryptoNews,
  getStockQuoteFromRPD,
  getStockQuoteFromYahoo,
} from './thirdapi';
import {
  getTodayDateString,
  cvtObjecttoArray,
  interpolateArray,
  calcQuoteFromYahooData,
} from './common';
import {getIdeaItems} from './firestoreapi';
//crypto related functions

const getBuyHistory = (userId, category) => {
  return new Promise((resolve, reject) => {
    if (category == 'crypto') {
      firestore()
        .collection('crypto-buy-history')
        .where('user_id', '==', userId)
        // .orderBy('time', 'desc')
        .get()
        .then(querySnapshot => {
          resolve(querySnapshot);
        });
    } else if (category == 'stock') {
      firestore()
        .collection('stock-buy-history')
        .where('user_id', '==', userId)
        // .orderBy('time', 'desc')
        .get()
        .then(querySnapshot => {
          resolve(querySnapshot);
        });
    }
  });
};
const getSellHistory = (userId, category) => {
  return new Promise((resolve, reject) => {
    if (category == 'crypto') {
      firestore()
        .collection('crypto-sell-history')
        .where('user_id', '==', userId)
        // .orderBy('time', 'desc')
        .get()
        .then(querySnapshot => {
          return resolve(querySnapshot);
        });
    } else if (category == 'stock') {
      firestore()
        .collection('stock-sell-history')
        .where('user_id', '==', userId)
        // .orderBy('time', 'desc')
        .get()
        .then(querySnapshot => {
          return resolve(querySnapshot);
        });
    }
  });
};

export async function calcCryptosDayChange(userId, items) {
  let total_last = 0,
    total_current = 0,
    daily_change = 0,
    current_total_value = 0,
    total_bought = 0,
    total_sell = 0;
  let current_portfolio = [];
  for (let i = 0; i < items.length; i++) {
    const coin_id = items[i].coin_id;
    const amount = items[i].amount;
    const quote = await getCryptoQuoteFromCMC(coin_id);
    let price = quote.quote.USD.price;
    let change = quote.quote.USD.percent_change_24h;
    total_last += (price * amount * (100 - change)) / 100;
    total_current += price * amount;
    current_portfolio.push({
      coin_id: coin_id,
      quantity: amount,
      current_price: price,
      bought: 0,
      pl: 0,
      bought_amount: 0,
      coin_name: '',
      coin_symbol: '',
    });
  }
  if (total_current == 0) {
    return Promise.resolve({daily_change: 0, total_value: 0, current_pl: 0});
  }
  daily_change = ((total_current - total_last) / total_last) * 100;

  const buyHistory = await getBuyHistory(userId, 'crypto');
  const sellHistory = await getSellHistory(userId, 'crypto');
  buyHistory.docs.forEach(doc => {
    total_bought += doc.data().amount * doc.data().price;
    for (let i = 0; i < current_portfolio.length; i++) {
      if (current_portfolio[i].coin_id == doc.data().coin_id) {
        current_portfolio[i].bought += doc.data().amount * doc.data().price;
        current_portfolio[i].bought_amount += doc.data().amount;
      }
    }
  });
  sellHistory.docs.forEach(doc => {
    total_sell += doc.data().amount * doc.data().price;
  });
  const current_pl =
    ((total_sell + total_current - total_bought) / total_bought) * 100;

  current_portfolio.map((item, index) => {
    firestore()
      .collection('CryptocurrencyList')
      .where('id', '==', item.coin_id)
      .limit(1)
      .get()
      .then(row => {
        item.coin_name = row.docs[0].data().slug;
        item.coin_symbol = row.docs[0].data().symbol.toLowerCase();
      });
    item.pl =
      ((item.current_price - item.bought / item.bought_amount) /
        item.current_price) *
      100;
  });
  const last_history = sellHistory
    ? sellHistory.docs[0].data()
    : buyHistory.docs[0].data();
  if (total_last && current_pl) {
    return Promise.resolve({
      daily_change: daily_change.toFixed(1),
      total_value: total_current.toFixed(1),
      profit: current_pl.toFixed(1),
      current_portfolio: current_portfolio,
      history: sellHistory ? sellHistory.docs[0] : buyHistory.docs[0].data(),
    });
  } else {
    return Promise.reject();
  }
}
export async function updateCryptoNewsOnDB(query) {
  let data = await getCryptoNews(query);
  return new Promise((resolve, reject) => {
    if (data.length > 0) {
      for (let i = 0; i < 50; i++) {
        firestore()
          .collection('crypto-news-list')
          .add({
            updateDate: getTodayDateString(),
            article: data[i],
          })
          .then(res => {})
          .catch(err => reject);
      }
      return resolve();
    } else {
      return reject();
    }
  });
}

export async function getCryptoNewsFromDB(query) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('crypto-news-list')
      .where('updateDate', '==', getTodayDateString())
      .limit(10)
      .get()
      .then(res => {
        return resolve(res.docs);
      })
      .catch(err => {});
  });
}

/*
  Stock related functions
*/
export async function calcStockDayChange(userId, items) {
  let total_last = 0,
    total_current = 0,
    daily_change = 0,
    current_total_value = 0,
    total_bought = 0,
    total_sell = 0;
  let current_portfolio = [];
  for (let i = 0; i < items.length; i++) {
    const stock_id = items[i].stock_id;
    const amount = items[i].amount;
    const quote = await getStockQuoteFromRPD(stock_id);
    let price = quote.regularMarketPrice.raw;
    let change = quote.regularMarketChangePercent.raw;
    total_last += price * amount * (1 - change);
    total_current += price * amount;
    current_portfolio.push({
      stock_id: stock_id,
      quantity: amount,
      current_price: price,
      bought: 0,
      pl: 0,
      bought_amount: 0,
      stock_name: quote.shortName,
      stock_symbol: quote.symbol,
    });
  }
  if (total_current == 0) {
    return Promise.resolve({daily_change: 0, total_value: 0, current_pl: 0});
  }
  daily_change = ((total_current - total_last) / total_last) * 100;

  const buyHistory = await getBuyHistory(userId, 'stock');
  const sellHistory = await getSellHistory(userId, 'stock');
  buyHistory.docs.forEach(doc => {
    total_bought += doc.data().amount * doc.data().price;
    for (let i = 0; i < current_portfolio.length; i++) {
      if (current_portfolio[i].stock_id == doc.data().stock_id) {
        current_portfolio[i].bought += doc.data().amount * doc.data().price;
        current_portfolio[i].bought_amount += doc.data().amount;
      }
    }
  });
  sellHistory.docs.forEach(doc => {
    total_sell += doc.data().amount * doc.data().price;
  });
  const current_pl =
    ((total_sell + total_current - total_bought) / total_bought) * 100;

  current_portfolio.map((item, index) => {
    item.pl =
      ((item.current_price - item.bought / item.bought_amount) /
        item.current_price) *
      100;
  });
  const last_history = sellHistory
    ? sellHistory.docs[0].data()
    : buyHistory.docs[0].data();
  if (total_last && current_pl) {
    return Promise.resolve({
      daily_change: daily_change,
      total_value: total_current,
      profit: current_pl,
      current_portfolio: current_portfolio,
      history: sellHistory ? sellHistory.docs[0] : buyHistory.docs[0].data(),
    });
  } else {
    return Promise.reject();
  }
}

export async function updateStockNewsOnDB(query) {
  let data = await getCryptoNews(query);
  return new Promise((resolve, reject) => {
    if (data.length > 0) {
      for (let i = 0; i < 25; i++) {
        firestore()
          .collection('stock-news-list')
          .add({
            updateDate: getTodayDateString(),
            article: data[i],
          })
          .then(res => {})
          .catch(err => reject);
      }
      return resolve();
    } else {
      return reject();
    }
  });
}

export async function getStockNewsFromDB(query) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('stock-news-list')
      .where('updateDate', '==', getTodayDateString())
      .limit(10)
      .get()
      .then(res => {
        return resolve(res.docs);
      })
      .catch(err => {});
  });
}

/*
  Idea realted functions
*/
export async function calcIdeasDayChange(userId, items, category) {
  if (category == 'crypto') {
    let total_last = 0,
      total_current = 0,
      daily_change = 0;
    let current_portfolio = [];
    for (let i = 0; i < items.length; i++) {
      const coin_id = items[i].id;
      const amount = items[i].amount;
      const quote = await getCryptoQuoteFromCMC(coin_id);
      let price = quote.quote.USD.price;
      let change = quote.quote.USD.percent_change_24h;
      total_last += (price * amount * (100 - change)) / 100;
      total_current += price * amount;
      current_portfolio.push({
        coin_id: coin_id,
        quantity: amount,
        current_price: price,
        coin_name: quote.name,
        coin_symbol: quote.symbol,
        coin_slug: quote.slug,
        change: change,
        percentage: 0,
      });
    }
    if (total_current == 0) {
      return Promise.resolve({daily_change: 0, total_value: 0, current_pl: 0});
    }
    daily_change = ((total_current - total_last) / total_last) * 100;
    current_portfolio.map((item, index) => {
      item.percentage = (
        ((item.quantity * item.current_price) / total_current) *
        100
      ).toFixed(1);
    });
    if (total_last) {
      return Promise.resolve({
        daily_change: daily_change.toFixed(1),
        total_value: total_current.toFixed(2),
        total_last: total_last.toFixed(2),
        current_portfolio: current_portfolio,
      });
    } else {
      return Promise.reject();
    }
  } else if (category == 'stock') {
    let total_last = 0,
      total_current = 0,
      daily_change = 0;
    let current_portfolio = [];
    for (let i = 0; i < items.length; i++) {
      const stock_id = items[i].id;
      const amount = items[i].amount;
      const quoteFromYahoo = await getStockQuoteFromYahoo(stock_id, '1D');
      const prices = await calcQuoteFromYahooData(quoteFromYahoo.data);
      let price = prices.current_price;
      let change = prices.daily_change;
      total_last += (price * amount * (100 - change)) / 100;
      total_current += price * amount;
      current_portfolio.push({
        id: stock_id,
        quantity: amount,
        current_price: price,
        name: prices.name,
        symbol: prices.symbol,
        slug: prices.slug,
        change: change,
        percentage: 0,
      });
    }
    if (total_current == 0) {
      return Promise.resolve({daily_change: 0, total_value: 0, current_pl: 0});
    }
    daily_change = ((total_current - total_last) / total_last) * 100;
    current_portfolio.map((item, index) => {
      item.percentage = (
        ((item.quantity * item.current_price) / total_current) *
        100
      ).toFixed(1);
    });
    if (total_last) {
      return Promise.resolve({
        daily_change: daily_change.toFixed(1),
        total_value: total_current.toFixed(2),
        total_last: total_last.toFixed(2),
        current_portfolio: current_portfolio,
      });
    } else {
      return Promise.reject();
    }
  }
}

export async function getIdeaPortfolioWithDetail(userId, items) {
  let resList = [];
  for (let i = 0; i < items.length; i++) {
    let temp = {};
    temp.amount = items[i].amount;
    temp.symbol = items[i].idea_id;
    temp.ideaDetails = await getIdeaItems(items[i].idea_id);
    temp.analysis = await calcIdeasDayChange(
      userId,
      temp.ideaDetails.items,
      temp.ideaDetails.type,
    );
    resList.push(temp);
  }
  return Promise.resolve(resList);
}
