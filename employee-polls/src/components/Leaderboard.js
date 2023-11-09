import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {faker} from '@faker-js/faker'

import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = ({
    authedUser,
    users
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

    // sort users descending on base of their score => answers + questions
    const sortedUsers = users.sort((user1, user2) => {
        const scoreUser1 = Object.keys(user1.answers).length + user1.questions.length;
        const scoreUser2 = Object.keys(user2.answers).length + user2.questions.length;

        return scoreUser2 - scoreUser1;
    })

    return (
        <div className="leaderboard">
            <table className="ui very basic celled table">
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <LeaderboardEntry
                            key = {user.id}
                            userID = {user.id}
                            userName = {user.name}
                            userAvatar = {faker.image.avatar()}
                            answersCount = {Object.keys(user.answers).length}
                            questionsCount = {user.questions.length}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    users: Object.values(users)
});

export default connect(mapStateToProps)(Leaderboard);