import React, { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Header from '@components/header';
import Favorites from '@/pages/favorite';
import Orders from '@/pages/orders';
import Drawer from '@components/drawer';
import { api } from '@/api';
import './scss/index.scss';

const TopSneakers: FC = (): JSX.Element => {
    const { data: items, isLoading } = api.useFetchAllCardItemsQuery(7);
    const { data: favorites, isLoading: isFavoritesLoading } = api.useFetchFavoriteItemsQuery(7);
    const { data: cartItems } = api.useFetchCartItemsQuery(7);
    const { data: orders, isLoading: isOrdersLoading } = api.useFetchOrdersQuery(14);
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
};

export default TopSneakers;
