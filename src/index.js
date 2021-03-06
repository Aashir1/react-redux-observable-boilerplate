import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store/index';
import { Provider } from 'react-redux';
import Routes from './Routes';

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
