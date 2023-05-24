import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import TopSneakers from '@/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <TopSneakers />
            </Router>
        </Provider>
    </React.StrictMode>
);
