import { ACTIONS } from "../utils/constants";

export default function questions(state={}, action) {
    switch (action.type) {
        case ACTIONS.ADD_QUESTION:
            const { question : addedQuestion } = action;
            return {
                ...state,
                [addedQuestion.id]: addedQuestion
            };

        case ACTIONS.RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };        

        case ACTIONS.SUBMIT_ANSWER:
            const { authedUser, question, answerOption } = action;
            const updatedQuestion = {
                ...question,
                [answerOption]: {
                    ...question[answerOption],
                    votes: question[answerOption].votes.concat([authedUser])
                }
            };

            return {
                ...state,
                [question.id]: updatedQuestion
            };

        default:
            return state;
    }
}
