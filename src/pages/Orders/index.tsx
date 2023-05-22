import React, { FC } from 'react';
import { IOrderItem } from '../../models/ICardItem';
import OrderViewCard from '../../components/Card/orderViewCard';

type PropsType = {
    orders?: IOrderItem[];
    isLoading: boolean;
};
const Orders: FC<PropsType> = ({ orders, isLoading }) => {
    return (
        <div className="content p-[40px]">
            <div className="flex items-center justify-between mb-[40px]">
                <h1 className="m-0 font-bold text-3xl">Мои заказы</h1>
            </div>

            <div className="flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders)?.map((item, index) => (
                    <OrderViewCard key={index} isLoading={isLoading} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Orders;
