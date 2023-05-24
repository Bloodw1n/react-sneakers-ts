import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

export const PageWrapper = styled.div`
    padding: 40px;
`;

export const PageTitle = styled.h1`
    font-weight: bold;
    font-size: 1.875rem;
    line-height: 2.25rem;
    margin-bottom: 40px;
`;
export const CardWrapper = styled.div<{ width?: string }>`
    border: 1px solid #f3f3f3;
    padding: 30px;
    width: ${({ width }) => (width ? width : '220px')};
    border-radius: 40px;
    margin-right: 30px;
    transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
    margin-bottom: 30px;

    &:hover {
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.06);
        transform: translateY(-5px);
    }
`;

type EmptyPageProps = {
    title: string;
    description: string;
    img: string;
};
export const EmptyPage: FC<EmptyPageProps> = ({ title, description, img }) => {
    return (
        <div className="cartEmpty flex flex-col items-center justify-center ">
            <img src={`../assets/images/${img}`} alt="sadness" />
            <h2>{title}</h2>
            <p className="opacity-50">{description}</p>
            <Link to="/" className="greenBtn flex items-center justify-center">
                <img src="../assets/images/arrow.svg" alt="arrow" /> Вернуться назад
            </Link>
        </div>
    );
};

export const CustomContentLoader = () => {
    return (
        <ContentLoader
            speed={2}
            width={165}
            height={256}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
            <rect x="0" y="0" rx="167" ry="5" width="155" height="15" />
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
    );
};

type DrawerFooterProps = {
    createOrder: () => void;
    isLoading: boolean;
    totalPrice?: number | null;
    tax?: string | null;
};

export const DrawerFooter: FC<DrawerFooterProps> = ({ createOrder, totalPrice, tax, isLoading }) => {
    return (
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
            <button disabled={isLoading} onClick={createOrder} className="greenBtn">
                Оформить заказ <img src="../assets/images/arrow.svg" alt="arrow" />
            </button>
        </div>
    );
};
