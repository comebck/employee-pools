import * as React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';

import reducer from "../reducers";
import middleware from "../middleware";
import { handleInitialData } from '../actions/shared';
import Login from '../components/Login';

const store = createStore(reducer, middleware);

describe('Login', () => {
    it('username, password fields and submit button are present on the page.', async () => {
        let component;
        await act(async () => {
            await store.dispatch(handleInitialData());
            
            component = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Login 
                            dispatch={store.dispatch}
                            users={store.users}
                        />
                    </BrowserRouter>
                </Provider>            
            );            
        });

        expect(component.getByTestId('login-input')).toBeInTheDocument();
        expect(component.getByTestId('password-input')).toBeInTheDocument();
        expect(component.getByTestId('submit-button')).toBeInTheDocument();
    })
});

describe('Login', () => {
    it('entering wrong username or password causes showing an error message on the page.', async () => {
        let component;
        await act(async () => {
            await store.dispatch(handleInitialData());
            
            component = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Login 
                            dispatch={store.dispatch}
                            users={store.users}
                        />
                    </BrowserRouter>
                </Provider>            
            );            
        });

        var loginInput = component.getByTestId('login-input');
        fireEvent.change(loginInput, { target: { value: 'tylermcginnis' } });
        var loginInput = component.getByTestId('password-input');
        fireEvent.change(loginInput, { target: { value: 'abc3214' } });

        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(component.getByTestId('error-header')).toBeInTheDocument();
    })

    it('entering correct username or password doent show any error.', async () => {
        let component;
        await act(async () => {
            await store.dispatch(handleInitialData());
            
            component = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Login 
                            dispatch={store.dispatch}
                            users={store.users}
                        />
                    </BrowserRouter>
                </Provider>            
            );            
        });

        var loginInput = component.getByTestId('login-input');
        fireEvent.change(loginInput, { target: { value: 'tylermcginnis' } });
        var loginInput = component.getByTestId('password-input');
        fireEvent.change(loginInput, { target: { value: 'abc321' } });

        var submitButton = component.getByTestId('submit-button');
        fireEvent.click(submitButton);

        expect(component.queryByTestId('error-header')).not.toBeInTheDocument();
    })
});