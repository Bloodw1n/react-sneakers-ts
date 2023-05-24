import { api } from '@/api';

export const useCart = () => {
    const { data: cartItems } = api.useFetchCartItemsQuery(7);
    const { data: favorites } = api.useFetchFavoriteItemsQuery(7);
    const totalPrice: number | null = cartItems?.reduce((sum, obj) => obj.price + sum, 0) || null;
    const tax: string | null = (totalPrice && ((totalPrice / 100) * 5).toFixed(2) + 'руб') || null;
    const isItemAdded = (id: number | string): boolean => {
        return cartItems?.some((item) => 'parentId' in item && Number(item?.parentId) === Number(id)) || false;
    };
    const isItemFavorite = (id: number | string): boolean => {
        return favorites?.some((item) => 'parentId' in item && Number(item?.parentId) === Number(id)) || false;
    };
    return { totalPrice, tax, isItemAdded, isItemFavorite };
};
