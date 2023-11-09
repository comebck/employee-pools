import * as React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';

import reducer from "../reducers";
import middleware from "../middleware";
import NewPoll from '../components/NewPoll';

const store = createStore(reducer, middleware);

describe('NewPoll', () => {
    it('will display an error if all fields except the email are provided.', () => {
        let component;
        act(() => {
            component = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <NewPoll />
                    </BrowserRouter>
                </Provider>            
            );

            store.dispatch({
                type: 'SET_AUTHED_USER',
                id: 'tylermcginnis'
            });
        });

        var input = component.getByTestId('option1');
        fireEvent.change(input, { target: { value: 'use git' } });
        
        expect(component.getByTestId('option1').value).toBe('use git');
    })
});