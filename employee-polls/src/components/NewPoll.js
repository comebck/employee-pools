import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handleAddQuestion } from '../actions/questions';

const NewPoll = ({
    authedUser,
    dispatch
}) => {
    const navigate = useNavigate();
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    
    useEffect(() => {
        if (!authedUser) {
            navigate("/login");
        }
    }, [navigate, authedUser]);

    if (!authedUser) {
        return null;
    }

    const handleChangeOption1= (e) => {
        const text = e.target.value;    
        setOption1(text);
    };

    const handleChangeOption2= (e) => {
        const text = e.target.value;    
        setOption2(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(option1, option2));
    
        setOption1("");
        setOption2("");
    
        navigate("/");
    };

    return (
        <div className="new-poll">
            <form className="ui form" onSubmit={handleSubmit}>
                <h2 className="ui dividing header">
                    Would you rather
                    <div className="sub header">Create Your Own Poll</div>
                </h2>

                <div className="field">
                    <label>First Option</label>
                    <input
                        className="option-input"
                        data-testid="option1"
                        type="text"
                        placeholder="Option One"
                        value={option1}
                        onChange={handleChangeOption1}
                        maxLength={200}
                    />
                </div>
                
                <div className="field">
                    <label>Second Option</label>
                    <input
                        className="option-input"
                        data-testid="option2"
                        type="text"
                        placeholder="Option Two"
                        value={option2}
                        onChange={handleChangeOption2}
                        maxLength={200}
                    />
                </div>

                <button className="ui button" type="submit" disabled={option1 === "" || option2 === ""}>
                    Submit
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ authedUser }) => (
    {authedUser}
)

export default connect(mapStateToProps)(NewPoll);