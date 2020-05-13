import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import triangle from './triangle.png';
import './style.less';

interface MainProps {
    a: number;
}
const Main = (props: MainProps) => {
    const history = useHistory();
    const handleClick = useCallback(() => {
        history.push('/login');
    }, []);
    return (
        <div className="main">
            <div>Main</div>
            <img src={triangle} onClick={handleClick} />
        </div>
    );
};

export default Main;