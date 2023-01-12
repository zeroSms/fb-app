/* Main.js */
import React from "react";
import { useNavigate } from "react-router-dom";

import './CSS/Main.css';

const Main = props => {
    // ページ遷移
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <body className="App-body">
                <fieldset className="App-fieldset-3d">
                    <legend>3Dモデル</legend>
                    <button type="button" className="bt-3d" 
                        onClick={() => navigate(`/model_all/`)}>全表示</button>
                    <button type="button" className="bt-3d"  
                        onClick={() => navigate(`/model_pri/`)}>優先表示</button>
                    <button type="button" className="bt-3d"  
                        onClick={() => navigate(`/model_rand/`)}>ランダム表示</button>
                    <button type="button" className="bt-3d"  
                        onClick={() => navigate(`/model_scroll/`)}>強制スクロール表示</button>
                </fieldset>
            </body>
        </div>);
}

export default Main;
