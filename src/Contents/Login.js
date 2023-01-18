/* Main.js */
import React from "react";
import { useNavigate } from "react-router-dom";
import {  AiOutlineUser  } from "react-icons/ai";
import {  Input, Button, Form  } from "antd";

import './CSS/Main.css';

const Login = props => {
    // ページ遷移
    const navigate = useNavigate();

    // 選択した値を管理（初期値：””）
    const [val, setVal] = React.useState('');
    // テキストフィールドの値がチェンジされた時
    const handleChange = (e) => {
        setVal(e.target.value);
    };

    // 入力判定（空白であればボタン無効）
    const [componentDisabled, setComponentDisabled] = React.useState(true);
    const onFormLayoutChange = (e) => {
        if (e.target.value === "") setComponentDisabled(true);
        else setComponentDisabled(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <body className="App-body">
                <Input.Group compact>
                    <Input
                        // size="large"
                        style={{ width: 'calc(100% - 200px)', height:'50px'}}
                        value={val}
                        type="number"
                        onChange={(e) => {
                            onFormLayoutChange(e);
                            handleChange(e);
                        }}
                        prefix={<AiOutlineUser />}
                        placeholder="User id" />
                    <Button
                        type="primary"
                        style={{ height:'50px'}}
                        disabled={componentDisabled}
                        // className="bt-login" 
                        onClick={() => navigate("/main/", {state:{id: val}})}>Login</Button>
                </Input.Group>
            </body>
        </div>);
}

export default Login;
