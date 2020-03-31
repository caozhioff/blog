module.exports = {
    timeToDate: time => {//时间戳转日期
        var date=new Date(parseInt(time)* 1000);
        var year=date.getFullYear();
        var mon = date.getMonth()+1;
        var day = date.getDate();
        var hours = date.getHours();
        var minu = date.getMinutes();
        //var sec = date.getSeconds();

        return year+'年'+mon+'月'+day+'日 '+hours+'时'+minu+'分';
    },
    unique: arr => {
        return Array.from(new Set(arr))
      }
}