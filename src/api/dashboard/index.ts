import request from "../request";

// 数据统计
export function cardDataCount(data?: object) {
  return request.get("/his-admin/home/cardDataCount", { data });
}
// 获取下拉班级学年列表
export function getGradeList(data?: object) {
  return request.get("/his-admin/class/classList", { data });
}
// 下拉班级列表
export function classIdList(data?: object) {
  return request.get("/his-admin/class/classIdList", { data });
}
// 折线图数据统计
export function courseDataCount(data?: object) {
  return request.get("/his-admin/home/courseDataCount", { data });
}
// 图状数据统计
export function ringPieBatteryDataCount(data?: object) {
  return request.get("/his-admin/home/ringPieBatteryDataCount", { data });
}

// 所有风险等级/干预状态下拉列表
export function dictionary(data?: object) {
  return request.get("/platform-system/dict/dictionary", { data });
}
// 问卷下拉列表
export function questionnaireList(data?: object) {
  return request.get("/his-test/questionnaire/questionnaireList", { data });
}
// 心理筛查记录
export function recordList(data?: object) {
  return request.get("/his-admin/home/recordList", { data });
}

// 报告详情
export function findByPaperId(data?: object) {
  return request.get("/his-test/qsn-paper/findByPaperId", { data });
}
// 报告历史记录列表
export function getHistoryRecord(data?: object) {
  return request.get("/his-test/bigtest/qsn-paper/getHistoryRecordById", { data });
}
// 修改评估意见
export function updateSuggest(data?: object) {
  return request.post("/his-test/qsn-paper/updateSuggest", { data });
}
