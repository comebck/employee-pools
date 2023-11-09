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
                        {userName}
                        <div className="sub header">
                            {userID}
                        </div>
                    </div>
                </h4>
            </td>
            <td>
                {answersCount}
            </td>
            <td>
                {questionsCount}
            </td>
        </tr>
    );
};

export default LeaderboardEntry;