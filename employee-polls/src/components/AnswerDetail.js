const AnswerDetail = ({
    answerText,
    selected,
    optionVotes,
    totalVotes
}) => {

    const optionVoteRatio = (optionVotes/totalVotes) * 100

    return (
        <div className="card answer-card">
            <div className="content">
                <h4 className="description"> 
                    {answerText}
                </h4>
            </div>
            <div className="extra content center">
                {selected ? (<i className="large check icon"></i>) : null}
                <span className="right floated">
                    {optionVotes} users voted ({optionVoteRatio.toFixed(1)}%)
                </span>
            </div>
        </div>
    );
};

export default AnswerDetail;