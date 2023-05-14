import ContentLoader from 'react-content-loader';
import { CardWrapper } from '../../ui';

import React, { useState, FC } from 'react';
import { ICardItem } from '../../models/ICardItem';
import { cardItemsAPI } from '../../services/CardItems';
import { useCart } from '../../hooks/useCart';

type PropsType = {
    item: ICardItem;
    favorite?: boolean;
    isLoading?: boolean;
    onPlus?: (obj: Object) => void;
    onFavorite?: (obj: Object) => void;
};

const HomeViewCard: FC<PropsType> = ({ item, onFavorite, favorite, isLoading }) => {
    const { data: cartItems } = cardItemsAPI.useFetchCartItemsQuery(7);
    const [addToCartItem, {}] = cardItemsAPI.useAddToCartItemMutation();
    const [deleteCartItem, {}] = cardItemsAPI.useDeleteCartItemMutation();

    const [isFavorite, setIsFavorite] = useState(favorite);
    const selectedItem: ICardItem = { parentId: item?.id, ...item };
    const { isItemAdded } = useCart();
    const onClickPlus = () => {
        const findItem = cartItems?.find((item) => Number(item.parentId) === Number(selectedItem.id)) || null;
        findItem ? deleteCartItem(findItem) : addToCartItem(selectedItem);
    };
    const onClickFavorite = () => {
        if (onFavorite) {
            onFavorite(selectedItem);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <CardWrapper>
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={165}
                    height={256}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="0" rx="167" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    <div style={{ position: 'absolute', cursor: 'pointer' }} onClick={onClickFavorite}>
                        <img
                            src={
                                isFavorite
                                    ? '../../assets/images/Add_to_favourites_active.svg'
                                    : '../../assets/images/Add_to_favourites.svg'
                            }
                            alt="Add_to_favourites"
                        />
                    </div>

                    <img src={item.imgUrl} alt="sneakers" width="100%" height={135} />

                    <h5 className="min-h-[50px]">{item.title}</h5>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col mt-[14px]">
                            <span className="font-medium text-xs uppercase text-[#BDBDBD]">Цена: </span>
                            <b>{item.price} руб</b>
                        </div>
                        <img
                            style={{ cursor: 'pointer' }}
                            onClick={onClickPlus}
                            src={
                                isItemAdded(item.id)
                                    ? '../../assets/images/btn-checked.svg'
                                    : '../../assets/images/btn-plus.svg'
                            }
                            alt="plus"
                        />
                    </div>
                </>
            )}
        </CardWrapper>
    );
};

export default HomeViewCard;
