import React, { FC, useState } from 'react';

import { ICardItem } from '../../models/ICardItem';
import HomeViewCard from '../../components/Card/homeViewCard';

type PropsType = {
    items: ICardItem[];
    isLoading: boolean;
    cartItems: ICardItem[];
    favorites: ICardItem[];
};

const Home: FC<PropsType> = ({ items, cartItems, favorites, isLoading = false }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const filteredItems = items?.filter((item) => item.title.toLowerCase().includes(searchValue));
    const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    return (
        <div className="p-[40px]">
            <div className="flex items-center justify-between mb-[40px]">
                <h1 className="m-0 font-bold text-3xl">
                    {searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}
                </h1>
                <div className="flex border border-solid border-gray-200 pr-4 pl-4 rounded-[10px]">
                    <img src="../../assets/images/search.svg" alt="Search" />
                    <input
                        className="border-0 p-3 text-base w-48 focus-visible:outline-0"
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Поиск..."
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                {(isLoading ? [...Array(8)] : filteredItems)?.map((item, index) => (
                    <HomeViewCard
                        key={index}
                        item={item}
                        cartItems={cartItems || []}
                        favorites={favorites || []}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
