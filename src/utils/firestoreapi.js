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
            return resolve({});
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
            return resolve({});
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
            return resolve({});
          }
        });
    }
  });
};

export async function getIdeaItems(name, type) {
  const collectionName = type == 'crypto' ? 'cryptoIdeaList' : 'stockIdeaList';
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collectionName)
      .doc(name)
      .get()
      .then(documentSnapshot => {
        if (!documentSnapshot.empty) {
          resolve(documentSnapshot.data());
        } else {
          return reject();
        }
      });
  });
}

const stockIds = [
  'VIAC',
  'DIS',
  'NFLX',
  'AMZN',
  'CMCSA',
  'T',
  'SONY',
  'ROKU',
  'AAPL',
  'AMC',
  'CNK',
  'CINE.L',
  'RDI',
  '002739.SZ',
  'IMAX',
  'DLB',
  'EA',
  'ATVI',
  'NTDOY',
  'UBI.PA',
  'TTWO',
  'KONMY',
  'CCOEY',
  'AMD',
  'NVDA',
  'MSFT',
  'TSLA',
  'NIO',
  'GM',
  'LCID',
  'ARVL',
  'BLNK',
  'EVGO',
  'CHPT',
  'PCRFY',
  '051915.KS',
  'QS',
  'RMO',
  'SE',
  'NTES',
  'SQNNY',
  'EMBRAC-B.ST',
  'NEXOY',
  'ZNGA',
  '036570.KS',
  'BILI',
  'KS3.BE',
  'SF',
  '251270.KS',
  '263750.KQ',
  '293490.KQ',
  'DNACF',
  '112040.KQ',
  'DOYU',
  'CRSR',
  'G03.SG',
  'HUYA',
  'IGG.L',
  '078340.KQ',
  'HEAR',
  '069080.KQ',
  'EGLX',
  '1G9.F',
  'GRVY',
  '7QT.F',
  '042420.KQ',
  '067000.KQ',
  '041140.KQ',
  'EOAN.DE',
  'BEPC',
  'CWEN',
  'FSLR',
  'NEE',
  'SEDG',
  'DNNGY',
  'IBE',
  'JKS',
  'VWDRY',
  'GCTAY',
  'CSIQ',
  'SPWR',
  'PLNT',
  'XPOF',
  'LSF',
  'BRBR',
  'NLS',
  'PTON',
  'TGYM.MI',
  'NKE',
  'LULU',
  'UAA',
  'ADS',
];

// export async function setCryptoIdea() {
//   temp = [];
//   ids = makeString(coinIds);
//   const quotes = await axios.get(
//     `http://144.126.146.135/yahoo_stock_quote.php?stockId=${ids}`,
//     {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8',
//       },
//     },
//   );
//   console.log(ids);
//   const quoteRes = quotes.data.quoteResponse.result;
//   for (let i = 0; i < quoteRes.length; i++) {
//     temp.push({
//       stock: coinIds[i].stock,
//       id: coinIds[i].stock,
//       percent: coinIds[i].per,
//       stockDetail: quoteRes[i],
//       amount:
//         coinIds[i].per /
//         10 /
//         (quoteRes[i].regularMarketPrice?.raw
//           ? quoteRes[i].regularMarketPrice.raw
//           : 105),
//       price: quoteRes[i].regularMarketPrice?.raw
//         ? quoteRes[i].regularMarketPrice.raw
//         : 105,
//       change24h: quoteRes[i].regularMarketChange?.raw
//         ? quoteRes[i].regularMarketChange.raw
//         : 0.36,
//     });
//   }
//   firestore()
//     .collection('stockIdeaList')
//     .doc('KSP')
//     .set({
//       items: temp,
//       details: {name: 'Keeping in Shape'},
//       chartData: {},
//     })
//     .then(res => {
//       return res;
//     });
// }

export async function updateUserCardInfo(userId, data) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({card_info: data})
      .then(() => {
        resolve();
      });
  });
}

export async function updateUserInfo(userId, data) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update(data)
      .then(() => {
        resolve();
      });
  });
}

export async function updatePortfolio(userId, collection, data) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(userId)
      .update({items: data})
      .then(() => {
        resolve();
      });
  });
}
