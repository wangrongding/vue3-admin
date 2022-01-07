/**
 * 格式化日期
 * @param {Date} time
 * @param {String} cFormat
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
        date = time;
    } else {
        if (typeof time === "string") {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), "/");
            }
        }

        if (typeof time === "number" && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        return value.toString().padStart(2, "0");
    });
    return time_str;
}

/**
 * 通过身份证号码获取出生年月与性别
 * @param {String} idCard
 */
export function getIdCardInfo(idCard) {
    const reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    if (reg.test(idCard)) {
        const idCardInfo = {};
        if (idCard.length == 15) {
            let org_birthday = idCard.substring(6, 12);
            let org_gender = idCard.substring(13, 14);
            idCardInfo.birthday =
                "19" +
                org_birthday.substring(0, 2) +
                "-" +
                org_birthday.substring(2, 4) +
                "-" +
                org_birthday.substring(4, 6);
            idCardInfo.gender = org_gender % 2 === 1 ? "男" : "女";
        } else if (idCard.length == 18) {
            let org_birthday = idCard.substring(6, 14);
            let org_gender = idCard.substring(16, 17);
            idCardInfo.birthday =
                org_birthday.substring(0, 4) +
                "-" +
                org_birthday.substring(4, 6) +
                "-" +
                org_birthday.substring(6, 8);
            idCardInfo.gender = org_gender % 2 == 1 ? 1 : 2;
        }
        return idCardInfo;
    } else {
        return false;
    }
}

export function getAgeByDateBirth(dateBirth) {
    const age = { label: "", value: 0 };
    const birthDate = new Date(dateBirth);
    const nowDate = new Date();
    const birthYear = birthDate.getFullYear();
    const nowYear = nowDate.getFullYear();
    age.value = nowYear - birthYear;
    if (age.value === 0) {
        const birthMonth = birthDate.getMonth() + 1;
        const nowMonth = birthDate.getMonth() + 1;
        age.value = nowMonth - birthMonth;
        if (age.value === 0) {
            const birthDay = birthDate.getDate();
            const nowDay = nowDate.getDate();
            age.value = nowDay - birthDay;
            if (age.value < 7) {
                age.label = "D";
            } else {
                age.label = "W";
                age.value = Math.round(age.value / 7);
            }
        } else {
            age.label = "M";
        }
    } else {
        age.label = "Y";
    }
    return age;
}

// 获取链接参数
export function getQueryParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return "";
}

/**
 * 获取所有链接参数
 * @param {Array} names 要获取的key数组
 */
export function getAllQueryParams() {
    const searchs = window.location.search.substr(1).split("&");
    let params = {};
    searchs.forEach((item) => {
        const obj = item.split("=");
        if (obj[1] != null) {
            params[obj[0]] = decodeURIComponent(obj[1]);
        } else {
            params[obj[0]] = "";
        }
    });
    return params;
}

// 判断是否全屏
export function isFullScreen() {
    return !!(
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.webkitFullScreen ||
        document.msFullScreen
    );
}

// 设置全屏
export function fullscreen() {
    let ele = document.body;
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
    } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
    }
}

// 退出全屏
export function exitFullscreen() {
    let ele = document.body;
    if (document.exitFullScreen) {
        document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (ele.msExitFullscreen) {
        ele.msExitFullscreen();
    }
}

/**
 * 在本地进行文件保存
 * @param {String} data 要保存到本地的图片数据
 * @param {String} filename 文件名
 */
export function saveFile(data, filename) {
    const save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = data;
    save_link.download = filename;
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    );
    save_link.dispatchEvent(event);
}

/**
 * 格式化时间字符串
 * @param {String} str 时间字符串 （20200707184400）
 *
 * @return 2020-07-07 18:44
 */
export function formatTimeStr(str) {
    return str.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})\d{2}$/,
        (match, p1, p2, p3, p4, p5) => {
            return `${p1}-${p2}-${p3} ${p4}:${p5}`;
        }
    );
}

/**
 * 格式化时间戳
 * @param {Object | String | Number} datetime 时间戳
 * @param {String} format 格式化字符串
 */
export function formatDate(datetime, format) {
    let formatStr = format || "yyyy-MM-dd hh:mm:ss";
    let date = "";
    if (Object.prototype.toString.call(datetime) === "[object Date]") {
        date = datetime;
    } else {
        date = new Date(datetime);
    }
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        S: date.getMilliseconds(), //millisecond
    };
    if (/(y+)/.test(formatStr))
        formatStr = formatStr.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatStr))
            formatStr = formatStr.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    }
    return formatStr;
}

/**
 * 防抖函数
 * @param {Function} fn 函数
 * @param {Number} threshold 间隔时间（毫秒）
 * @param {Object} scope 作用域
 * @return Promise 用于处理未触发情况
 */
export function throttle(fn, threshold, scope) {
    let prev = Date.now();
    return function () {
        let context = scope || this,
            args = arguments;
        let now = Date.now();
        if (now - prev > threshold) {
            prev = now;
            fn.apply(context, args);
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    };
}

/**
 * 接口域名转换
 * @param {String} oldDomain 旧域名
 *
 * 因为小程序一定要https的域名，所以接口需要用https,原接口不好改，所以用其他域名代理 8080 走p4, 8081走p5
 */
export function getProxyDomain(oldDomain) {
    if (!oldDomain) {
        return "";
    }
    return oldDomain
        .replace("http://", "https://")
        .replace(/pacs\.ncyymt\.com:(\d{4})/, (match, port) => {
            if (port === "8080") {
                return "p4.ncyymt.com";
            } else if (port === "8081") {
                return "p5.ncyymt.com";
            }
        });
}

// 替换瑞昌中医院的缩略图
export function getRczyyThumbImg(date, imgUrl) {
    let formatDate = date.split(" ")[0].replace(/-/g, "");
    if (formatDate < 20200727 && imgUrl) {
        return imgUrl.replace("dcm-rczyy.obs.cn-east-2.myhwclouds.com", "p4.ncyymt.com");
    }
    return imgUrl;
}

/**
 * 是否是微信环境
 */
export function isInWeChat() {
    const ua = navigator.userAgent.toLowerCase();
    return /micromessenger/g.test(ua);
}

// 授权跳转页面
export function toWxAuthUrl() {
    const url = window.location.href.replace(/[?|&]code=.+state=STATE/g, "");
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b68af11f5e3030d&redirect_uri=${encodeURIComponent(
        url
    )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
}

/**
 * 是否是IOS
 */
export const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

export const isWechat = /micromessenger/g.test(navigator.userAgent.toLowerCase());

// 判断页面是否在后台
export function isHidden() {
    var hidden;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
    }
    return document[hidden];
}

/**
 * 将一个数组分为多个分组
 * @param {Array} array 原数组
 * @param {Number} num 每个分组数量
 */
export function splitArray(array, num) {
    let arr = [];
    for (let i = 0, len = array.length; i < len; i += num) {
        arr.push(array.slice(i, i + num));
    }
    return arr;
}

// 检查当前用户是否支持触摸事件
export const touchSupported = () => {
    return (
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)
    );
};

let isDicomReady = false;
let readyArray = [];
export function dicomReady(callback) {
    if (isDicomReady) {
        callback();
    } else {
        readyArray.push(callback);
    }
}

export function dicomLoaded() {
    isDicomReady = true;
    if (readyArray.length > 0) {
        readyArray.forEach((fn) => {
            fn();
        });
        readyArray = [];
    }
}

// 加载js
export function loadScript(src, callback) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = src;
    script.onload = function () {
        callback && callback();
    };
    document.body.appendChild(script);
}
