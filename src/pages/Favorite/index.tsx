import React, { FC } from 'react';
import { ICardItem } from '../../models/ICardItem';
import HomeViewCard from '../../components/Card/homeViewCard';
import { EmptyPage } from '../../ui';

type PropsType = {
    favorites: ICardItem[] | undefined;
    isLoading: boolean;
    cartItems: ICardItem[];
};
const Favorites: FC<PropsType> = ({ favorites, cartItems, isLoading }) => {
    return (
        <div className="p-[40px] ">
            {favorites?.length ? (
                <>
                    <div className="flex items-center justify-between mb-[40px]">
                        <h1 className="m-0 font-bold text-3xl">Мои закладки</h1>
                    </div>

                    <div className="flex flex-wrap">
                        {favorites.map((item, index) => (
                            <HomeViewCard
                                key={index}
                                item={item}
                                favorites={favorites}
                                cartItems={cartItems}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <EmptyPage
                    title={'Закладок нет :('}
                    description={'Вы ничего не добавляли в закладки'}
                    img={'sadness.png'}
                />
            )}
        </div>
    );
};

export default Favorites;
