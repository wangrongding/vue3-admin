import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "@/store";
const baseUrl = import.meta.env.VITE_APP_BASE_API as string;

// 创建axios实例
const request = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    Authorization: "Basic c3R1ZGVudDpzdHVkZW50X3NlY3JldA==",
  },
});
// request请求拦截器
request.interceptors.request.use(
  (config) => {
    const { loginInfo } = useStore();
    (config.headers as any)["platform-auth"] = `bearer ${loginInfo.token}`;
    const { data = {}, method } = config;
    //将请求中值为undefined,null的过滤
    Object.keys(data).forEach((item) => {
      if (
        data[item] === undefined ||
        data[item] === null ||
        data[item] === "null"
        /* || data[item] === "" */
      ) {
        delete data[item];
      }
    });
    if (method === "post") {
      config.data = data.data;
    }
    // get请求转参数key为params
    if (method === "get" || method === "delete") {
      config.params = data;
    }
    if (method === "put") {
      config.data = { ...data.data };
    }
    return config;
  },
  (error) => {
    return error;
  },
);

// 请求成功回调
async function successCallback(res: any) {
  const { data } = res;
  if (data.code == 200) {
    return Promise.resolve(data.data);
  } else {
    if (Object.prototype.toString.apply(data) === "[object Blob]") {
      //判断文件流是否正常
      /*  let fileReader = new FileReader();
      fileReader.onload = (val) => {
        // responseType为blob时的异常捕获;
        try {
          let jsonData = JSON.parse(val.target.result);
          console.log(jsonData);
          if (jsonData.code) {
            // 说明是普通对象数据，后台转换失败
            console.log("正常的文件流转换失败");
            Message({
              message: `${jsonData.msg}(${jsonData.code})`,
              type: "error",
            });
            return Promise.reject("错误");
            // throw new Error("错误");
          }
        } catch (err) {
          console.log(err, "正常的文件流");
          // 解析成对象失败，说明是正常的文件流
          Promise.resolve(val.target.result);
          // return val.target.result;
        }
      };
      fileReader.readAsText(res); */
      return Promise.resolve(data);
    }

    ElMessage({
      message: data.msg,
      grouping: true,
      type: "error",
    });
    return Promise.reject(`${data.msg}(${data.code})`);
  }
}

// 请求错误回调
function errorCallback(error: any) {
  console.error(error, "🚗🚗🚗");
  if (error.response.status == 401) {
    sessionStorage.clear();
    ElMessage({
      type: "warning",
      message: "请重新登录！",
    });
    window.history.pushState({}, "/student", "/student");
  } else {
    ElMessage({
      message: error,
      grouping: true,
      type: "error",
    });
  }
  return Promise.reject(error);
}
// respone返回拦截器
request.interceptors.response.use(successCallback, errorCallback);
export default request;
