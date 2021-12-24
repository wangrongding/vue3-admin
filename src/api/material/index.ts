import request from "../request";

// 课程资料、教辅教案、团辅资料接口
export function appList(data?: object) {
  return request.get("/his-teachingdata/teachdatacategory/appList", { data });
}
//课程信息列表、教辅教案列表、团辅资料列表接口
export function categoryList(data?: object) {
  return request.get("/his-teachingdata/teachcourse/categoryList", { data });
}
//课程、团辅详情
export function courseDetail(data?: object) {
  return request.get("/his-teachingdata/teachcoursedetail/courseDetail", { data });
}
