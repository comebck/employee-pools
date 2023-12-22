import * as React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';

import reducer from "../reducers";
import middleware from "../middleware";
import { handleInitialData } from '../actions/shared';
import Leaderboard from '../components/Leaderboard';

const store = createStore(reducer, middleware);

describe('Leaderboard', () => {
    it('Leaderboard displays correct user name, number of questions asked and number of questions answered.', async () => {
        let component;
        await act(async () => {
            await store.dispatch(handleInitialData());
            await store.dispatch({
                type: 'SET_AUTHED_USER',
                id: 'tylermcginnis'
            });

            component = render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Leaderboard 
                            authedUser={store.authedUser}
                            users={store.users}
                        />
                    </BrowserRouter>
                </Provider>            
            );            
        });

        const userNameElements = component.getAllByTestId('user-name');

        userNameElements.forEach((userNameElement) => {
            const parentRow = userNameElement.closest('tr');
            const answersCount = parentRow.querySelector('[data-testid="answers-count"]').textContent;
            const questionsCount = parentRow.querySelector('[data-testid="questions-count"]').textContent;

            if (userNameElement.textContent === 'Sarah Edo') {
                expect(answersCount).toBe('4');
                expect(questionsCount).toBe('2');    
            } 
            
            if (userNameElement.textContent === 'Tyler McGinnis') {
                expect(answersCount).toBe('2');
                expect(questionsCount).toBe('2');    
            } 
        });
    })
});