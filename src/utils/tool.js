/* eslint-disable */
export function downloadLink(link, fileName) {
    const linkNode = document.createElement("a");
    linkNode.style.display = "none";
    linkNode.href = link;
    linkNode.download = fileName;
    document.body.appendChild(linkNode);
    linkNode.click();
    URL.revokeObjectURL(linkNode.href);
    document.body.removeChild(linkNode);
}
/**
 * @author Rongding
 * @description  监听页面变化，使字体自适应
 * @function fontSize 字体适应
 * @param  res  字体大小
 */
export function fontSize(res) {
    let docEl = document.documentElement,
        clientWidth =
            window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}
/**
 * @author Rongding
 * @description  性别转换
 * @function changeSex 转换函数
 * @param  val  字符
 */
export function changeSex(val) {
    val = val + "";
    let arr = new Map([
        ["1", "男"],
        ["2", "女"],
        // ['2', '其他'],
    ]);
    return arr.get(val);
}
/**
 * @author Rongding
 * @description  文件流下载表格
 * @function exportExcel 下载函数
 * @param  response  文件流
 * @param {Array}  name  名称
 */

export function exportExcel(response, name) {
    const fileName = name + ".xlsx";
    if ("download" in document.createElement("a")) {
        // 非IE下载
        const blob = new Blob([response], { type: "application/xlsx" });
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = window.URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    }
}
/***
 * @author Rongding
 * @description  文件流下载pdf
 * @function exportExcel 下载函数
 * @param  data  文件流
 * @param {Array}  fileName  文件名
 *
 * ***/
export function exportPdf(data, fileName) {
    let blob = new Blob([data], {
        //type类型后端返回来的数据中会有，根据自己实际进行修改
        type: "application/pdf",
    });
    let filename = fileName;
    if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        // 创建隐藏<a>标签进行下载
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}
/***
 * @author Rongding
 * @description  文件流下载zip
 * @function exportExcel 下载函数
 * @param  data  文件流
 * @param {Array}  fileName  文件名
 *
 * ***/
export function exportZip(data, fileName) {
    let blob = new Blob([data], {
        //type类型后端返回来的数据中会有，根据自己实际进行修改
        type: "application/zip",
    });
    let filename = fileName;
    if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        // 创建隐藏<a>标签进行下载
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}

/**
 * @author Rongding
 * @description  格式化时间工具
 * @function exportExcel 格式化时间
 * @param  date  时间
 * @param  fmt  格式  yyyy-MM-dd HH:mm:ss
 * @param  fmt  格式
 *
 */
export function dateFormat(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
            );
        }
    }
    return fmt;
}
