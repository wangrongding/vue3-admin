import request from "../request";

// 数据统计
export function sysUserListPage(data?: object) {
  return request.get("/his-admin/user/sysUserListPage", { data });
}
// 查询操作日志列表
export function logListPage(data?: object) {
  return request.get("/his-admin/log/logListPage", { data });
}
