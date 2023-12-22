import { useState, useEffect} from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import PollList from "./PollList";

const Dashboard = ({
    authedUser,
    authedUserAnswers,
    questions
}) => {    
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('newQuestions');

    useEffect(() => {
        if (!authedUser) {
            navigate("/login");
        }
    }, [navigate, authedUser]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
        <div>
            <div className="ui top attached tabular menu">
                <div 
                    className={activeTab === "newQuestions" ? "active item" : "item"}
                    onClick={() => handleTabClick("newQuestions")}
                >
                    New Questions
                </div>
                <div 
                    className={activeTab === "doneQuestions" ? "active item" : "item"}
                    onClick={() => handleTabClick("doneQuestions")}
                >
                    Done
                </div>
            </div>
            <div className="ui bottom attached active tab segment">
                {activeTab === "newQuestions" ?
                    (
                        <PollList 
                            questions={newQuestions}
                        />
                    ) : (
                        <PollList 
                            questions={doneQuestions}
                        />
                    )                
                }
            </div>            
        </div>
    );
};

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions,
    authedUserAnswers: users[authedUser] ? users[authedUser].answers : null
});

export default connect(mapStateToProps)(Dashboard);

