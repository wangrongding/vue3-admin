import request from "../request";

// 班级管理列表
export function getClassList(data?: object) {
  return request.get("/his-admin/classManage/getClassList", { data });
}
// 班级管理回显数据
export function findClassById(data?: object) {
  return request.get("/his-admin/classManage/findClassById", { data });
}
// 编辑
export function update(data?: object) {
  return request.post("/his-admin/classManage/update", { data });
}
// 获取班主任列表
export function getTeacherList(data?: object) {
  return request.get("/his-admin/user/getTeacherList", { data });
}
// 添加班级
export function add(data?: object) {
  return request.post("/his-admin/classManage/add", { data });
}
// 班级详情列表
export function getStudentList(data?: object) {
  return request.get("/his-admin/classManage/getStudentList", { data });
}
// 下载模板
export function fileDownload(data?: object) {
  return request.get("/his-admin/user/fileTeacherDownload", { data });
}
// 下载模板
export function studentTemplate(data?: object) {
  return request.get("/his-admin/user/fileDownload", { data });
}
// 导入用户
export function importUser(data?: object) {
  return request.post("/his-admin/user/importUser", { data });
}
// 移出班级
export function deleteStudent(data?: object) {
  return request.post("/his-admin/classManage/delete", { data });
}
// 【班级管理】-获取干预状态、风险等级下拉框
export function dictionary(data?: object) {
  return request.get("/platform-system/dict/dictionary", { data });
}
// 转出学生列表
export function rollOutStudentList(data?: object) {
  return request.get("/his-admin/user/getStudentList", { data });
}
// 【班级管理】-转出学生
export function transferStudent(data?: object) {
  return request.post("/his-admin/classManage/transferStudent", { data });
}
