import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

Test.propTypes = {};

function Test(props) {
    const { url } = useMatch();
    const { isLoading } = useSelector((state) => state.chat);

    return (
        <Spin spinning={isLoading}>
            <Routes>
                <Route exact path={url} component={MainPage} />

                <Route component={NotFoundPage} />
            </Routes>
        </Spin>
    );
}

export default Chat;
