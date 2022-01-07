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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiLmmI7lpKnogIHluIgxIiwiYXZhdGFyIjoiaHR0cDovL21pcGFjLmZpbGUubWVudHBlYWsuY29tL2hlYWRJbWFnZS80ZDhmZjI2MC1lYTdmLTRkYjgtYmIzNi1hNjc0YTRhZjUxYWQucG5nIiwiYXV0aG9yaXRpZXMiOlsidGVhY2hlciJdLCJjbGllbnRfaWQiOiJzdHVkZW50Iiwicm9sZV9uYW1lIjoidGVhY2hlciIsImxpY2Vuc2UiOiJwb3dlcmVkIGJ5IHBsYXRmb3JteCIsInVzZXJfaWQiOjU4Nywicm9sZV9pZCI6IjIiLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoxNjc3NTIxMjQxLCJqdGkiOiIzZTIxYWQwYi1iMGVlLTRkOWItOWJiYy03Y2ZiOTJlMDk1MTAiLCJhY2NvdW50IjoiMTU4MDA0NDQzMjkiLCJ0ZW5hbnRfY29kZSI6IjAwMDAwMSJ9.zOHRBTcAQfDnD1F_nLv55PKpD6eAEEBRQ4CiGXfjqhE",
  },
});
// request请求拦截器
request.interceptors.request.use(
  (config) => {
    const { data = {}, method } = config;
    //将请求中值为undefined,null的过滤
    Object.keys(data).forEach((item) => {
      if (data[item] === undefined || data[item] === null /* || data[item] === "" */) {
        delete data[item];
      }
    });
	if (method === "put") {
	  config.data ={ ...data.data};
	}

    if (method === "post") {
      config.data = data.data;
    }
    // get请求转参数key为params
    if (method === "get") {
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
