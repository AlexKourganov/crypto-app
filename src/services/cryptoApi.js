import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host":process.env.REACT_APP_CRYPTO_API_COIN_HOST,
  "x-rapidapi-key":process.env.REACT_APP_CRYPTO_API_COIN_KEY
};

console.log(process.env.REACT_APP_CRYPTO_API_COIN_URL);
const baseUrl = process.env.REACT_APP_CRYPTO_API_COIN_URL;

 const currentDate = Math.round((new Date().getTime()) / 1000);
 


const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins/markets?vs_currency=usd&per_page=${count}`),
    }),
    getCryptosGlobal: builder.query({
      query: () => createRequest(`/global`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({coinId,timePeriod}) => createRequest(`/coins/${coinId}/market_chart/range?vs_currency=usd&from=${timePeriod}&to=${currentDate}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),

  }),
});

// Use same name as defined in endpoint but add use and query on both ends
export const { useGetCryptosQuery,useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,useGetExchangesQuery, useGetCryptosGlobalQuery } = cryptoApi;
