import React from 'react';
import axios from "axios";

import './CSS/Main.css';


const Model_pri = props => {
    // 表示アイコン数
    const displayed_num = 8;

    // サーバ通信
    // const url = "http://192.168.2.111:3001/server"; // Labo PC
    // const url = "http://192.168.2.19:3001/server"; // note PC - 3H
    const url = "http://192.168.2.111:3001/server"; // note PC - 3H - 5GHz
    // const url = "http://172.19.0.158:3001/server"; // note PC - 4K

    function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const [data_list, setData] = React.useState();
    let counter = 0;
    const GetData = () => {
        axios.get(url).then((res) => {
            // setData(res.data)
            counter = 0;
            const formated_data = res.data.map((data, index) => {
                if (data.Face === "b" || data.Face === "c" || data.Head === 1 || data.Head === 2) {
                    return data;
                }
                else {
                    data.sort = 999;
                    return data;
                }
            })
            // if (noticed_index.length > 0) {
            //     for (let i = 0; i < noticed_index.length;){
            //         const n_index = noticed_index[Math.floor(Math.random() * noticed_index.length)]
            //     }      
            // }
            // if (ignored_index.length > 4) {
            //     for (let i = 0; i < ignored_index.length - 4;){
            //         // const index = ignored_index[Math.floor(Math.random() * ignored_index.length)]
            //         const i_index = ignored_index.pop()
            //         formated_data[i_index].Face = "zz"
            //         // ignored_index = ignored_index.filter(i_index => i_index !== index)
            //     }      
            // }
            console.log(formated_data);
            setData(formated_data.sort(function (a, b) {
                if (a.sort >= b.sort) return 1;
                if (a.sort < b.sort) return -1;
            }));
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Feedback App</h1>
            </header>
            <body className="App-body">
                {data_list ?
                    <ul style={{ 'list-style': 'none' }}>
                        {
                            data_list.map((data) => {

                            if (counter >= 4) return ""
                            else if (data.Face === "b") {
                                counter++;
                                return <img src={`${process.env.PUBLIC_URL}/img/joy.png`} alt="Logo" />
                            }
                            else if (data.Face === "c") {
                                counter++;
                                return <img src={`${process.env.PUBLIC_URL}/img/surprise.png`} alt="Logo" />
                            }
                            else {
                                counter++;
                                return <img src={`${process.env.PUBLIC_URL}/img/neutral.png`} alt="Logo" />
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

