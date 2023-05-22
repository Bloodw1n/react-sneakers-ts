import React, { FC } from 'react';
import { useState } from 'react';
import DrawerViewCard from '../Card/drawerViewCard';
import { useCart } from '../../hooks/useCart';
import Info from '../Info';
import { ICardItem } from '../../models/ICardItem';
import { sneakersAPI } from '../../services';

type PropsType = {
    onClose: () => void;
    isOpen: boolean;
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer: FC<PropsType> = ({ onClose, isOpen }) => {
    const { data: cartItems } = sneakersAPI.useFetchCartItemsQuery(7);

    const [deleteCartItem, {}] = sneakersAPI.useDeleteCartItemMutation();
    const [createOrder, { isLoading }] = sneakersAPI.useCreateOrderMutation();

    const [orderId, setOrderId] = useState(null);
    const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false);

    const { totalPrice, tax } = useCart();
    const removeHandler = (item: ICardItem) => {
        deleteCartItem(item);
    };

    const onClickOrder = async () => {
        if (!cartItems) return;

        try {
            const { id } = await createOrder({ items: cartItems, orderPrice: totalPrice }).unwrap();
            setOrderId(id);
            setIsOrderCompleted(true);

            cartItems.forEach((item) => {
                deleteCartItem(item);
                delay(1000);
            });
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
    };

    return (
        <div className={`overlay ${isOpen ? 'overlayVisible' : ''}`}>
            <div className="p-[30px] flex flex-col drawer">
                <h2 className="mb-[30px] flex justify-between font-bold text-2xl">
                    Корзина
                    <img
                        onClick={onClose}
                        className="cursor-pointer"
                        src="../../assets/images/cross.svg"
                        alt="remove"
                    />
                </h2>

                {cartItems?.length ? (
                    <div className="flex flex-col mb-[40px] overflow-hidden">
                        <div className="flex mb-[40px] overflow-auto flex-col pr-[15px]">
                            {cartItems?.map((item: ICardItem, index: number) => (
                                <DrawerViewCard key={index} item={item} onRemove={removeHandler} />
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого</span>
                                    <div></div>
                                    <b>{totalPrice} руб</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{tax}</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenBtn">
                                Оформить заказ <img src="../../assets/images/arrow.svg" alt="arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderCompleted ? 'Заказ оформлен' : 'Корзина пустая'}
                        onClose={onClose}
                        description={
                            isOrderCompleted
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                        image={
                            isOrderCompleted
                                ? '../../assets/images/order_is_processed.jpg'
                                : '../../assets/images/empty-cart.jpg'
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
