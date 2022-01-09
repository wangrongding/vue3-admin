/**
 * @author zhudying
 * @description pdf页面导出函数
 * @function getPdf
 * @param {string} htmlTitle  导出的文件名
 * @param {string} elements   导出html的id
 */
import { ElLoading } from "element-plus";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";

// export function getPdf(htmlTitle: string, elements: HTMLElement) {
//   let title = htmlTitle;
//   let ele = elements;
//   setTimeout(() => {
//     var loadingInstance = ElLoading.service({
//       lock: true,
//       text: "下载中",
//       spinner: "el-icon-loading",
//       background: "rgba(0, 0, 0, 0.7)",
//     });
//     var width = ele.offsetWidth; //获取dom 宽度
//     var height = ele.offsetHeight; //获取dom 高度

//     /* ele.style.height = height + 400 + "px";
//     ele.style.width = width + 100 + "px";
//     ele.style.padding = 100 + "px";
//     ele.style.zIndex = "-1"; */

//     var canvas = document.createElement("canvas"); //创建一个canvas节点
//     var scale = 4; //定义任意放大倍数 支持小数
//     canvas.width = width * scale; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
//     canvas.height = height * scale; //定义canvas高度 *缩放
//     canvas.getContext("2d"); //获取context,设置scale

//     document.body.scrollTop = 0; // IE的
//     document.documentElement.scrollTop = 0; // 其他
//     ele.scrollTop = 0;
//     html2Canvas(ele, {
//       useCORS: true,
//       allowTaint: true,
//     }).then(function (canvas: any) {
//       var context = canvas.getContext("2d");
//       // 【重要】关闭抗锯齿
//       context.mozImageSmoothingEnabled = false;
//       context.webkitImageSmoothingEnabled = false;
//       context.msImageSmoothingEnabled = false;
//       context.imageSmoothingEnabled = false;

//       var imgData = canvas.toDataURL("image/jpeg", 1.0); //转化成base64格式,可上网了解此格式
//       var img = new Image();
//       img.src = imgData;
//       img.onload = function () {
//         img.width = img.width / scale; //因为在上面放大了2倍，生成image之后要/2
//         img.height = img.height / scale;
//         img.style.transform = "scale(0.5)";
//         if (this.width > this.height) {
//           //此可以根据打印的大小进行自动调节
//           var doc = new JsPDF("l", "mm", [this.width * 0.5, this.height * 0.5]);
//         } else {
//           var doc = new JsPDF("p", "mm", [this.width * 0.55, this.height * 0.55]);
//         }
//         doc.addImage(imgData, "jpeg", 0, 0, this.width * 0.55, this.height * 0.55);
//         doc.save(`${title}.pdf`);
//       };
//     });
//     /* ele.style.height = height + "px";
//     ele.style.width = width + "px";
//     ele.style.padding = 0 + "px"; */
//     loadingInstance.close();
//   }, 500);
//   return "success";
// }

export function getPdf(htmlTitle: string, elements: HTMLElement) {
  let title = htmlTitle;
  let ele = elements;
  var loadingInstance = ElLoading.service({
    lock: true,
    text: "下载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  var width = ele.offsetWidth; //获取dom 宽度
  var height = ele.offsetHeight; //获取dom 高度

  var canvas = document.createElement("canvas"); //创建一个canvas节点
  canvas.width = width + 500;
  canvas.height = height + 500;
  canvas.getContext("2d"); //获取context,设置scale

  html2Canvas(ele, {
    useCORS: true,
    allowTaint: true,
  }).then(function (canvas: any) {
    var context = canvas.getContext("2d");
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    var imgData = canvas.toDataURL("image/jpeg", 1.0); //转化成base64格式,可上网了解此格式
    var img = new Image();
    img.src = imgData;
    img.onload = function () {
      var doc = new JsPDF("l", "mm", [width, height]);
      doc.addImage(imgData, "jpeg", 0, 0, width, height);
      doc.save(`${title}.pdf`);
    };
  });
  loadingInstance.close();
  return "success";
}
