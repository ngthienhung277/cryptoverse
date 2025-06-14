import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'e132b4b8f4msh5e82bcb956c40e4p11f683jsnc63b419832a0',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
};

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://cryptocurrency-news2.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "e132b4b8f4msh5e82bcb956c40e4p11f683jsnc63b419832a0");
            headers.set("X-RapidAPI-Host", "cryptocurrency-news2.p.rapidapi.com");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory = '' } = {}) => `/v1/bsc?query=${newsCategory}`,
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
