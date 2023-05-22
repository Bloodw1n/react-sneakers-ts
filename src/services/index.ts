import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICardItem } from '../models/ICardItem';

export const sneakersAPI = createApi({
    reducerPath: 'cardItemsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://623ca3ca7efb5abea684d5d3.mockapi.io' }),
    tagTypes: ['CardItems', 'CartItems', 'Favorites', 'Orders'],
    endpoints: (build) => ({
        fetchAllCardItems: build.query<ICardItem[], number>({
            query: (limit = 5) => `/items?_limit=${limit}`,
            providesTags: ['CardItems'],
        }),
        fetchCartItems: build.query<ICardItem[], number>({
            query: (limit = 5) => `/cart?_limit=${limit}`,
            providesTags: ['CartItems'],
        }),
        fetchFavoriteItems: build.query<ICardItem[], number>({
            query: (limit = 5) => `/favorites?_limit=${limit}`,
            providesTags: ['Favorites'],
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
        addToFavoriteItem: build.mutation<ICardItem, ICardItem>({
            query: (item) => ({
                url: `/favorites`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['CardItems', 'Favorites'],
        }),
        deleteCartItem: build.mutation<ICardItem, ICardItem>({
            query: ({ id }) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CartItems', 'CardItems'],
        }),
        deleteFromFavorites: build.mutation<ICardItem, ICardItem>({
            query: ({ id }) => ({
                url: `/favorites/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CardItems', 'Favorites'],
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
