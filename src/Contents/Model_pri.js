import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

import './CSS/Main.css';
import { getIconLength } from './modules/GetIconLength';
import { selectServer } from './modules/SelectServer';
import { downloadJSON } from './modules/DownloadJSON';

import joy_png from './images/joy.png';
import joy_nod_gif from './images/joy_nod_1sec.gif';
import joy_shake_gif from './images/joy_shake_1sec.gif';
import surprise_png from './images/surprise.png';
import surprise_nod_gif from './images/surprise_nod_1sec.gif';
import surprise_shake_gif from './images/surprise_shake_1sec.gif';
import neutral_png from './images/neutral.png';
import neutral_nod_gif from './images/neutral_nod_1sec.gif';
import neutral_shake_gif from './images/neutral_shake_1sec.gif';

const Model_pri = props => {
    const display_num = 8;

    // User id 取得
    const location = useLocation();
    const post_id = location.state.id;
    let get_data = {}

    // サーバ通信
    const url = selectServer();

    // JSON出力
    const runDownloadJSON = () => {
        removeListener();
        // alert('ブラウザバックを検知しました。');
        let checkSaveFlg = window.confirm('データを保存しますか？');
        if (checkSaveFlg) {
            downloadJSON(post_id, "model_pri", get_data);   // JSON出力
            document.getElementById("saveResult").textContent = "保存を実行しました。";
        } else {
            document.getElementById("saveResult").textContent = "保存をキャンセルしました。";
        }
    }
    // 登録したeventFumcを削除する関数
    const removeListener = () => {
        window.removeEventListener("popstate", runDownloadJSON);
    }
    // ブラウザバックを検出
    useEffect(() => {
        window.history.replaceState(null, null, null);
        window.addEventListener('popstate', runDownloadJSON);
    }, []);

    // データ取得
    const [data_list, setData] = React.useState();
    let counter = 0;
    const GetData = () => {
        axios.get(url).then((res) => {
            let ignored_index = []; // 出力用配列
            counter = 0;    // counterを初期化

            // データログ
            get_data[Date.now()] = res.data;

            // 反応ありを出力用配列に格納
            const formated_data_1 = res.data.map((data, index) => {
                if (data.Face === "b" || data.Face === "c") {
                    ignored_index.push(data);
                    return data;
                }
            })
            // 反応なしを出力用配列に格納
            const formated_data_2 = res.data.map((data, index) => {
                if ((data.Face === "b" || data.Face === "c")) {
                    return data;
                }
                else {
                    ignored_index.push(data);
                    return data;
                }
            })
            // console.log(ignored_index);
            setData(ignored_index)
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <body className="App-body" id="App-body" >
                {data_list ?
                    <ul style={{ 'list-style': 'none' }}>
                        {data_list.map((data) => {

                            if (counter >= display_num) return ""
                            else if (data.Face === "b") {
                                counter++;
                                // return <img src={`${process.env.PUBLIC_URL}/img/joy.png`} alt="Logo" />
                                if (data.Head === 1)
                                    return <img src={joy_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={joy_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                else
                                    return <img src={joy_png} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                            }
                            else if (data.Face === "c") {
                                counter++;
                                if (data.Head === 1)
                                    return <img src={surprise_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={surprise_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                else
                                    return <img src={surprise_png} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                }
                            else {
                                counter++;
                                if (data.Head === 1)
                                    return <img src={neutral_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={neutral_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                                else
                                    return <img src={neutral_png} alt="Logo"
                                        style={{ width: getIconLength(display_num) + '%' }} />
                            }
                        }
                        )}
                    </ul>
                    : <button className="bt-graph" onClick={() => {
                        setInterval(GetData, 1000);
                    }}>データ取得</button>
                }
            </body>
        </div>
    );
}

export default Model_pri

