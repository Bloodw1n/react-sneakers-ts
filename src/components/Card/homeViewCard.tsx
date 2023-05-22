import React, { FC } from 'react';
import { ICardItem } from '../../models/ICardItem';
import { sneakersAPI } from '../../services';
import { useCart } from '../../hooks/useCart';
import { CardWrapper, CustomContentLoader } from '../../ui';

type PropsType = {
    item: ICardItem;
    isLoading: boolean;
    cartItems?: ICardItem[];
    favorites?: ICardItem[];
    isOrdersView?: boolean;
};

const HomeViewCard: FC<PropsType> = ({ item, cartItems, favorites, isLoading }) => {
    const { isItemAdded, isItemFavorite } = useCart();
    const selectedItem: ICardItem = { parentId: item?.id, ...item };
    const [addToCartItem, {}] = sneakersAPI.useAddToCartItemMutation();
    const [deleteCartItem, {}] = sneakersAPI.useDeleteCartItemMutation();
    const [deleteFromFavorites, {}] = sneakersAPI.useDeleteFromFavoritesMutation();
    const [addToFavoriteItem, {}] = sneakersAPI.useAddToFavoriteItemMutation();

    const onClickPlus = () => {
        const findItem = cartItems?.find((item) => item.parentId === selectedItem.id) || null;
        findItem ? deleteCartItem(findItem) : addToCartItem(selectedItem);
    };

    const onClickFavorite = () => {
        const isFavoritePage = window.location.pathname === '/favorites';
        if (!isFavoritePage) {
            const findItem = favorites?.find((item) => item.parentId === selectedItem.id) || null;
            findItem ? deleteFromFavorites(findItem) : addToFavoriteItem(selectedItem);
        } else {
            deleteFromFavorites(selectedItem);
        }
    };

    return (
        <CardWrapper>
            {isLoading ? (
                <CustomContentLoader />
            ) : (
                <>
                    <div style={{ position: 'absolute', cursor: 'pointer' }} onClick={onClickFavorite}>
                        <img
                            src={
                                isItemFavorite(item.parentId ? item.parentId : item.id)
                                    ? '../../assets/images/Add_to_favorites_active.svg'
                                    : '../../assets/images/Add_to_favorites.svg'
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
                                isItemAdded(item.parentId ? item.parentId : item.id)
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
