import axios from "axios";
import { ElMessage } from "element-plus";
const baseUrl = import.meta.env.VITE_APP_BASE_API as string;
// 创建axios实例
const request = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000, // 请求超时时间
});
// request请求拦截器
request.interceptors.request.use(
  (config) => {
    let { data = {}, method } = config;
    console.log(config, "config");
    return config;
  },
  (error) => {
    return error;
  }
);
// 请求成功回调
async function successCallback(response: any) {
  ElMessage({
    message: "this is a message.",
    grouping: true,
    type: "success",
  });
}
// 请求错误回调
function errorCallback(error: any) {
  console.log(error);
  ElMessage({
    message: error,
    grouping: true,
    type: "error",
  });
}
// respone返回拦截器
request.interceptors.response.use(successCallback, errorCallback);
export default request;
