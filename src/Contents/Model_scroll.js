import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link, Element, scroller, animateScroll as scroll } from 'react-scroll';

import './CSS/Main.css';
import { getIconLength } from './modules/GetIconLength';
import { selectServer } from './modules/SelectServer';
import { ScrollImages } from './modules/ScrollImages';
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


const Model_scroll = props => {
    let w_num = 2;

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
            downloadJSON(post_id, "model_scroll", get_data);   // JSON出力
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
    const GetData = () => {
        axios.get(url).then((res) => {
            let ignored_index = []; // 出力用配列
            // scroll.scrollToTop({duration: 1});

            for (let i = 0; i < 1; i++) {
                res.data.map((data, index) => {
                    ignored_index.push(data);
                    return data;
                })
            }

            // データログ
            get_data[Date.now()] = res.data;
            setData(ignored_index)
        });
    };
    
    // アイコンの大きさの決定
    const getIconLength = (w_num) => {
        let iconLength = 0; // アイコンの大きさ

        iconLength = document.getElementById('App-body').offsetWidth / w_num;
        console.log('console');
        return iconLength / document.getElementById('App-body').offsetWidth * 100;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <Element className="App-body" id="App-body" name="App-body" >
                {/* <header>
                    <Scroll to="bottom" smooth={true}>
                        <h1>Feedback App</h1>
                    </Scroll>
                </header> */}
                {data_list ?
                    <ul style={{ 'list-style': 'none' }}>
                        {data_list.map((data) => {
                            // window.scrollTo(0, 0);
                            document.getElementById("App-body").scrollIntoView(true);
                            // document.getElementById("App-body").scrollIntoView(true);
                            // document.getElementById("bottom").scrollIntoView({behavior: "smooth", block: "end"});
                            if (data.Face === "b") {
                                // return <img src={`${process.env.PUBLIC_URL}/img/joy.png`} alt="Logo" />
                                if (data.Head === 1)
                                    return <img src={joy_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={joy_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                else
                                    return <img src={joy_png} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                            }
                            else if (data.Face === "c") {
                                if (data.Head === 1)
                                    return <img src={surprise_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={surprise_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                else
                                    return <img src={surprise_png} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                }
                            else {
                                if (data.Head === 1)
                                    return <img src={neutral_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={neutral_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                                else
                                    return <img src={neutral_png} alt="Logo"
                                        style={{ width: getIconLength(w_num) + '%' }} />
                            }
                        }
                        )}
                        {scroll.scrollToBottom({smooth: true, duration: 10000})}
                    </ul>
                    : <button className="bt-graph" onClick={() => {
                        setInterval(GetData, 7000);
                    }}>データ取得</button>
                }
                <footer id="bottom"></footer>
            </Element>
        </div>
    );
}

export default Model_scroll
