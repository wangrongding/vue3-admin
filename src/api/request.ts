import axios from "axios";
import { getStore } from "@/utils/store";
import { ElMessage } from "element-plus";
const baseUrl = import.meta.env.VITE_APP_BASE_API as string;

// 创建axios实例
const request = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    Authorization: "Basic c3R1ZGVudDpzdHVkZW50X3NlY3JldA==",
    "platform-auth": "bearer " + JSON.parse(sessionStorage.getItem("loginInfo") as string).token,
  },
});
// request请求拦截器
request.interceptors.request.use(
  (config) => {
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
    // console.log((config.headers as any)["platform-auth"], "🚗🚗🚗🚗🚗🚗");
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
  } else if (data.code == 401) {
    sessionStorage.clear();
    ElMessage({
      type: "warning",
      message: "请重新登录！",
    });
    window.history.pushState({}, "/student", "/student");
  } else {
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
  ElMessage({
    message: error,
    grouping: true,
    type: "error",
  });
  return Promise.reject(error);
}
// respone返回拦截器
request.interceptors.response.use(successCallback, errorCallback);
export default request;
