import React, { FC } from 'react';

type PropsType = {
    title: string;
    image: string;
    description: string;
    onClose: () => void;
};
const Info: FC<PropsType> = ({ title, image, description, onClose }): JSX.Element => {
    return (
        <div className="cartEmpty flex items-center justify-center flex-col mt-[50%]">
            <img className="mb-[20px]" width={120} src={image} alt="empty-cart" />
            <h2>{title}</h2>
            <p className="opacity-50">{description}</p>
            <button onClick={onClose} className="greenBtn flex items-center justify-center">
                <img src="../../assets/images/arrow.svg" alt="arrow" /> Вернуться назад
            </button>
        </div>
    );
};

export default Info;
