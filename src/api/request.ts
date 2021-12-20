import axios from "axios";
import { ElMessage } from "element-plus";
const baseUrl = import.meta.env.VITE_APP_BASE_API as string;
// 创建axios实例
const request = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    Authorization: "Basic c3R1ZGVudDpzdHVkZW50X3NlY3JldA==",
    "platform-auth":
      "bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJoemwiLCJhdmF0YXIiOm51bGwsImF1dGhvcml0aWVzIjpbInN0dWRlbnQiXSwiY2xpZW50X2lkIjoic3R1ZGVudCIsInJvbGVfbmFtZSI6InN0dWRlbnQiLCJsaWNlbnNlIjoicG93ZXJlZCBieSBwbGF0Zm9ybXgiLCJ1c2VyX2lkIjoxNjMsInJvbGVfaWQiOiIzIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTY3NTk2NzEzOCwianRpIjoiM2RiYmYzMTgtMWI2ZC00MDQxLWExNGUtMDFjM2RmYmZjNGYxIiwiYWNjb3VudCI6IjE1NjM4MTA5OTEwIiwidGVuYW50X2NvZGUiOiIwMDAwMDAifQ.hEFjppsH816lAhfyb5fmpSBgToWLNPtodMh7SWpLhJ4",
  },
});
// request请求拦截器
request.interceptors.request.use(
  (config) => {
    const { data = {}, method, params } = config;
    if (method === "post") {
      config.data = data.data;
    }
    // get请求转参数key为params
    if (method === "get") {
      // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.params = data;
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
  console.error(error);
  ElMessage({
    message: error,
    grouping: true,
    type: "error",
  });
}
// respone返回拦截器
request.interceptors.response.use(successCallback, errorCallback);
export default request;
