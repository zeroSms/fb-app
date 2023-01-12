import React from 'react';
import axios from "axios";

import './CSS/Main.css';
import { getIconLength } from './modules/GetIconLength';
import { selectServer } from './modules/SelectServer';

import joy_png from './images/joy.png';
import joy_nod_gif from './images/joy_nod_1sec.gif';
import joy_shake_gif from './images/joy_shake_1sec.gif';
import surprise_png from './images/surprise.png';
import surprise_nod_gif from './images/surprise_nod_1sec.gif';
import surprise_shake_gif from './images/surprise_shake_1sec.gif';
import neutral_png from './images/neutral.png';
import neutral_nod_gif from './images/neutral_nod_1sec.gif';
import neutral_shake_gif from './images/neutral_shake_1sec.gif';

const Model_all = props => {

    // サーバ通信
    const url = selectServer();

    // データ取得
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
            <body className="App-body" id="App-body" >
                {data_list ?
                    <ul style={{ 'list-style': 'none' }}>
                        {data_list.map((data) => {
                            // <li
                            //     key={data.ID}
                            // > {`[Head]=${data.Head} [Face]=${data.Face} []=${Object.keys(data_list).length}`}
                            // </li>
                            if (data.Face === "b") {
                                if (data.Head === 1)
                                    return <img src={joy_nod_gif} alt="Logo"
                                    style={{ width: getIconLength(data_list.length) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={joy_shake_gif} alt="Logo"
                                    style={{ width: getIconLength(data_list.length) + '%' }} />
                                else
                                    return <img src={joy_png} alt="Logo"
                                    style={{ width: getIconLength(data_list.length) + '%' }} />
                            }
                            else if (data.Face === "c") {
                                if (data.Head === 1)
                                    return <img src={surprise_nod_gif} alt="Logo"
                                        style={{ width: getIconLength(data_list.length) + '%' }} />
                                else if (data.Head === 2)
                                    return <img src={surprise_shake_gif} alt="Logo"
                                        style={{ width: getIconLength(data_list.length) + '%' }} />
                                else
                                    return <img src={surprise_png} alt="Logo"
                                        style={{ width: getIconLength(data_list.length) + '%' }} />
                            }
                            else {
                                if (data.Head === 1) return <img src={neutral_nod_gif} alt="Logo"
                                    style={{ width: getIconLength(data_list.length) + '%' }} />
                                else if (data.Head === 2) return <img src={neutral_shake_gif} alt="Logo"
                                    style={{ width: getIconLength(data_list.length) + '%' }} />
                                else return <img src={neutral_png} alt="Logo"
                                    style={{ width: getIconLength(data_list.length) + '%' }} />
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

export default Model_all
