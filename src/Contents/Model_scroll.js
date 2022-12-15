import React from 'react';
import axios from "axios";

import './CSS/Main.css';


const Model_scroll = props => {

    // サーバ通信
    // const url = "http://192.168.2.111:3001/server"; // Labo PC
    // const url = "http://192.168.2.19:3001/server"; // note PC - 3H
    const url = "http://192.168.2.111:3001/server"; // note PC - 3H - 5GHz
    // const url = "http://172.19.0.158:3001/server"; // note PC - 4K
    const [data_list, setData] = React.useState();
    const GetData = () => {
        axios.get(url).then((res) => {
            setData(res.data);
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
                        {data_list.map((data) => {
                            // <li
                            //     key={data.ID}
                            // > {`[Head]=${data.Head} [Face]=${data.Face} []=${Object.keys(data_list).length}`}
                            // </li>
                            if (data.Face === "b") {
                                return <img src={`${process.env.PUBLIC_URL}/img/joy.png`} alt="Logo" />
                            }
                            else if (data.Face === "c") {
                                return <img src={`${process.env.PUBLIC_URL}/img/surprise.png`} alt="Logo" />
                            }
                            else {
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

export default Model_scroll
