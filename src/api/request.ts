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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiLojaPpobYiLCJhdmF0YXIiOiJodHRwOi8vbWlwYWMuZmlsZS5tZW50cGVhay5jb20vaGVhZEltYWdlLzRkOGZmMjYwLWVhN2YtNGRiOC1iYjM2LWE2NzRhNGFmNTFhZC5wbmciLCJhdXRob3JpdGllcyI6WyJhZG1pbiJdLCJjbGllbnRfaWQiOiJzdHVkZW50Iiwicm9sZV9uYW1lIjoiYWRtaW4iLCJsaWNlbnNlIjoicG93ZXJlZCBieSBwbGF0Zm9ybXgiLCJ1c2VyX2lkIjo1ODYsInJvbGVfaWQiOiIxIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTY3NTM4NzcxMywianRpIjoiZjg4YmQ5NzMtZjI0NS00NjYwLWEyYmEtMDk5YzM2NWYyYmNkIiwiYWNjb3VudCI6IjEzNjI3MDMyNjMzIiwidGVuYW50X2NvZGUiOiIwMDAwMDEifQ.3Ji8Kxo-sqs78GrKkSDPmWIYQGI6xxueSvgWJhGZDUY"
  }
});
// request请求拦截器
request.interceptors.request.use(
  (config) => {
    const { data = {}, method } = config;
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
    type: "success"
  });
}
// 请求错误回调
function errorCallback(error: any) {
  console.log(error);
  ElMessage({
    message: error,
    grouping: true,
    type: "error"
  });
}
// respone返回拦截器
request.interceptors.response.use(successCallback, errorCallback);
export default request;
