import request from "../request";

// 测试管理  表格 姓名查询 /pc/TestManagementController/pageAndLike
export function getUsersByName(data?: object) {
  return request({
    method: "get",
    url: "/pc/TestManagementController/pageAndLike",
    data: { data },
  });
}
// 测试管理  表格 时间查询    /pc/TestManagementController/pageAndDate
export function getUsersByTime(data?: object) {
  return request({
    method: "get",
    url: "/pc/TestManagementController/pageAndDate",
    data: { data },
  });
}
// 测试管理  报告  修改评估者意见 /pc/TestManagementController/updateSuggest
export function changeReportSuggest(data?: object) {
  return request({
    method: "post",
    url: "/pc/TestManagementController/updateSuggest",
    data: { data },
  });
}

// 测试管理 导出数据  /pc/TestManagementController/dataExcel
export function exportExcel(data?: object) {
  return request({
    method: "post",
    url: "/pc/TestManagementController/dataExcel",
    data: { data },
  });
}

// 测试管理  报告数据  /pc/TestManagementController/getReport
export function getReport(data?: object) {
  return request.get("/his-teen-admin/teen/getReport", { data });
}
// 获取报告表格数据
export function getSimpleReport(data?: object) {
  return request({
    method: "get",
    url: "/pc/TestManagementController/getSimpleReport",
    data: { data },
  });
}

// 测试管理  报告 -- 修改专家建议      /pc/TestManagementController/updateSuggest
export function editorSuggest(data?: object) {
  return request({
    method: "post",
    url: "/pc/TestManagementController/updateSuggest",
    data: { data },
  });
}
