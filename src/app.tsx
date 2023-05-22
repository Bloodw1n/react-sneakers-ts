import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { sneakersAPI } from './services';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorite';
import './scss/index.scss';
import Orders from './pages/Orders';

function App() {
    const { data: items, isLoading } = sneakersAPI.useFetchAllCardItemsQuery(7);
    const { data: favorites, isLoading: isFavoritesLoading } = sneakersAPI.useFetchFavoriteItemsQuery(7);
    const { data: cartItems } = sneakersAPI.useFetchCartItemsQuery(7);
    const { data: orders, isLoading: isOrdersLoading } = sneakersAPI.useFetchOrdersQuery(14);
    const [cartOpened, setCartOpened] = useState<boolean>(false);

    return (
        <div
            className="max-w-[1080px] bg-white rounded-[20px]"
            style={{ margin: '50px auto', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.04)' }}
        >
            <Drawer onClose={() => setCartOpened(false)} isOpen={cartOpened} />
            <Header onClickCart={() => setCartOpened(true)} />
            <Routes>
                <Route
                    path="/"
                    element={<Home items={items} cartItems={cartItems} favorites={favorites} isLoading={isLoading} />}
                />
                <Route
                    path="/favorites"
                    element={
                        <Favorites favorites={favorites} cartItems={cartItems || []} isLoading={isFavoritesLoading} />
                    }
                />
                <Route path="/orders" element={<Orders orders={orders} isLoading={isOrdersLoading} />} />
            </Routes>
        </div>
    );
}

export default App;
