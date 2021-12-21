/**
 * @author zhudying
 * @description 压缩包下载
 * @function export_txt_to_zip
 * @param {Array} th  表头字段集合
 * @param {Array} jsonData   数据集合
 * @param {string} txtName   文件名称
 * @param {string} zipName   压缩文件名称
 */
import { saveAs } from 'file-saver'
import JSZip from 'jszip';
import html2Canvas from 'html2canvas';
import { Loading } from 'element-ui';


export function export_txt_to_zip(th, jsonData, txtName, zipName) {
  const zip = new JSZip()
  const txt_name = txtName || 'file'
  const zip_name = zipName || 'file'
  const data = jsonData
  let txtData = `${th}\r\n`
  data.forEach((row) => {
    let tempStr = ''
    tempStr = row.toString()
    txtData += `${tempStr}\r\n`
  })
  zip.file(`${txt_name}.txt`, txtData)
  zip.generateAsync({
    type: "blob"
  }).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
  }, (err) => {
    alert('导出失败')
  })
}


/***
 * @function 把html生产图片，然后打包下载
 * @params ele 要下载的dom的class名称
 * @params String name  压缩包名称
 * @params Arrary arr   图片名称集合
 * **/
export function downloadZip(ele, name, arr) {
  setTimeout(() => {
    var loadingInstance = Loading.service({
      lock: true,
      text: '下载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    var arrImages = [];
    let options = { useCORS: true, backgroundColor: "#060400" }
    const targetDoms = document.querySelectorAll(ele);
    for (let i = 0, len = targetDoms.length; i < len; i++) {
      let copyDom = targetDoms[i];
      copyDom.style.width = targetDoms[i].clientWidth;
      copyDom.style.height = targetDoms[i].clientHeight;
      // copyDom.style.backgroundColor = "#060400"
      html2Canvas(copyDom, options).then(
        canvas => {
          let imgURL = canvas.toDataURL("image/png");
          arrImages.push({ fileUrl: imgURL, renameFileName: arr[i] + '.png' });
          if (i == len - 1) {
            filesToRar(arrImages, name);
          }
        }
      );
    }
    loadingInstance.close()
  }, 50);

}
function filesToRar(arrImages, filename) {
  let _this = this;
  let zip = new JSZip();
  let cache = {};
  let promises = [];
  var title = '正在加载压缩文件';

  for (let item of arrImages) {
    const promise = getImgArrayBuffer(item.fileUrl).then(data => {
      // 下载文件, 并存成ArrayBuffer对象(blob)
      zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
      cache[item.renameFileName] = data;
    });
    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: "blob" }).then(content => {
      title = '正在压缩';
      // 生成二进制流
      saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
      title = '压缩完成';
    });
  }).catch(res => {
    _this.$message.error('文件压缩失败');
  });
}
//获取文件blob
function getImgArrayBuffer(url) {
  let _this = this;
  return new Promise((resolve, reject) => {
    //通过请求获取文件blob格式
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.responseType = "blob";
    xmlhttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.status);
      }
    }
    xmlhttp.send();
  });
}
