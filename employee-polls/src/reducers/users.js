import { ACTIONS } from "../utils/constants";

export function authedUser(state = null, action) {
    switch (action.type) {
        case ACTIONS.SET_AUTHED_USER:
            return action.id;

        default:
            return state;
    }
}

export function users(state = {}, action) {
    switch (action.type) {
        case ACTIONS.ADD_QUESTION:
            const { authedUser: author, question : addedQuestion } = action;
            const updatedQuestions = state[author].questions.concat(addedQuestion);
            
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: updatedQuestions
                }
            };

        case ACTIONS.RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };

        case ACTIONS.SUBMIT_ANSWER:
            const { authedUser, question, answerOption } = action;            
            const updatedAnswers = {
                ...state[authedUser].answers,
                [question.id]: answerOption
            };
            
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: updatedAnswers
                }
            };

        default:
            return state;
    }
}


// sarahedo: {
//     id: 'sarahedo',
//     password:'password123',
//     name: 'Sarah Edo',
//     avatarURL: null,
//     answers: {
//       "8xf0y6ziyjabvozdd253nd": 'optionOne',
//       "6ni6ok3ym7mf1p33lnez": 'optionOne',
//       "am8ehyc8byjqgar0jgpub9": 'optionTwo',
//       "loxhs1bqm25b708cmbf3g": 'optionTwo'
//     },
//     questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
//   },