import React, { useCallback } from 'react';
import Axios from 'axios';

const Login = () => {
    const handleLogin = useCallback(async () => {
        const res = await Axios.get('/data/data.json');
        alert(res.data.name);
    }, []);
    return (
        <div>
            <button onClick={handleLogin}>登录</button>
        </div>
    );
};
export default Login;