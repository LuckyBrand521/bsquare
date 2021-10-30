import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {getCryptoQuoteFromCMC} from './thirdapi';

export function getUserInfo(userId) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          resolve(documentSnapshot.data());
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
}
export async function getSimilarCryptosFromDB(items) {
  let similarIds = [];
  let ids = [];
  for (let i = 0; i < items.length; i++) {
    ids.push(items[i].coin_id);
  }
  for (let i = 0; i < ids.length; i++) {
    if (ids[i] > 1) {
      let nextId = ids[i] + 1;
      while (ids.indexOf(nextId) > 0 || similarIds.indexOf(nextId) > 0) {
        nextId = nextId + 1;
      }
      similarIds.push(nextId);
    }
  }
  let results = [];
  for (let i = 0; i < similarIds.length; i++) {
    let res = await getCryptoQuoteFromCMC(similarIds[i]);
    results.push(res);
  }
  return Promise.resolve(results);
}

export const updateCryptoCurrencyList = items => {
  for (let i = 0; i < items.length; i++) {
    firestore()
      .collection('CryptocurrencyList')
      .add({
        id: items[i].id,
        is_active: items[i].is_active,
        name: items[i].name,
        rank: items[i].rank,
        slug: items[i].slug,
        symbol: items[i].symbol,
      })
      .then(() => {
        console.log(`${i + 1}column added`);
      })
      .catch(err => {});
  }
};

export const insertBuyHistory = (userId, coin_id, amount, price, category) => {
  return new Promise((resolve, reject) => {
    if (category == 'crypto') {
      firestore()
        .collection('crypto-buy-history')
        .add({
          user_id: userId,
          coin_id: coin_id,
          price: price,
          amount: amount,
          time: Date.now(),
        })
        .then(res => {
          return resolve(res);
        })
        .catch(err => reject);
    } else if (category == 'stock') {
      firestore()
        .collection('stock-buy-history')
        .add({
          user_id: userId,
          stock_id: coin_id,
          price: price,
          amount: amount,
          time: Date.now(),
        })
        .then(res => {
          return resolve(res);
        })
        .catch(err => reject);
    }
  });
};

export const insertSellHistory = (userId, coin_id, amount, price, category) => {
  return new Promise((resolve, reject) => {
    if (category == 'crypto') {
      firestore()
        .collection('crypto-sell-history')
        .add({
          user_id: userId,
          coin_id: coin_id,
          price: price,
          amount: amount,
          time: Date.now(),
        })
        .then(res => {
          return resolve(res);
        })
        .catch(err => reject);
    } else if ((category = 'stock')) {
      firestore()
        .collection('stock-sell-history')
        .add({
          user_id: userId,
          stock_id: coin_id,
          price: price,
          amount: amount,
          time: Date.now(),
        })
        .then(res => {
          return resolve(res);
        })
        .catch(err => reject);
    }
  });
};

export const fetchPortfolio = (userId, category) => {
  return new Promise((resolve, reject) => {
    if (category == 'crypto') {
      firestore()
        .collection('crypto-portfolio')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            resolve(documentSnapshot.data());
          } else {
            return reject();
          }
        });
    } else if (category == 'stock') {
      firestore()
        .collection('stock-portfolio')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            resolve(documentSnapshot.data());
          } else {
            return reject();
          }
        });
    } else if (category == 'idea') {
      firestore()
        .collection('idea-portfolio')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            resolve(documentSnapshot.data());
          } else {
            return reject();
          }
        });
    }
  });
};

export async function getIdeaItems(name) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('idea-list')
      .where('symbol', '==', name)
      .get()
      .then(documentSnapshot => {
        if (!documentSnapshot.empty) {
          resolve(documentSnapshot.docs[0].data());
        } else {
          return reject();
        }
      });
  });
}
