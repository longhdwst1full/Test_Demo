import React from 'react';
import { useSelector } from 'react-redux';
import {   Link, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => state.global);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (user && !user.isAdmin) return <Component {...props} />;

                return (
                    <Link
                        to={{
                            pathname: '/account/login',
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
