import React, { useEffect } from 'react';
import { downloadJSON } from './DownloadJSON';

// アイコンの大きさの決定
export const blowserBack = (id, type, get_data) => {
    const run_downloadJSON = () => {
        removeListener();
        // alert('ブラウザバックを検知しました。');
        console.log("b");
        let checkSaveFlg = window.confirm('データを保存しますか？');
        if (checkSaveFlg) {
            downloadJSON(id, "graph_bar", get_data);   // JSON出力
            document.getElementById("saveResult").textContent = "保存を実行しました。";
        } else {
            document.getElementById("saveResult").textContent = "保存をキャンセルしました。";
        }
    }

    React.useEffect(() => {
        window.history.replaceState(null, null, null);
        console.log("tes");
        window.addEventListener('popstate', run_downloadJSON);
    }, []);
    // 登録したeventFumcを削除する関数
    const removeListener = () => {
        window.removeEventListener("popstate", run_downloadJSON);
    }
}