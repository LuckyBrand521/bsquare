//Coinmarketcap api links
export const COIN_MARKET_CAP_URL = 'https://pro-api.coinmarketcap.com';
export const CMC_URL = 'https://api.coinmarketcap.com';
export const CMC_CRYPTO_QUOTE_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
export const CMC_PRO_API_KEY = 'df9a2828-48f0-4bcf-87c5-5d30ff2b1dfe';
// export const CMC_PRO_API_KEY = 'c7c0f900-e442-43e4-87f3-148b46576c13';
// export const NEWSCATCHER_API_URL =
//   'https://newscatcher.p.rapidapi.com/v1/search_free?q=cryptocurrency&lang=en&media=True';
export const NEWSCATCHER_API_URL = 'https://api.mailjet.com/v3.1/send';
export const CURRENCY_EXCHANGE_URL =
  'https://exchangerate-api.p.rapidapi.com/rapid/latest/';
export const CMC_COIN_LIST_URL =
  'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&sortBy=market_cap&sortType=desc&convert=USD&cryptoType=all';
export const CMC_NEWS_URL = 'https://api.coinmarketcap.com/content/v3/news';
//Rapid api links
export const RAPIDAPI_KEY =
  '13b706202dmsh1a7ce8a2380b8a9p1a165fjsn1ece4a32a395';
// export const RAPIDAPI_KEY = 'ddc3c71a56msh4a63be8a3aaacfap1e3edcjsn660ce693aaf3';
export const RAPIDAPI_NEWSCATCHER_HOST = 'newscatcher.p.rapidapi.com';
export const RAPIDAPI_CURRENCY_EXCHANGE_HOST =
  'exchangerate-api.p.rapidapi.com';

///Stock API links
export const RAPID_STOCK_QUOTE_URL =
  'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v11/finance/quoteSummary/';
export const RAPID_STOCK_YAHOO_HOST =
  'stock-data-yahoo-finance-alternative.p.rapidapi.com';
// export const YAHOO_STOCK_CHART_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/'.$_REQUEST['stockId'].'?range='.$_REQUEST['range'];
export const YAHOO_STOCK_CHART_URL =
  'https://query1.finance.yahoo.com/v8/finance/chart/';

// Utility variables for temporay usage
export const UPLOADED_IMAGES = 'http://144.126.146.135:80/images/';

//theme variables
export const darkTheme = {
  colors: {
    teal: '#4FA1B8',
    blue: '#417CB8',
    green: '#5EB330',
    red: '#C55739',
    brand_green: '#5EB230',
    brand_blue: '#417CB8',
    brand_red: '#C55739',
    brand_teal: '#4FA1B8',
    background_primary: '#0A0715',
    background_secondary: '#2A2E3B',
    background_third: '#83899D',
    background_tertiary: 'rgba(46, 61, 66, 0.5)',
    secondary: 'rgba(97, 133, 153, 0.15)',
    text_primary: '#F5F7F8',
    text_secondary: '#959FA4',
    text_link: '#5E9FDA',
    text_positive: '#52AC76',
    status_negative: '#9B2A56',
  },
};
export const lightTheme = {
  colors: {
    teal: '#6CE4FE',
    blue: '#58AFFF',
    green: '#5AC53A',
    red: '#E45A28',
    brand_blue: '#417CB8',
    brand_red: '#C55739',
    brand_green: '#5EB230',
    brand_teal: '#6CE4FE',
    background_primary: '#FFF',
    background_secondary: '#F5F7F8',
    background_third: '#EBEFF1',
    background_tertiary: 'rgba(46, 61, 66, 0.5)',
    secondary: 'rgba(97, 133, 153, 0.15)',
    text_primary: '#2A2E3B',
    text_secondary: '#83899D',
    text_link: '#5E9FDA',
    text_positive: '#52AC76',
    status_negative: '#DA3973',
  },
};
export const ideaImages = {
  GNFT: require('../../src/assets/images/GNFT.jpeg'),
  INS: require('../../src/assets/images/INS.jpeg'),
  LPD: require('../../src/assets/images/LPD.jpeg'),
  MTV: require('../../src/assets/images/MTV.jpeg'),
  NEWB: require('../../src/assets/images/NEWB.jpeg'),
  NFT: require('../../src/assets/images/NFT.jpeg'),
  ELCI: require('../../src/assets/images/ELCI.jpeg'),
  GES: require('../../src/assets/images/GES.jpeg'),
  GRE: require('../../src/assets/images/GRE.jpeg'),
  KSP: require('../../src/assets/images/KSP.jpeg'),
  MGZE: require('../../src/assets/images/MGZE.jpeg'),
  MVL: require('../../src/assets/images/MVL.jpeg'),
};
export const homeNewArrivals = [
  {
    name: 'London Apr',
    symbol: 'LNDN',
    image: require('../../src/assets/images/london_apr.png'),
  },
  {
    name: 'Bali Villa',
    symbol: 'BAL',
    image: require('../../src/assets/images/bali.png'),
  },
];
