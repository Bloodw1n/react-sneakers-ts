import React, { FC } from 'react';
import { IOrderItem } from '@/models/ICardItem';
import { CardWrapper, CustomContentLoader } from '@/ui';

type PropsType = {
    item: IOrderItem;
    isLoading: boolean;
};

const OrderViewCard: FC<PropsType> = ({ item, isLoading }) => {
    return (
        <CardWrapper width={'300px'} className={'flex w-[270px] items-center gap-[10px]'}>
            {isLoading ? (
                <CustomContentLoader />
            ) : (
                <>
                    <img src={'../../assets/images/order_is_processed.jpg'} alt="sneakers" className={'h-[135px]'} />
                    <div className="flex flex-col">
                        <h5 className="font-bold">Заказ №{item.id}</h5>
                        <div className="flex flex-col mt-[14px]">
                            <span className="font-medium text-xs uppercase text-[#BDBDBD]">Cумма заказа: </span>
                            <b>{item.orderPrice} руб</b>
                        </div>
                    </div>
                </>
            )}
        </CardWrapper>
    );
};

export default OrderViewCard;
