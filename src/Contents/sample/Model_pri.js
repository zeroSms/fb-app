import React from 'react';
import axios from "axios";

import './CSS/Main.css';


const Model_pri = props => {
    const display_num = 8;

    // サーバ通信
    // const url = "http://192.168.2.111:3001/server"; // Labo PC
    // const url = "http://192.168.2.19:3001/server"; // note PC - 3H
    const url = "http://192.168.2.111:3001/server"; // note PC - 3H - 5GHz
    // const url = "http://172.19.0.158:3001/server"; // note PC - 4K
    const [data_list, setData] = React.useState();
    let counter = 0;
    const GetData = () => {
        axios.get(url).then((res) => {
            console.log("console");
            
            // setData(res.data)
            let ignored_index = [];
            counter = 0;
            const formated_data = res.data.map((data, index) => {
                if (data.Face === "b" || data.Face === "c") {
                    return data;
                }
                else {
                    data.ID = -1
                    ignored_index.push(index);
                    return data;
                }
            })
            console.log(ignored_index);
            if (ignored_index.length > display_num) {
                for (let i = 0; i < ignored_index.length - display_num;){
                    // const index = ignored_index[Math.floor(Math.random() * ignored_index.length)]
                    const index = ignored_index.pop()
                    formated_data[index].Face = "zz"
                    // ignored_index = ignored_index.filter(i_index => i_index !== index)
                }
                    
            }
            console.log(formated_data);
            setData(formated_data.sort(function (a, b) {
                        if (a.Face >= b.Face) return 1;
                        if (a.Face < b.Face) return -1;
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

                            if (counter >= display_num) return ""
                            else if (data.Face === "b") {
                                counter++;
                                return <img src={`${process.env.PUBLIC_URL}/img/joy.png`} alt="Logo" />
                            }
                            else if (data.Face === "c") {
                                counter++;
                                return <img src={`${process.env.PUBLIC_URL}/img/surprise.png`} alt="Logo" />
                                }
                            else  if (data.Face === "zz" && data.ID === -1) {
                            // else {
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

