import { showLoading, hideLoading } from "react-redux-loading-bar";

import {ACTIONS} from "../utils/constants";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export function receiveQuestions(questions) {
    return {
        type: ACTIONS.RECEIVE_QUESTIONS,
        questions
    };
}

function addQuestion(authedUser, question) {
    return {
        type: ACTIONS.ADD_QUESTION,
        authedUser,
        question
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        }).then((question) => dispatch(addQuestion(authedUser, question)))
          .then(() => dispatch(hideLoading()));
    };
}

function sumbmitAnswer(authedUser, question, answerOption) {
    return {
        type: ACTIONS.SUBMIT_ANSWER,
        authedUser, 
        question, 
        answerOption
    }
}

export function handleSumbitAnswer(qid, answerOption) {
    return (dispatch, getState) => {
        const { authedUser, questions } = getState();

        dispatch(showLoading());

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer: answerOption
        }).then((result) => dispatch(sumbmitAnswer(authedUser, questions[qid], answerOption)))
          .then(() => dispatch(hideLoading()));

    };
}