import request from "../request";

// 数据统计
export function cardDataCount(data?: object) {
  return request.get("/his-admin/home/cardDataCount", { data });
}
// 获取下拉班级学年列表
export function getClassList(data?: object) {
  return request.get("/his-admin/class/classList", { data });
}
// 下拉班级学年列表
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
// 心理筛查记录
export function recordList(data?: object) {
  return request.get("/his-admin/home/recordList", { data });
}