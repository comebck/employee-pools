const LeaderboardEntry = ({
    userID,
    userName,
    userAvatar,
    answersCount,
    questionsCount
}) => {
    return (
        <tr>
            <td>
                <h4 className="ui image header">
                    <img alt="user-avatar" src={userAvatar} className="ui mini rounded image" />
                    <div className="content">
                        <p data-testid="user-name">{userName}</p>
                        <div className="sub header">
                            {userID}
                        </div>
                    </div>
                </h4>
            </td>
            <td data-testid="answers-count">
                {answersCount}
            </td>
            <td data-testid="questions-count"> 
                {questionsCount}
            </td>
        </tr>
    );
};

export default LeaderboardEntry;