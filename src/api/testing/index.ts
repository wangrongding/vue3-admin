import request from "../request";

// 问卷分类列表
export function getQuestionTypeList(data?: object) {
  return request.get("/his-admin/testManage/getQuestionTypeList", { data });
}
// 测试管理列表
export function getTestManageList(data?: object) {
  return request.get("/his-admin/testManage/getTestManageList", { data });
}
