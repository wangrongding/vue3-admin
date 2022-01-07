import request from "../request";

// 系统管理列表
export function sysUserListPage(data?: object) {
  return request.get("/his-admin/user/sysUserListPage", { data });
}
// 查询操作日志列表
export function logListPage(data?: object) {
  return request.get("/his-admin/log/logListPage", { data });
}
// 角色列表
export function roleList(data?: object) {
  return request.get("/platform-system/role/roleList", { data });
}
