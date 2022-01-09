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

// 【个人设置】-个人信息
export function detail(data?: object) {
  return request.get("/platform-user/detail", { data });
}
// 【个人设置】-个人信息修改
export function update(data?: object) {
  return request.post("/platform-user/update", { data });
}
// 【个人设置】-管理员登录密码修改
export function updatePassWord(data?: object) {
  return request.put("/platform-user/updatePassWord", { data });
}
// 【个人设置】-换绑手机号
export function updateOldPhone(data?: object) {
  return request.put("/platform-user/updateOldPhone", { data });
}
