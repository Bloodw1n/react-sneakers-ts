import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cardItemsAPI } from '../services/CardItems';

const rootReducer = combineReducers({
    [cardItemsAPI.reducerPath]: cardItemsAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardItemsAPI.middleware),
    });
};
