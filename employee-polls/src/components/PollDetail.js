import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {faker} from '@faker-js/faker'

import { handleSumbitAnswer } from "../actions/questions";
import WithRouter from "./WithRouter";
import Answer from "./Answer";
import AnswerDetail from "./AnswerDetail";

const PollDetail = ({
    authedUser,
    authedUserAnswer,
    dispatch,
    question,
    questionAuthor
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!authedUser) {
            navigate("/login");
        }
    }, [navigate, authedUser]);

    if (!authedUser) {
        return null;
    }

    if (!question) {
        return  <div>404 Not Found</div>;
    }
    
    const handleSubmit = (answerID) => {
        dispatch(handleSumbitAnswer(question.id, answerID));
    }

    return (
        <div>
            <div className="poll-detail-container">
                <h2 className="ui header">Poll by {questionAuthor.id}</h2>
                <div className="ui rounded image">
                    <img alt="user-avatar" src={faker.image.avatar()} />
                </div>
                <h2 className="ui header">Would You Rather</h2>
            </div>
            {
                authedUserAnswer === "" ? (
                    <div className="ui cards cards-justify">
                        <Answer 
                            answerOption = "optionOne"
                            answerText={question.optionOne.text}
                            handleSubmit={handleSubmit}
                        />
                        <Answer
                            answerOption = "optionTwo"
                            answerText={question.optionTwo.text}
                            handleSubmit={handleSubmit}
                        /> 
                    </div>          
                ) : (
                    <div className="ui cards cards-justify">
                        <AnswerDetail 
                            answerText={question.optionOne.text}
                            selected={authedUserAnswer === 'optionOne' ? true : false}
                            optionVotes={question.optionOne.votes.length}
                            totalVotes={question.optionOne.votes.length + question.optionTwo.votes.length}     
                        />
                        <AnswerDetail 
                            answerText={question.optionTwo.text}
                            selected={authedUserAnswer === 'optionTwo' ? true : false}
                            optionVotes={question.optionTwo.votes.length}
                            totalVotes={question.optionOne.votes.length + question.optionTwo.votes.length}     
                        />
                    </div>
                    
                )
            }
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, ownProps) => {
    const { id } = ownProps.router.params;
    const question = questions[id];
    if (!question || !authedUser) {
        return {
            authedUser,
            question,
            questionAuthor : null,
            authedUserAnswer : null
        }
    }
    
    const questionAuthor = users[question.author];
    return {
        authedUser,
        question,
        questionAuthor,
        authedUserAnswer: question.id in users[authedUser].answers ? users[authedUser].answers[question.id] : ""
    };
}

export default WithRouter(connect(mapStateToProps)(PollDetail));