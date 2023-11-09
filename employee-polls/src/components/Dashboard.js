import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import PollList from "./PollList";
import { useEffect } from "react";

const Dashboard = ({
    authedUser,
    authedUserAnswers,
    questions
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

    let newQuestions = [], doneQuestions = [];
    Object.values(questions).forEach((question) => {
        if (question.id in authedUserAnswers) {
            doneQuestions.push(question);
        } else {
            newQuestions.push(question);
        }   
    })

    return (
        <div className="ui segments">
            <PollList 
                questions={newQuestions}
                label="New Questions"
            />
            <PollList 
                questions={doneQuestions}
                label="Done"
            />
        </div>
    );
};

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions,
    authedUserAnswers: users[authedUser] ? users[authedUser].answers : null
});

export default connect(mapStateToProps)(Dashboard);

