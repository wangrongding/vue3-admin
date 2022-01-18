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

export function getPdf(htmlTitle: string, elements: HTMLElement) {
  //========================================================================
  var loadingInstance = ElLoading.service({
    lock: true,
    text: "下载中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  var width = elements.offsetWidth; //获取dom 宽度
  var height = elements.offsetHeight; //获取dom 高度
  var canvas = document.createElement("canvas"); //创建一个canvas节点
  canvas.width = width + 500;
  canvas.height = height + 500;
  canvas.getContext("2d"); //获取context,设置scale
  html2Canvas(elements, {
    useCORS: true,
    allowTaint: true,
  }).then(function (canvas: any) {
    canvas.toBlob(async (result: any) => {
      let imgData = window.URL.createObjectURL(result);
      let img = new Image();
      img.src = imgData;
      img.onload = function () {
        console.log("🚗🚗🚗🚗", [width + 100, height + 100]);
        let doc = new JsPDF(width > height ? "l" : "p", "px", [width + 100, height + 100]);
        doc.addImage(imgData, "jpeg", 50, 50, width, height);
        doc.save(`${htmlTitle}.pdf`);
      };
    });
  });
  loadingInstance.close();
  return "success";
  //========================================================================
}
