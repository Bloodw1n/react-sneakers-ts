import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

type PropsType = {
    onClickCart: () => void;
};
const Header: FC<PropsType> = ({ onClickCart }) => {
    const { totalPrice } = useCart();
    return (
        <header className="flex justify-between items-center p-[40px]">
            <Link to="/">
                <div className="flex items-center">
                    <img src="../../assets/images/header.png" width="80" alt="logo" className="mr-[16px]" />
                    <div>
                        <h3 className="font-bold text-xl uppercase">React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <nav>
                <ul className="flex items-center">
                    <li onClick={onClickCart} className="flex items-center mr-[30px] cursor-pointer">
                        <img src="../../assets/images/basket.svg" width="18px" alt="basket" className="mr-[10px]" />
                        <span>{totalPrice} руб.</span>
                    </li>
                    <li>
                        <Link to="/favorites">
                            <img
                                src="../../assets/images/like.svg"
                                width="18px"
                                alt="like"
                                className="mr-[30px] cursor-pointer"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <img
                                src="../../assets/images/user.svg"
                                width="18px"
                                alt="user"
                                className="mr-[30px] cursor-pointer"
                            />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
