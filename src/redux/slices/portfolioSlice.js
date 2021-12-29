import {createSlice} from '@reduxjs/toolkit';

import {darkTheme} from '../../utils/constants';

const initialState = {
  theme: darkTheme,
  userInfo: {},
  cryptoPortfolio: [],
  stockPortfolio: [],
  estatePortfolio: [],
  ideaPortfolio: [],
  purchaseStore: {id: 0, amount: 0, quantity: 0, buy: 1},
};
export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState: initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    readUserInfo: state => {
      return state.userInfo;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateUserBalance: (state, action) => {
      let temp = action.payload;
      state.userInfo = {...state.userInfo, account_balance: action.payload};
    },
    updateCardInfo: (state, action) => {
      // state.userInfo = {...state.userInfo, card_info: action.payload};
      state.userInfo.card_info = action.payload;
    },
    updateUserGoals: (state, action) => {
      state.userInfo.goals.push(action.payload);
    },
    setCryptoPortfolio: (state, action) => {
      state.cryptoPortfolio = action.payload;
    },
    setStockPortfolio: (state, action) => {
      state.stockPortfolio = action.payload;
    },
    setIdeaPortfolio: (state, action) => {
      state.ideaPortfolio = action.payload;
    },
    setPurchaseStore: (state, action) => {
      state.purchaseStore = action.payload;
    },
  },
});

export const {
  readUserInfo,
  setUserInfo,
  setCryptoPortfolio,
  setStockPortfolio,
  setIdeaPortfolio,
  updateUserBalance,
  updateCardInfo,
  updateUserGoals,
  setPurchaseStore,
  updateTheme,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
