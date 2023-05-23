import React, { FC } from 'react';
import { ICardItem } from '@/models/ICardItem';
import HomeViewCard from '@components/Cards/homeViewCard';
import { EmptyPage, PageTitle, PageWrapper } from '@/ui';

type PropsType = {
    isLoading: boolean;
    cartItems: ICardItem[];
    favorites?: ICardItem[];
};
const Favorites: FC<PropsType> = ({ favorites, cartItems, isLoading }) => {
    return (
        <PageWrapper>
            {favorites?.length ? (
                <>
                    <PageTitle>Мои Закладки</PageTitle>

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
        </PageWrapper>
    );
};

export default Favorites;
