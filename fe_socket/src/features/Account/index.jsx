import { Spin } from 'antd';
import NotFoundPage from '../../components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Route,Routes , useMatch} from 'react-router-dom';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import RegistryPage from './pages/RegistryPage';
import './style.scss';

function Account(props) {
    const { url } = useMatch();
    const history = useNavigate();
    const { isLoading } = useSelector((state) => state.account);
    const { user } = useSelector((state) => state.global);
    const { infoWebApps } = useSelector((state) => state.home);

    if (user) {
        if (user.isAdmin) history.push('/admin');
        else history.push('/chat');
    }

    return (
        <Spin spinning={isLoading}>
            <div id="account_page">
                <Routes>
                    <Route path={`${url}/login`} component={LoginPage} />
                    <Route path={`${url}/registry`} component={RegistryPage} />
                    <Route path={`${url}/forgot`} component={ForgotPage} />
                    <Route component={NotFoundPage} />
                </Routes>
            </div>
        </Spin>
    );
}

export default Account;
