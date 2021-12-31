import request from "../request";

// 查找头像图片
export function getImgUrl(data?: object) {
  return request.get("/platform-user/userext/getImgUrl", { data });
}
// 查看学员信息
export function userDetail(data?: object) {
  return request.put("/his-admin/user/userDetail", { data });
}
// 更新用户信息
export function updateUserInfo(data?: object) {
  return request.put("/his-admin/user/updateUserInfo", { data });
}
