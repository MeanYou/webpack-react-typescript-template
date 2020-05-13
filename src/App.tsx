import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.less';
import PrivateRoute from './components/PrivateRoute';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/login'));
const Main = lazy(() => import(/* webpackChunkName: "Main" */ './pages/main'));

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Suspense fallback={<div>...loading</div>}>
                    <Switch>
                        <Route path="/login" component={Login} />
                        {/* <PrivateRoute path="/" component={Main} /> */}
                        <Route path="/main" component={Main} />
                        <Redirect from="/" to="/main" />
                    </Switch>
                </Suspense>
            </Router>
        </Provider>
    );
}
export default App;