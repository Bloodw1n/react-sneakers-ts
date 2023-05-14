import React, { useState } from 'react';
import './scss/index.scss';
import Drawer from './components/Drawer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { cardItemsAPI } from './services/CardItems';

function App() {
    const { data: items, isLoading } = cardItemsAPI.useFetchAllCardItemsQuery(7);
    const [cartOpened, setCartOpened] = useState<boolean>(false);

    return (
        <div
            className="max-w-[1080px] bg-white rounded-[20px]"
            style={{ margin: '50px auto', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.04)' }}
        >
            <Drawer onClose={() => setCartOpened(false)} isOpen={cartOpened} />
            <Header onClickCart={() => setCartOpened(true)} />
            <Routes>{items && <Route path="/" element={<Home items={items} isLoading={isLoading} />} />}</Routes>
        </div>
    );
}

export default App;
