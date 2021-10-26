import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  cryptoPortfolio: [],
  stockPortfolio: [],
  estatePortfolio: [],
  ideaPortfolio: [],
};
export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState: initialState,
  reducers: {
    readUserInfo: state => {
      return state.userInfo;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
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
  },
});

export const {
  readUserInfo,
  setUserInfo,
  setCryptoPortfolio,
  setStockPortfolio,
  setIdeaPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
