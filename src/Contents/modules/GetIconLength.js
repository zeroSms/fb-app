
// アイコンの大きさの決定
export const getIconLength = (N) => {
    let w_num = 1;
    let h_num = 1;
    let iconLength = 0; // アイコンの大きさ
    let icon_num = 0; // アイコンの数

    while (true) {
        iconLength = document.getElementById('App-body').offsetWidth / w_num;
        h_num = (document.getElementById('App-body').offsetHeight / iconLength) | 0;
        if (h_num < 2) {
            iconLength = document.getElementById('App-body').offsetHeight / 2;
            h_num = 2;
        }
        icon_num = w_num * h_num;
        console.log('console');
        if (icon_num >= N) {
            console.log(w_num, h_num, icon_num);
            return iconLength / document.getElementById('App-body').offsetWidth * 100;
        }
        else w_num += 1;
    }
}