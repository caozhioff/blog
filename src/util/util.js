export default {
    GetRequest:() => {
        var url = window.location.search; //获取url中"?"符后的字串
        if (url.indexOf("&amp;") >= 0) url = url.replace(new RegExp("&amp;","g" ),"&");
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    timeToDate:(time) => {//时间戳转日期
        var date=new Date(parseInt(time)* 1000);
        var year=date.getFullYear();
        var mon = date.getMonth()+1;
        var day = date.getDate();
        var hours = date.getHours();
        var minu = date.getMinutes();
        //var sec = date.getSeconds();

        return year+'年'+mon+'月'+day+'日 '+hours+'时'+minu+'分';
    }
}