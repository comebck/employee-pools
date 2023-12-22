import Poll from "./Poll";

const PollList = ({
    questions
}) => {

    // sort questions by timestamp => most recent first
    const sortedQuestions = questions.sort((question1, question2) => {
        return question2.timestamp - question1.timestamp;
    });

    const renderPolls = (questions) => {
        return questions.map((question) => (
            <Poll 
                key={question.id}
                question={question}
            />
        ))
    }
    
    return (
        <div className="poll-list">
            <div className="ui cards">
                {
                renderPolls(sortedQuestions) 
                }
            </div>
        </div>
    );
};

export default PollList;