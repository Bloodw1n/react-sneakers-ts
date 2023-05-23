import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sneakersAPI } from '@/services';

const rootReducer = combineReducers({
    [sneakersAPI.reducerPath]: sneakersAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sneakersAPI.middleware),
    });
};
