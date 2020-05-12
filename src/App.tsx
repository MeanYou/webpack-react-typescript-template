import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.less';

const App = () => {
    return (
        <Provider store={store}>
            React App
        </Provider>
    );
}
export default App;