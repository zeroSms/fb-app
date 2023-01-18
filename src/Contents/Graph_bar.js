import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

import './CSS/Main.css';
import { selectServer } from './modules/SelectServer';
import { downloadJSON } from './modules/DownloadJSON';

const [NEUTRAL, JOY, SURPRISE] = [0, 1, 2];
const [NOD, SHAKE] = [1, 2];

let face_data = [
  {
    name: '無表情',
    num: 0,
    percent: 0,
  },
  {
    name: '喜び',
    num: 0,
    percent: 0,
  },
  {
    name: '驚き',
    num: 0,
    percent: 0,
  },
];

let head_data = [
  {
    name: '無反応',
    num: 0,
    percent: 0,
  },
  {
    name: 'うなずき',
    num: 0,
    percent: 0,
  },
  {
    name: '首振り',
    num: 0,
    percent: 0,
  },
];

const Graph_bar = props => {
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
            downloadJSON(post_id, "graph_bar", get_data);   // JSON出力
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
            let counter = 0;    // counterを初期化
            let set_index = {};

            // データログ
            get_data[Date.now()] = res.data;

            // 初期化
            const init_face_data = face_data.map((data, index) => {
                data.num = 0;
                return data;
            })
            const init_head_data = head_data.map((data, index) => {
                data.num = 0;
                return data;
            })

            // 各表情を加算
            const formated_data_1 = res.data.map((data, index) => {
                counter += 1; // counter
                if (data.Face === "b") face_data[JOY].num += 1;
                else if (data.Face === "c") face_data[SURPRISE].num += 1;
                else face_data[NEUTRAL].num += 1;
                return data;
            })
            // 各頭部動作を加算
            const formated_data_2 = res.data.map((data, index) => {
                if (data.Head === 1) head_data[NOD].num += 1;
                else if (data.Head === 2) head_data[SHAKE].num += 1;
                else head_data[NEUTRAL].num += 1;
                return data;
            })
            
            // 割合計算
            const set_face_data = face_data.map((data, index) => {
                data.percent = data.num / counter * 100;
                return data;
            })
            const set_head_data = head_data.map((data, index) => {
                data.percent = data.num / counter * 100;
                return data;
            })

            set_index['face'] = set_face_data;
            set_index['head'] = set_head_data;

            // console.log(ignored_index);
            setData(set_index)
        });
    };
    
    const COLORS_FACE = [
        '#FFFFFF',
        '#FF1493',
        '#FFFF00'
    ];
    
    const COLORS_HEAD = [
        '#FFFFFF',
        '#FF8C00',
        '#0088FE'
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <body className="App-body" id="App-body" >
                {data_list ?
                    <div>
                        <fieldset className="App-fieldset">
                            <legend>表情</legend>
                            <BarChart
                                width={500}
                                height={300}
                                data={data_list['face']}
                                stackOffset="expand"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                                <CartesianGrid  // グリッドを変更
                                    strokeDasharray="3 3"
                                    horizontalFill={['#C0C0C0', '#FFFFFF']}
                                    fillOpacity={0.2}
                                    stroke="lightgrey"/>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                
                                <Legend />
                                <Bar dataKey="percent" fill="#4B0082" >
                                    {data_list['face'].map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS_FACE[index % COLORS_FACE.length]}
                                            />
                                    ))}
                                </Bar>
                            </BarChart>
                        </fieldset>    
                        <fieldset className="App-fieldset">
                            <legend>頭部動作</legend>
                            <BarChart
                                width={500}
                                height={300}
                                data={data_list['head']}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                                <CartesianGrid  // グリッドを変更
                                    strokeDasharray="3 3"
                                    horizontalFill={['#C0C0C0', '#FFFFFF']}
                                    fillOpacity={0.2}
                                    stroke="lightgrey"/>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                
                                <Legend />
                                <Bar dataKey="percent" fill="#4B0082" >
                                    {data_list['face'].map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS_HEAD[index % COLORS_HEAD.length]}
                                            />
                                    ))}
                                </Bar>
                            </BarChart>
                        </fieldset>
                    </div>
                    :
                    <button
                        className="bt-login"
                        onClick={() => { setInterval(GetData, 1000); }}>
                        データ取得
                    </button>
                }
            </body>
        </div>
    );
}

export default Graph_bar
