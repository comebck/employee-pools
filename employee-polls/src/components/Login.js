import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';

import { setAuthedUser } from '../actions/users';

const Login = ({
    dispatch,
    users
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeLogin= (e) => {
        const text = e.target.value;    
        setLogin(text);
        setErrorMessage("");
    };

    const handleChangePassword= (e) => {
        const text = e.target.value;    
        setPassword(text);
        setErrorMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();    

        if (login in users && users[login].password === password) {
            dispatch(setAuthedUser(login));
            let from = '/';
            if (location.state && location.state.from) {
                from = location.state.from
            }

            navigate(from);
        } else {
            setErrorMessage("Incorrect username or password. Please check your credentials and try again.");
            setLogin("");
            setPassword("");
        }
    };

    return (
        <div className="login">
            <form className="ui form error" onSubmit={handleSubmit}>
                <h2 className="ui dividing header">
                    Log In
                </h2>

                <div className="field">
                    <label>Login</label>
                    <input
                        className="login-input"
                        data-testid="login-input"
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={handleChangeLogin}
                    />
                </div>
                
                <div className="field">
                    <label>Password</label>
                    <input
                        className="password-input"
                        data-testid="password-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </div>

                {errorMessage ? (
                    <div className="ui error message">
                        <div className="header">Login Error</div>
                        <p data-testid="error-header">{errorMessage}</p>
                    </div>
                ) : null}                

                <button 
                    className="ui submit button" 
                    data-testid="submit-button"
                    disabled={login === "" || password === ""}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ users }) => (
    {
        users
    }
)

export default connect(mapStateToProps)(Login);