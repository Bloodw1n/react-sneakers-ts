import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Favorites from '@/pages/favorite';
import Orders from '@/pages/orders';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import '@testing-library/jest-dom/extend-expect';
describe('TopSneakers', () => {
    const homeProps = {
        isLoading: false,
        items: [
            {
                id: '1',
                title: 'Sneaker 1',
                price: 100,
                imgUrl: 'sneaker1.jpg',
                parentId: '1',
            },
            {
                id: '2',
                title: 'Sneaker 2',
                price: 200,
                imgUrl: 'sneaker2.jpg',
                parentId: '2',
            },
        ],
        cartItems: [
            {
                id: '1',
                title: 'Sneaker 1',
                price: 100,
                imgUrl: 'sneaker1.jpg',
                parentId: '1',
            },
        ],
        favorites: [
            {
                id: '2',
                title: 'Sneaker 2',
                price: 200,
                imgUrl: 'sneaker2.jpg',
                parentId: '2',
            },
        ],
    };

    const favoritesProps = {
        isLoading: false,
        cartItems: [
            {
                id: '1',
                title: 'Sneaker 1',
                price: 100,
                imgUrl: 'sneaker1.jpg',
                parentId: '1',
            },
        ],
        favorites: [
            {
                id: '2',
                title: 'Sneaker 2',
                price: 200,
                imgUrl: 'sneaker2.jpg',
                parentId: '2',
            },
        ],
    };

    const ordersProps = {
        isLoading: false,
        orders: [
            {
                id: '1',
                items: [
                    {
                        id: '1',
                        title: 'Sneaker 1',
                        price: 100,
                        imgUrl: 'sneaker1.jpg',
                        parentId: '1',
                    },
                ],
                orderPrice: 100,
            },
            {
                id: '2',
                items: [
                    {
                        id: '2',
                        title: 'Sneaker 2',
                        price: 200,
                        imgUrl: 'sneaker2.jpg',
                        parentId: '2',
                    },
                ],
                orderPrice: 200,
            },
        ],
    };
    const store = setupStore();
    test('Renders main components with mock data and check routes', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    items={homeProps.items}
                                    cartItems={homeProps.cartItems}
                                    favorites={homeProps.favorites}
                                    isLoading={homeProps.isLoading}
                                />
                            }
                        />
                        <Route
                            path="/favorites"
                            element={
                                <Favorites
                                    favorites={favoritesProps.favorites}
                                    cartItems={favoritesProps.cartItems}
                                    isLoading={favoritesProps.isLoading}
                                />
                            }
                        />
                        <Route
                            path="/orders"
                            element={<Orders orders={ordersProps.orders} isLoading={ordersProps.isLoading} />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Sneaker 1')).toBeInTheDocument();
        expect(screen.getByText('Sneaker 2')).toBeInTheDocument();
    });
});
