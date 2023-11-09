const Answer = ({
    answerOption,
    answerText,
    handleSubmit
}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(answerOption);
    };

    return (
        <div className="ui card answer-card">
            <div className="content">
                <h4 className="description"> 
                    {answerText}
                </h4>
            </div>
            
            <div className="extra content center">
                <button className="ui teal button"
                    onClick={onSubmit}
                >
                    Click
                </button>
            </div>            
        </div>
    );
};

export default Answer;