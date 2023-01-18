/* Main.js */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import './CSS/Main.css';

const Main = props => {
    // ページ遷移
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <body className="App-body">
                <fieldset className="App-fieldset">
                    <legend>アイコン</legend>
                    <button type="button" className="bt-main" 
                        onClick={() => navigate(`/main/model_all/`, {state:{id: id}})}>全表示</button>
                    <button type="button" className="bt-main"  
                        onClick={() => navigate(`/main/model_pri/`, {state:{id: id}})}>優先表示</button>
                    <button type="button" className="bt-main"  
                        onClick={() => navigate(`/main/model_rand/`, {state:{id: id}})}>ランダム表示</button>
                    <button type="button" className="bt-main"  
                        onClick={() => navigate(`/main/model_scroll/`, {state:{id: id}})}>強制スクロール表示</button>
                </fieldset>
                <fieldset className="App-fieldset">
                    <legend>グラフ</legend>
                    <button type="button" className="bt-main" 
                        onClick={() => navigate("/main/graph_bar/", {state:{id: id}})}>棒グラフ表示</button>
                    <button type="button" className="bt-main"  
                        onClick={() => navigate(`/main/graph_circle/`, {state:{id: id}})}>円グラフ表示</button>
                </fieldset>
            </body>
        </div>);
}

export default Main;
