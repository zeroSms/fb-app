import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell } from 'recharts';

import './CSS/Main.css';
import { selectServer } from './modules/SelectServer';
import { downloadJSON } from './modules/DownloadJSON';

const NEUTRAL = 0;
const JOY = 1;
const SURPRISE = 2;
const NOD = 1;
const SHAKE = 2;

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
            downloadJSON(post_id, "graph_circle", get_data);   // JSON出力
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
    // const COLORS = [
    //     '#0088FE',
    //     '#FF8C00',
    //     '#00C49F'
    // ];

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

    // ラベル名
    const renderCustomizedLabel = ({ name }: any) => {
        return name;
    };

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
                            <PieChart
                                    width={500}
                                    height={300}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                                <Pie
                                    data={data_list['face']}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="75%"
                                    fill="#8884d8"
                                    nameKey="name"
                                    dataKey="percent"
                                    label={renderCustomizedLabel}
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {data_list['face'].map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS_FACE[index % COLORS_FACE.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </fieldset>    
                        <fieldset className="App-fieldset">
                            <legend>頭部動作</legend>
                            <PieChart
                                    width={500}
                                    height={300}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                                <Pie
                                    data={data_list['head']}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="75%"
                                    fill="#8884d8"
                                    nameKey="name"
                                    dataKey="percent"
                                    label={renderCustomizedLabel}
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {data_list['head'].map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS_HEAD[index % COLORS_HEAD.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </fieldset>
                    </div>
                    :
                    <button
                        className="bt-graph"
                        onClick={() => { setInterval(GetData, 1000); }}>
                        データ取得
                    </button>
                }
            </body>
        </div>
    );
}

export default Graph_bar
