import React, { FC } from 'react';
import { ICardItem } from '@/models/ICardItem';

type PropsType = {
    item: ICardItem;
    onRemove: (item: ICardItem) => void;
};

const DrawerViewCard: FC<PropsType> = ({ item, onRemove }) => {
    const removeHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        onRemove(item);
    };
    return (
        <div key={item.id} className="cartItem min-h-[120px] flex items-center mb-[20px]">
            <div
                style={{
                    backgroundImage: `url(${item.imgUrl})`,
                }}
                className="cartItemImg"
            ></div>
            <div className="mr-[20px] flex flex-col w-[160px]">
                <p className="mb-[5px]">{item.title}</p>
                <b>{item.price}</b>
            </div>
            <img
                onClick={removeHandler}
                className="removeBtn cursor-pointer"
                src="../../assets/images/cross.svg"
                alt="remove"
            />
        </div>
    );
};

export default DrawerViewCard;
