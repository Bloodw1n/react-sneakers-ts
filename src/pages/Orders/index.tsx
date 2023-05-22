import React, { FC } from 'react';
import OrderViewCard from '../../components/Cards/orderViewCard';
import { IOrderItem } from '../../models/ICardItem';
import { PageTitle, PageWrapper } from '../../ui';

type PropsType = {
    orders?: IOrderItem[];
    isLoading: boolean;
};
const Orders: FC<PropsType> = ({ orders, isLoading }) => {
    return (
        <PageWrapper>
            <PageTitle>Мои заказы</PageTitle>
            <div className="flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders)?.map((item, index) => (
                    <OrderViewCard key={index} isLoading={isLoading} item={item} />
                ))}
            </div>
        </PageWrapper>
    );
};

export default Orders;
