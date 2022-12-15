/* Main.js */
import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import './CSS/Main.css';

const Main = props => {
    // ページ遷移
    const navigate = useNavigate();

    // サーバ通信
    // const url = "http://192.168.2.111:3001/server"; // Labo PC
    // const url = "http://192.168.2.19:3001/server"; // note PC - 3H
    const url = "http://192.168.2.111:3001/server"; // note PC - 3H - 5GHz
    // const url = "http://172.19.0.158:3001/server"; // note PC - 4K

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
