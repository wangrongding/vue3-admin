import request from "../request";

// 查找头像图片
export function getImgUrl(data?: object) {
  return request.get("/platform-user/userext/getImgUrl", { data });
}
// 查看学员信息
export function userDetail(data?: object) {
  return request.get("/his-admin/user/userDetail", { data });
}
// 更新用户信息
export function updateUserInfo(data?: object) {
  return request.put("/his-admin/user/updateUserInfo", { data });
}
// 【学员管理】- 新增学员信息
export function addUser(data?: object) {
  return request.post("/his-admin/user/save", { data });
}
// 【学员管理】- 学员管理列表
export function userListPage(data?: object) {
  return request.get("/his-admin/user/userListPage", { data });
}
// 【学生档案】- 学员信息
export function userArchiveInfo(data?: object) {
  return request.get("/his-admin/user/userArchiveInfo", { data });
}
// 【学生档案】- 测试记录
export function userTestRecord(data?: object) {
  return request.get("/his-admin/user/userTestRecord", { data });
}
// 【学生档案】- 查询学员用户下的文档
export function archiveList(data?: object) {
  return request.get("/his-admin/userArchive/archiveList", { data });
}
// 【学员管理】- 导入学员信息模板地址
export function fileDownload(data?: object) {
  return request.get("/his-admin/user/fileDownload", { data });
}
// 【学员管理】- 导入学员信息
export function importUser(data?: object) {
  return request.post("/his-admin/user/importUser", { data });
}
// 【学生档案】- 上传学员文档记录
export function saveUserArchive(data?: object) {
  return request.post("/his-admin/userArchive/saveUserArchive", { data });
}
// 【学生档案】- 删除学员用户文档
export function deleteById(data?: object) {
  return request.delete("/his-admin/userArchive/deleteById", { data });
}
