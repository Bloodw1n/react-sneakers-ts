import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardWrapper = styled.div`
    border: 1px solid #f3f3f3;
    padding: 30px;
    width: 220px;
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
