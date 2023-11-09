import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {faker} from '@faker-js/faker'

import { setAuthedUser } from "../actions/users";

const NavigationBar = ({
    authedUser,
    dispatch
}) => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("/");

    const logout = () => {
        dispatch(setAuthedUser(null));
    }

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location])

    return (
        <div className="ui secondary pointing menu">
            <Link 
                className={activeLink === "/" ? "active item" : "item"} 
                to="/"
            >
                Home
            </Link>
            <Link 
                className={activeLink === "/leaderboard" ? "active item" : "item"} 
                to="/leaderboard"
            >
                Leaderboard
            </Link>
            <Link 
                className={activeLink === "/add" ? "active item" : "item"} 
                to="/add"
            >
                New
            </Link>
            
            {
                authedUser ? (
                    <div className="right menu">
                        <div className="right floated author">
                            <img alt="user-avatar" className="ui avatar image" src={faker.image.avatar()} />
                            <div className="sub header">
                                {authedUser}
                            </div>
                        </div>
                        
                        <a 
                            className="ui item"
                            href="#dummy"
                            onClick={logout}
                        >
                            Logout
                        </a>
                    </div>

                ) : null
            }
            
        </div>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    authedUser
});

export default connect(mapStateToProps)(NavigationBar);