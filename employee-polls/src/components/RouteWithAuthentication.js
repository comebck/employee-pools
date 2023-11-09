import {Route, Navigate} from 'react-router-dom';

const RouteWithAuthentication = ({
    component: Component,
    authedUser,
    ...otherProps
}) => {

    if (!authedUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Route 
            {...otherProps}
            element={<Component />}
        />
    );
}

export default RouteWithAuthentication;