let Config = {
    creatDate(nowYear) {
        var year = [];
        var month = [];
        var days = [];
        for (var i = 2018; i <= nowYear; i++) {
            year.push(i);
        }
        for (var j = 1; j <= 12; j++) {
            month.push(j)
        }
        for (var x = 1; x <= 31; x++) {
            days.push(x)
        }
        return {
            year: year,
            month: month,
            days: days
        }
    },
    formatDuring(countDown) {
        let h = parseInt(Number(countDown) / 60 / 60);
        let m = parseInt(Number(countDown) / 60 % 60);
        let s = parseInt(Number(countDown) / 60 % 60);
        return `${h <= 0 ? '00' : (h < 10 ? '0' + h : h)}:${m <= 0 ? '00' : (m < 10 ? '0' + m : m)}:${s <= 0 ? '00' : (s < 10 ? '0' + s : s)}`;
    },
    getUrlData(path){
        var arr = {};
        path.slice(1).split('&').map(e => e.split('=')).forEach(e => arr[e[0]] = e[1]);
        return arr;
    }
}
export default Config;