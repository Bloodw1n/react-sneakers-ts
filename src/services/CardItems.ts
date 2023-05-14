import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICardItem } from '../models/ICardItem';

export const cardItemsAPI = createApi({
    reducerPath: 'cardItemsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://623ca3ca7efb5abea684d5d3.mockapi.io' }),
    tagTypes: ['CardItems', 'CartItems', 'Orders'],
    endpoints: (build) => ({
        fetchAllCardItems: build.query<ICardItem[], number>({
            query: (limit = 5) => `/items?_limit=${limit}`,
            providesTags: ['CardItems'],
        }),
        fetchCartItems: build.query<ICardItem[], number>({
            query: (limit = 5) => `/cart?_limit=${limit}`,
            providesTags: ['CartItems'],
        }),
        fetchOrders: build.query<ICardItem[], number>({
            query: (limit = 100) => `/orders?_limit=${limit}`,
            providesTags: ['Orders'],
        }),
        addToCartItem: build.mutation<ICardItem, ICardItem>({
            query: (item) => ({
                url: `/cart`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['CartItems'],
        }),
        deleteCartItem: build.mutation<ICardItem, ICardItem>({
            query: ({ id }) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CartItems', 'CardItems'],
        }),
        createOrder: build.mutation({
            query: (items) => ({
                url: `/orders`,
                method: 'POST',
                body: items,
            }),
        }),
    }),
});
