import { sneakersAPI } from '../services';

export const useCart = () => {
    const { data: cartItems } = sneakersAPI.useFetchCartItemsQuery(7);
    const { data: favorites } = sneakersAPI.useFetchFavoriteItemsQuery(7);
    const totalPrice = cartItems?.reduce((sum, obj) => obj.price + sum, 0);
    const tax = totalPrice && ((totalPrice / 100) * 5).toFixed(2) + 'руб';
    const isItemAdded = (id: number | string): boolean => {
        return cartItems?.some((item) => 'parentId' in item && Number(item?.parentId) === Number(id)) || false;
    };
    const isItemFavorite = (id: number | string): boolean => {
        return favorites?.some((item) => 'parentId' in item && Number(item?.parentId) === Number(id)) || false;
    };
    return { totalPrice, tax, isItemAdded, isItemFavorite };
};
