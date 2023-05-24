import React, { FC } from 'react';
import { IOrderItem } from '@/models/ICardItem';
import { PageTitle, PageWrapper } from '@/ui';
import OrderViewCard from '@cards/order-view';

type PropsType = {
    orders?: IOrderItem[];
    isLoading: boolean;
};
const Orders: FC<PropsType> = ({ orders, isLoading }): JSX.Element => {
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
