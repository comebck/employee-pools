import { timestampToString } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const Poll = ({question}) => {
    const navigate = useNavigate();

    const handleShow = (e) => {
        e.preventDefault();
        
        navigate(`/questions/${question.id}`);
    };

    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{question.author}</div>
                <div className="meta">{timestampToString(question.timestamp)}</div>
            </div>
            <div className="extra content">
                <button 
                    className="ui basic green button"
                    onClick={handleShow}
                >
                    Show
                </button>   
            </div> 
        </div>
    );
};

export default Poll;