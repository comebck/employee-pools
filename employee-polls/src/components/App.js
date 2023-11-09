import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import PollDetail from "./PollDetail";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import NavigationBar from "./NavigationBar";
import Login from "./Login";
import { Routes, Route } from 'react-router-dom';

const App = ({
    dispatch,
    loading
}) => {
    useEffect(() => {
        dispatch(handleInitialData());
    }, [dispatch]);
   
    return (
        <Fragment>
            <LoadingBar />
                {loading === true ? null :(
                    <Fragment>
                        <NavigationBar/>
                        <div className='container'> 
                            <Routes>
                                <Route path="/" exact element={<Dashboard/>} />
                                <Route path="/login" exact element={<Login/>} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="/add" element={<NewPoll />} />
                                <Route path="questions/:id" element={<PollDetail />} />                                
                            </Routes>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
}

const mapStateToProps = ({ users, questions}) => ({
    loading: Object.keys(questions).length === 0 || Object.keys(users).length === 0
});

export default connect(mapStateToProps)(App);