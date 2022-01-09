import request from "../request";

// 获取所在地
export function getAddress(data?: object) {
  return request.get("/platform-user/userext/getAddress", { data });
}
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
// 【系统管理】- 查看管理员信息
export function sysUserDetail(data?: object) {
  return request.get("/his-admin/user/sysUserDetail", { data });
}
// 【系统管理】- 添加管理员信息
export function saveUser(data?: object) {
  return request.post("/his-admin/user/saveUser", { data });
}
// 【系统管理】- 编辑管理员信息
export function updateUser(data?: object) {
  return request.put("/his-admin/user/updateUser", { data });
}

// 初始化密码
export function resetPassword(data?: object) {
  return request.post("/platform-user/reset-password", { data });
}
