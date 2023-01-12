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


const Model_rand = props => {
    const display_num = 8;

    // サーバ通信
    const url = selectServer();

    // データ取得
    const [data_list, setData] = React.useState();
    let counter = 0;
    const GetData = () => {
        axios.get(url).then((res) => {
            counter = 0;
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

export default Model_rand
