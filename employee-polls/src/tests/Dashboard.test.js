import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import reducer from "../reducers";
import middleware from "../middleware";
import Dashboard from '../components/Dashboard';

const store = createStore(reducer, middleware);

describe('Dashboard', () => {
    test('compare with previous component snapshot', () => {
        var component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
});